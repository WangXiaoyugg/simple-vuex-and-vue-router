let Vue;
class VueRouter {
  constructor({ routes, }) {
    this.routeMap = routes.reduce((memo, current) => (memo[current.path] = current.component, memo), {})
    Vue.util.defineReactive(this, 'route', { current: '/' })
    window.addEventListener('load', () => {
      console.log(location.hash)
      if (!location.hash) {
        location.hash = '/'
      } else {
        this.route.current = location.hash.slice(1)
      }
    })
    window.addEventListener('hashchange', () => {
      this.route.current = location.hash.slice(1)
    })

  }
}

VueRouter.install = (_Vue) => {
  Vue = _Vue;
  Vue.mixin({
    beforeCreate() {
      // 深度优先, 根组件
      if (this.$options && this.$options.router) {
        this._router = this.$options.router;
      } else {
        // 让所有的子组件都有_router 指向router; 儿子爸爸用的同一个router
        this._router = this.$parent && this.$parent._router
      }
      // 每个组件都有$router, $route
      Object.defineProperty(this, '$route', {
        value: {}
      })
      Object.defineProperty(this, '$router', {
        value: {}
      })

    },

  })

  // router-link
  Vue.component("router-link", {
    props: {
      to: {
        type: String,
      }
    },
    render(h) {
      return <a href={`#${this.to}`}>{this.$slots.default}</a>
    }
  })
  // router-view
  Vue.component("router-view", {
    render(h) {
      return h(this._router.routeMap[this._router.route.current])
    }
  })
}

export default VueRouter
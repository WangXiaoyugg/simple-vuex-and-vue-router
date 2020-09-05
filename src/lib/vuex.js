let Vue;
class Store {
  constructor(options) {
    this.vm = new Vue({
      data: {
        state: options.state
      }
    })
    this.state = this.vm.state
    this.mutations = options.mutations
    this.actions = options.actions
  }
  commit = (eventName) => {
    this.mutations[eventName](this.state)
  }

  dispatch = (eventName) => {
    this.actions[eventName](this)
  }
}
const install = (_Vue) => {
  Vue = _Vue
  Vue.mixin({
    beforeCreate() {
      if (this.$options && this.$options.store) {
        this.$store = this.$options.store
      } else {
        this.$store = this.$parent && this.$parent.$store;
      }
    }
  })
}

export default {
  Store,
  install,
}
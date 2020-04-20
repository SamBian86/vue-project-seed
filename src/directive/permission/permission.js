import store from '@/store'
export default {
  inserted(el, binding, vnode) {
    const { value } = binding
    const permissionStore = store.getters && store.getters.app_permissionStore

    if (value && value.length > 0) {
      debugger
      const permissionBtns = value
      const hasPermission = permissionStore.some(btn => {
        return permissionBtns.includes(btn)
      })

      if (!hasPermission) {
        el.parentNode && el.parentNode.removeChild(el)
      }
    } else {
      throw new Error(`权限呢？！！！`)
    }
  }
}

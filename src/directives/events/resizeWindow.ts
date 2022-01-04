/* eslint-disable @typescript-eslint/explicit-module-boundary-types */

import { Directive } from 'vue'

export const resizeWindow: Directive = {
  beforeMount(el, binding, vnode, prevVnode) {
    // el.resizeWindowEvent = function (event: any) {
    //   if (event.currentTarget.innerWidth > 1200) binding.value(895 + (event.currentTarget.innerWidth - 1200) / 2 + 'px')
    //   else binding.value(event.currentTarget.innerWidth - 308 + 'px')
    // }

    el.resizeWindowEvent = binding.value
    window.addEventListener('resize', el.resizeWindowEvent)
  },
  unmounted(el) {
    window.removeEventListener('resize', el.resizeWindowEvent)
  },
}

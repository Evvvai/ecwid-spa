/* eslint-disable @typescript-eslint/explicit-module-boundary-types */

import { Directive } from 'vue'

export const clickOutside: Directive = {
  beforeMount(
    el: {
      clickOutsideEvent: { (event: any): void; (this: HTMLElement, ev: MouseEvent): any }
      contains: (arg0: any) => any
    },
    binding: { value: (el: any) => void },
    vnode: any
  ) {
    el.clickOutsideEvent = function (event) {
      binding.value(event.target)
    }
    // Obsolete
    // el.clickOutsideEvent = function (event) {
    //   if (!(el == event.target || el.contains(event.target))) {
    //   binding.value()
    //   }
    // }
    document.body.addEventListener('mousedown', el.clickOutsideEvent)
  },
  unmounted(el: { clickOutsideEvent: (this: HTMLElement, ev: MouseEvent) => any }) {
    document.body.removeEventListener('mousedown', el.clickOutsideEvent)
  },
}

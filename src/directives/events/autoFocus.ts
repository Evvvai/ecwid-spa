import { Directive } from 'vue'

export const autoFocus: Directive = {
  mounted(el, binding) {
    if (binding?.value) el.focus()
  },
}

export const clickRipple = {
  name: 'handleClickRipple',
  methods: {
    handleClickRipple(el: any) {
      const r = el.target.getBoundingClientRect(),
        d = Math.sqrt(Math.pow(r.width, 2) + Math.pow(r.height, 2)) * 2

      el.target.style.cssText = `--s: 0; --o: 1;`
      el.target.offsetTop
      el.target.style.cssText = `--t: 1; --o: 0; --d: ${d}; --x:${el.clientX - r.left}; --y:${el.clientY - r.top};`
    },
  },
}

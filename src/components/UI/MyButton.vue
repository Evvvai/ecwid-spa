<template>
  <button @click="handleClickRipple" class="my-btn" anim="ripple">
    <slot></slot>
  </button>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { clickRipple } from '@/mixins/clickRipple'

export default defineComponent({
  mixins: [clickRipple],
  name: 'my-button',
})
</script>

<style scoped lang="scss">
.my-btn {
  cursor: pointer;
  padding: 10px 15px;
  min-width: 150px;
  color: var(--color-text);
  border: 2px solid var(--color-border);
  background: var(--color-button-bg);
  border-radius: $border-radius;
  text-decoration: none;

  &:hover {
    background-color: var(--color-button-bg-hover);
  }
  transition: background-color 300ms, color 300ms;
}

[anim='ripple'] {
  position: relative;
  overflow: hidden;

  &:before {
    content: '';
    position: absolute;
    display: block;
    background: var(--ripple-background, white);
    border-radius: 50%;
    pointer-events: none;

    //  position and size
    top: calc(var(--y) * 1px);
    left: calc(var(--x) * 1px);
    width: calc(var(--d) * 1px);
    height: calc(var(--d) * 1px);

    //  animated properties
    opacity: calc(var(--o, 1) * var(--ripple-opacity, 0.3));
    transition: calc(var(--t, 0) * var(--ripple-duration, 600ms)) var(--ripple-easing, linear);
    transform: translate(-50%, -50%) scale(var(--s, 1));
    transform-origin: center;
  }
}
</style>

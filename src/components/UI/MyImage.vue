<template>
  <div v-if="!isLoad" class="image-placeholder" />
  <img v-show="isLoad" :class="className" :src="src" />
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'my-image',
  props: ['width', 'height', 'src', 'className'],

  data: () => {
    return {
      isLoad: false, // for placeholder
    }
  },
  async created() {
    const image = new Image()
    image.src = this.src
    image.onload = () => {
      this.isLoad = true
    }
  },
})
</script>

<style scoped lang="scss">
.image-placeholder {
  width: 100%;
  height: 100%;
  min-height: 200px;

  @include placeholder;
  border: 1px solid var(--color-background-highlight);
  border-radius: 5px;
  background-color: var(--color-background-content);
}
</style>

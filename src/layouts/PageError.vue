<template>
  <div class="page-error">
    <h1>¯\_(ツ)_/¯</h1>
    <router-link to="/">
      <my-button>{{ $t('buttons.backHome') }}</my-button>
    </router-link>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'PageError',
  props: {
    // error: {
    //   type: Object,
    //   default: null,
    // },
  },
  computed: {
    // statusCode(): number {
    //   return (this.error && this.error.statusCode) || 500;
    // },
    // subtitle(): string {
    //   return this.statusCode === 404 ? "Oops, page was not found." : "Oops, something went wrong.";
    // },
  },
})
</script>

<style lang="scss">
.page-error {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  gap: 10px;

  height: 80vh;
  width: 100%;
}
</style>

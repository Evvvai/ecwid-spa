<template>
  <div class="main">
    <my-header></my-header>

    <main class="main-page">
      <router-view />
    </main>

    <my-footer></my-footer>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

import MyHeader from '@/components/Header/Header.vue'
import MyFooter from '@/components/Footer/Footer.vue'

export default defineComponent({
  name: 'appLayouts',
  components: { MyHeader, MyFooter },
  setup() {
    return {}
  },
})
</script>

<style scoped lang="scss">
.main {
  height: 100%;
  overflow: scroll;
}

.main-page {
  position: relative;
  padding-top: 50px;
  min-height: calc(100vh - var(--footer-height));
  width: 100%;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
}

.main-loading {
  height: 100vh;

  display: grid;
  place-content: center;
}
</style>

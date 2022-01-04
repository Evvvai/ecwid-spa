<template>
  <router-view />
</template>
<script lang="ts">
import { useStore } from './store'

export default {
  setup() {
    useStore().dispatch('initApp')
  },
}
</script>
<style lang="scss"></style>

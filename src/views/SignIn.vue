<template>
  <SignIn />
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import SignIn from '@/components/Auth/SignIn.vue'

export default defineComponent({
  name: 'SignInView',
  components: { SignIn },
})
</script>

<style scoped lang="scss"></style>

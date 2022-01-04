<template>
  <SignUp />
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import SignUp from '../components/Auth/SignUp.vue'

export default defineComponent({
  name: 'SignUpView',
  components: { SignUp },
})
</script>

<style scoped lang="scss"></style>

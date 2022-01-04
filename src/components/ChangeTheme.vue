// Just featured...will be deleted

<template>
  <div class="change-theme">
    <span>{{ $t('titles.changeTheme') }}</span>
    <my-button @click="handleClick('blue')">{{ $t('theme.blue') }}</my-button>
    <my-button @click="handleClick('light')">{{ $t('theme.light') }}</my-button>
    <my-button @click="handleClick('dark')">{{ $t('theme.dark') }}</my-button>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useStore } from '@/store'
import { Theme } from '@/types'

export default defineComponent({
  name: 'ChangeTheme',
  methods: {
    // This is for example
    handleClick(theme: any) {
      this.appStore.dispatch('changeTheme', theme)
    },
  },
  setup() {
    const appStore = useStore()
    return { appStore }
  },
})
</script>

<style scoped lang="scss">
.change-theme {
  background-color: var(--color-background-highlight);
  padding: 50px;
  display: flex;
  gap: 25px;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
</style>

// Just featured...will be deleted

<template>
  <div class="change-language">
    <span>{{ $t('titles.changeLanguage') }}</span>
    <my-button @click="handleClick(Locales.ru)">Русский</my-button>
    <my-button @click="handleClick(Locales.enUs)">English</my-button>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useStore } from '@/store'
import { Locales } from '@/types'

export default defineComponent({
  name: 'ChangeLanguage',
  methods: {
    handleClick(lang: Locales) {
      const language = (this.appStore.state.language = lang)
      this.appStore.dispatch('changeLanguage', language)
      this.$i18n.locale = language
    },
  },
  setup() {
    const appStore = useStore()
    return { appStore, Locales }
  },
})
</script>

<style scoped lang="scss">
.change-language {
  background-color: var(--color-background-highlight);
  padding: 50px;
  display: flex;
  gap: 25px;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
</style>

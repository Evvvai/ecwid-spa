<template>
  <div class="home">
    <router-link to="/category">
      <h1 class="home__title">{{ $t('titles.inCatalog') }}</h1>
    </router-link>
    <!-- <ChangeLanguage /> -->
    <!-- <ChangeTheme /> -->
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

// import ChangeLanguage from '@/components/ChangeLanguage.vue'
// import ChangeTheme from '@/components/ChangeTheme.vue'

export default defineComponent({
  name: 'Home',
  // components: { ChangeLanguage, ChangeTheme },
})
</script>

<style lang="scss">
.home {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  height: 90vh;
  width: 100%;
  gap: 40px;

  &__title {
    font-size: 2rem;
    padding: 50px 0;
  }

  div {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 10px;
  }
}
</style>

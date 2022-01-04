<template>
  <header @click="check" class="header">
    <div class="header-logo">
      <h1>Logo</h1>
    </div>
    <span class="header-br" />
    <div class="header-category">
      <router-link to="/category">
        <span @click="handleClickRipple" class="header-icon" anim="header-icon-ripple">
          <img src="@/assets/icon/category.svg" alt="-" />
        </span>
        <span class="header-category__title">{{ $t('titles.catalog') }}</span>
      </router-link>
    </div>
    <search-bar />
    <div class="header-utils">
      <span
        @click="
          (e) => {
            themeOpen()
            handleClickRipple(e)
          }
        "
        class="header-icon"
        anim="header-icon-ripple"
      >
        <img src="@/assets/icon/language.svg" alt="-" />
        <teleport to="body">
          <my-modal :close="themeOpen" :class="{ modal_open: isThemeOpen }">
            <ChangeLanguage :close="themeOpen" />
          </my-modal>
        </teleport>
      </span>
      <span
        @click="
          (e) => {
            languageOpen()
            handleClickRipple(e)
          }
        "
        class="header-icon"
        anim="header-icon-ripple"
      >
        <img src="@/assets/icon/palette.svg" alt="-" />
        <teleport to="body">
          <my-modal :close="languageOpen" :class="{ modal_open: isLanguageOpen }">
            <ChangeTheme :close="languageOpen" />
          </my-modal>
        </teleport>
      </span>
    </div>
    <span class="header-br" />
    <div class="header-personal">
      <router-link to="/favorite" class="header-item">
        <div @click="handleClickRipple" class="header-icon" anim="header-icon-ripple">
          <img src="@/assets/icon/favorite.svg" alt="-" />
        </div>
      </router-link>
      <router-link to="/cart" class="header-item">
        <div @click="handleClickRipple" class="header-icon" anim="header-icon-ripple">
          <img src="@/assets/icon/bag.svg" alt="-" />
        </div>
        <div v-show="!isCartEmpty" class="header-tip-cart">
          <span>{{ cart.length }}</span>
        </div>
      </router-link>
      <span
        @click="
          (e) => {
            authOpen()
            handleClickRipple(e)
          }
        "
        class="header-icon"
        anim="header-icon-ripple"
      >
        <img src="@/assets/icon/auth.svg" alt="-" />
        <teleport to="body">
          <my-modal :close="authOpen" :class="{ modal_open: isAuthOpen }">
            <SignIn :close="authOpen" />
          </my-modal>
        </teleport>
      </span>
    </div>
  </header>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

import { clickRipple } from '@/mixins/clickRipple'
import SearchBar from './SearchBar.vue'
import SignIn from '../Auth/SignIn.vue'
import ChangeLanguage from '@/components/ChangeLanguage.vue'
import ChangeTheme from '@/components/ChangeTheme.vue'

import { useCart } from '@/store/modules/cartModule'
import { mapState } from 'vuex'

export default defineComponent({
  components: { SearchBar, SignIn, ChangeTheme, ChangeLanguage },
  mixins: [clickRipple],
  name: 'MyHeader',
  data: () => {
    return {
      isAuthOpen: false,
      isThemeOpen: false,
      isLanguageOpen: false,
    }
  },
  methods: {
    authOpen() {
      this.isAuthOpen = !this.isAuthOpen
    },
    languageOpen() {
      this.isLanguageOpen = !this.isLanguageOpen
    },
    themeOpen() {
      this.isThemeOpen = !this.isThemeOpen
    },
  },
  computed: {
    ...mapState('cart', ['cart']),

    isCartEmpty(): boolean {
      return this.cart.length === 0
    },
  },
  setup() {
    const cartStore = useCart()
    return { cartStore }
  },
})
</script>

<style lang="scss">
.header {
  position: fixed;

  background: var(--color-header-bg);
  color: var(--color-header);
  box-shadow: 0 2px 8px 2px var(--color-header-bg);

  height: var(--header-height);
  width: 100%;

  z-index: 10;

  display: flex;
  align-items: center;
  justify-content: center;
}

[anim='header-icon-ripple'] {
  position: relative;
  overflow: hidden;

  &:before {
    content: '';
    position: absolute;
    display: block;
    background: var(--ripple-icon-background);
    border-radius: 50%;
    pointer-events: none;

    //  position and size
    top: calc(var(--y) * 1px);
    left: calc(var(--x) * 1px);
    width: calc(var(--d) * 1px);
    height: calc(var(--d) * 1px);

    //  animated properties
    opacity: calc(var(--o, 1) * var(--ripple-icon-opacity));
    transition: calc(var(--t, 0) * var(--ripple-icon-duration)) var(--ripple-icon-easing);
    transform: translate(-50%, -50%) scale(var(--s, 1));
    transform-origin: center;
  }
}

.header-item {
  position: relative;
}

.header-icon {
  border-radius: 90%;
  width: 44px;
  height: 44px;

  display: flex;
  align-items: center;
  justify-content: center;

  cursor: pointer;

  > * {
    pointer-events: none;
  }
}

.header-tip-cart {
  position: absolute;
  bottom: 0;
  right: 0;
  z-index: 10;

  display: flex;
  align-items: center;
  justify-content: center;

  width: 20px;
  height: 20px;

  background-color: var(--color-header-bg);
  border: 1px solid var(--color-border);
  border-radius: 90%;

  span {
    color: var(--color-highlight);
    font-weight: 900;
    line-height: 1;
  }
}

.header-personal,
.header-utils,
.header-category,
.header-logo {
  user-select: none;
  display: flex;
  align-items: center;
}

.header-category {
  margin-right: 20px;
  font-size: 1rem;
  cursor: pointer;

  a {
    display: flex;
    flex-direction: row;
    align-items: center;
  }

  @include mobile {
    margin-right: auto;
  }

  &__title {
    color: var(--color-header);
    font-weight: 500;

    @include mobile {
      display: none;
    }
  }
}

.header-logo {
  margin-left: 10px;
  h1 {
    font-size: 1rem;
  }
  @include mobile {
    display: none;
  }
}

.header-br {
  width: 1px;
  height: 50%;
  background-color: var(--color-header-icon);
  margin: 0 15px;

  @include mobile {
    display: none;
  }
}
</style>

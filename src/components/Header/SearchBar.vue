<template>
  <div className="search">
    <div
      v-if="appStore.state.viewportCategory === 'medium' || appStore.state.viewportCategory === 'large'"
      className="search-bar"
    >
      <input
        type="text"
        class="search-bar__input"
        :class="{ active: false }"
        :placeholder="$t('input.title')"
        @input="handlerChangeText"
      />
    </div>
    <div v-else className="search-bar-mobile">
      <button className="search-bar__button">
        <svg
          class="search-bar__icon"
          xmlns="http://www.w3.org/2000/svg"
          height="24px"
          viewBox="0 0 24 24"
          width="24px"
          fill="#000000"
        >
          <path d="M0 0h24v24H0V0z" fill="none" />
          <path
            d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"
          />
        </svg>
      </button>
    </div>
  </div>
</template>

<script lang="ts">
import { useStore } from '@/store'
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'SearchBar',
  data() {
    return {
      saveTimer: {} as any,
      term: '',
    }
  },
  methods: {
    handlerChangeText(e: any) {
      this.setTerm(e.target.value)
      clearTimeout(this.saveTimer)

      console.log('aaa', this.appStore.state.viewportCategory)

      // Debounce
      this.saveTimer = setTimeout(() => {
        this.getSearch('term')
      }, 500)
    },

    setTerm(str: string) {
      this.term = str
    },

    getSearch(str: string) {
      this.term = str
    },
  },
  setup() {
    const appStore = useStore()
    return { appStore }
  },
})
</script>

<style lang="scss">
.search {
  display: flex;
  max-width: 800px;
  width: 100%;
  height: 100%;
  justify-content: right;
  align-items: center;
  z-index: 2;
}

.search-bar {
  position: relative;
  display: flex;
  align-items: center;
  z-index: 2;
  width: 100%;
  margin: 0 10px;

  &__input {
    cursor: pointer;
    background-color: #3a3a3a;
    border-radius: 20px;
    width: 100%;

    padding: 0 10px;

    min-height: 35px;

    z-index: 1;

    color: var(--font-color-base);

    &:focus {
      cursor: text;
      outline: none;
      border: 0px solid var(--color-input-shadow);
      box-shadow: 0 0 5px var(--color-input-shadow);
    }
  }

  &__button {
    width: 44px;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  &__icon {
    fill: var(--color-header-icon);
  }
}

.search-bar-mobile {
}
</style>

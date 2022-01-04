<template>
  <div v-resizeWindow="changeWidth" :style="{ left: width2 }" class="search-filters">
    <div class="search-filters-header">
      <h1 class="search-filters-header__title">Фильтры</h1>
    </div>
    <div class="search-filters-inner control-filters">
      <label class="control-filters__checkbox">
        <input type="checkbox" class="control-filters__input" />
        <div class="control-filters__indicator control-filters__indicator_checkbox" />
        <span class="control-filters__text">Что то ...</span>
      </label>

      <label class="control-filters__checkbox">
        <input type="checkbox" class="control-filters__input" />
        <div class="control-filters__indicator control-filters__indicator_checkbox" />
        <span class="control-filters__text">Что то ...</span>
      </label>

      <label class="control-filters__checkbox">
        <input type="checkbox" class="control-filters__input" />
        <div class="control-filters__indicator control-filters__indicator_checkbox" />
        <span class="control-filters__text">Что то ...</span>
      </label>

      <label class="control-filters__checkbox">
        <input type="checkbox" class="control-filters__input" />
        <div class="control-filters__indicator control-filters__indicator_checkbox" />
        <span class="control-filters__text">Что то ...</span>
      </label>

      <label class="control-filters__checkbox">
        <input type="checkbox" class="control-filters__input" />
        <div class="control-filters__indicator control-filters__indicator_checkbox" />
        <span class="control-filters__text">Что то ...</span>
      </label>
      <label class="control-filters__checkbox">
        <input type="checkbox" class="control-filters__input" />
        <div class="control-filters__indicator control-filters__indicator_checkbox" />
        <span class="control-filters__text">Что то ...</span>
      </label>
    </div>
  </div>
</template>

<script lang="ts">
import { calculateFilterMenuMargin } from '@/utils'
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'SearchFilters',
  data: () => {
    return {
      width2: calculateFilterMenuMargin(window.innerWidth),
    }
  },
  methods: {
    changeWidth: function (event: any) {
      this.width2 = calculateFilterMenuMargin(event.currentTarget.innerWidth)
    },
  },
})
</script>

<style lang="scss">
.search-filters {
  position: fixed;
  max-width: 300px;
  width: 100%;
  overflow: auto;

  top: calc(var(--header-height) + 30px);
  bottom: var(--footer-content-padding);

  background-color: var(--color-background-content);
  box-shadow: 0 0 2px rgba(0, 0, 0, 0.1);

  border-radius: 5px;

  @include mobile {
    display: none;
  }
}

.search-filters-header {
  color: var(--color-text);
  min-height: 50px;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  padding: 5px;

  &__title {
    font-size: 1rem;
  }
}

.search-filters-inner {
  border-radius: 5px;
  padding: 5px;
  height: auto;
  padding-bottom: 35px;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-between;

  .control-filters {
    display: flex;
    flex-direction: row;

    &__checkbox {
      display: flex;
      flex-direction: row;

      min-width: 140px;
      // width: 100%;
      padding: 4px 10px 4px 0;
    }

    &__input {
      pointer-events: all;
      visibility: hidden;
      position: absolute;
      z-index: -1;
      opacity: 0;

      &:checked ~ .control-filters__indicator_checkbox,
      .control-filters__input:checked ~ .control-filters__indicator_radio {
        border-color: var(--color-highlight);
      }

      &:checked ~ .control-filters__indicator {
        background: var(--color-highlight);
      }

      &:checked ~ .control-filters__indicator_checkbox:after {
        // background-image:
      }
    }

    &__indicator {
      width: 16px;
      height: 16px;
      flex-shrink: 0;
      position: relative;
      cursor: pointer;
      transition: 0.15s ease;

      &_checkbox {
        border: 1px solid var(--color-background-highlight);
        background-color: var(--color-background-highlight);
        border-radius: 3px;
      }
    }

    &__text {
      margin-left: 8px;
      white-space: nowrap;
      text-overflow: ellipsis;
      overflow: hidden;
      flex-grow: 1;
    }
  }
}

.search-filters-item {
  font-size: 1rem;
}
</style>

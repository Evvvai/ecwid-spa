<template>
  <div
    v-clickOutside="clickOutside"
    v-resizeWindow="changeWidth"
    :class="{ active: isOpen }"
    :style="{ left: width2 }"
    class="search-sort control"
    ref="sortMenu"
  >
    <h1 class="search-sort__text">{{ $t('sort.title') }}</h1>

    <label v-for="sort in sortingOptions" :key="sort" class="control menu__item">
      <input
        @click="handleOnClickSort"
        :checked="sortSetting.sort === sort"
        class="control__input"
        type="radio"
        name="sort"
        :value="sort"
      />
      <span class="control__indicator control__indicator_radio"></span>
      <span class="control__text">{{ $t('sort.' + sort) }}</span>
    </label>

    <hr class="search-sort__hr" />

    <label v-for="dir in sortingDirections" :key="dir" class="control menu__item">
      <input
        @click="handleOnClickDir"
        :checked="sortSetting.dir === dir"
        class="control__input"
        type="radio"
        name="dir"
        :value="dir"
      />
      <span class="control__indicator control__indicator_radio"></span>
      <span class="control__text">{{ $t('dir.' + dir) }}</span>
    </label>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType, ref } from 'vue'
import { sortingOptions, sortingDirections, SortSetting } from '@/types'
import { calculateSortMenuMargin } from '@/utils'

export default defineComponent({
  name: 'SearchSort',
  props: {
    isOpen: Boolean,
    sortSetting: {
      type: Object as PropType<SortSetting>,
      required: true,
    },
    handleOnClickSortOption: {
      type: Function as PropType<(value: SortSetting) => void>,
      required: true,
    },
    closeMenu: {
      type: Function as PropType<() => void>,
      required: true,
    },
    sortHeader: {
      type: Object as PropType<any>,
      required: true,
    },
  },
  data() {
    return {
      width2: calculateSortMenuMargin(window.innerWidth),
    }
  },
  methods: {
    changeWidth: function (event: any) {
      this.width2 = calculateSortMenuMargin(event.currentTarget.innerWidth)
      // console.log('event.currentTarget.innerWidth', event.currentTarget.innerWidth)
    },
    handleOnClickSort(event: any) {
      const value = event.target.value
      if (this.sortSetting.sort !== value)
        this.handleOnClickSortOption({ ...this.sortSetting, sort: value } as SortSetting)
    },
    handleOnClickDir(event: any) {
      const value = event.target.value
      if (this.sortSetting.dir !== value)
        this.handleOnClickSortOption({ ...this.sortSetting, dir: value } as SortSetting)
    },
    clickOutside(el: any) {
      if (
        this.isOpen &&
        !(el == this.sortMenu || this.sortMenu.contains(el)) &&
        !(el == this.sortHeader || this.sortHeader.contains(el))
      ) {
        this.closeMenu()
      }
    },
  },
  setup() {
    const sortMenu = ref()

    return { sortingOptions, sortingDirections, sortMenu }
  },
})
</script>

<style lang="scss">
.search-sort {
  position: fixed;
  top: 140px;
  left: 100px;
  z-index: 999999;

  pointer-events: none;
  opacity: 0;

  padding: 8px 0;
  margin: 0;
  min-width: 140px;
  border: none;
  border-radius: 5px;

  background-color: var(--color-background-highlight);
  box-shadow: rgb(0 0 0 / 20%) 0px 4px 16px;
  padding: 10px;

  &.active {
    pointer-events: all;
    opacity: 1;
    transform: translateY(0px);
    transition: transform 0.1s ease-in, opacity 0.1s ease-in;
  }
  transform: translateY(15px);
  transition: transform 0.1s ease-in, opacity 0.1s ease-in;

  &__hr {
    width: 100%;
    margin: 5px 0;
  }

  &__text {
    width: 100%;
    color: var(--color-text);
  }

  .control {
    display: flex;
    align-items: center;
    justify-content: flex-start;
    width: 100%;
    margin-bottom: 0;
    font-weight: 400;
    user-select: none;
    cursor: pointer;
    padding: 5px;

    &__input {
      visibility: hidden;
      position: absolute;
      z-index: -1;
      opacity: 0;

      &:checked {
        ~ .control {
          &__indicator {
            background: var(--color-highlight);
          }
        }
      }
    }

    &__indicator {
      width: 16px;
      height: 16px;
      flex-shrink: 0;
      position: relative;
      cursor: pointer;
      transition: 0.15s ease;

      &::after {
        content: '';
        position: absolute;
        top: -1px;
        bottom: -1px;
        left: -1px;
        right: -1px;
        opacity: 0;
        background-position: 50%;
        background-repeat: no-repeat;
        transition: opacity 0.15s ease, transform 0.15s ease;
      }

      &_radio {
        border-radius: 50%;
        background-color: var(--color-background-content);
        border: solid 1px var(--color-border);
      }
    }

    &__text {
      margin-left: 8px;
      white-space: nowrap;
      text-overflow: ellipsis;
      overflow: hidden;
      color: var(--color-text);
    }
  }
}
</style>

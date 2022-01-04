<template>
  <div class="category">
    <div class="category-list">
      <div class="category-inner">
        <div class="category-content">
          <header class="category-header">
            <h1 class="category-header__title">{{ category.name }}</h1>
            <div ref="sortHeader" @mousedown="toggleSortMenu" class="category-header__sort-button">
              <svg
                class="sort__icon"
                xmlns="http://www.w3.org/2000/svg"
                height="20px"
                viewBox="0 0 24 24"
                width="20px"
                fill="#000000"
              >
                <path d="M0 0h24v24H0V0z" fill="none" />
                <path d="M3 18h6v-2H3v2zM3 6v2h18V6H3zm0 7h12v-2H3v2z" />
              </svg>
              <!-- <button class="sort__title">По Цена</button> -->
              <button class="sort__title">По {{ $t('sort.' + sortSetting.sort) }}</button>
              <svg
                class="sort__arrow"
                xmlns="http://www.w3.org/2000/svg"
                height="18px"
                viewBox="0 0 24 24"
                width="18px"
                fill="#000000"
              >
                <path d="M0 0h24v24H0V0z" fill="none" />
                <path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12l4.58-4.59z" />
              </svg>
            </div>
            <!-- <teleport to="body"> -->
            <SearchSort
              :isOpen="isSortOpen"
              :sortSetting="sortSetting"
              :handleOnClickSortOption="handleOnClickSortOption"
              :closeMenu="toggleSortMenu"
              :sortHeader="$refs.sortHeader"
            />
            <!-- </teleport> -->
          </header>

          <div class="category-grid">
            <div v-for="product in product.items" :key="product.id" class="category-wrapper">
              <router-link :to="`/product/${product.id}`">
                <div class="category-item">
                  <div class="category-item__preview">
                    <my-image
                      :className="'category-item__img'"
                      :width="product.originalImage.width"
                      :height="product.originalImage.height"
                      :src="product.imageUrl"
                    />
                  </div>
                  <div class="category-item__description description-content">
                    <h2 class="description-content__title">
                      {{ product.name }}
                    </h2>
                    <div class="description-content__price">{{ product.defaultDisplayedPriceFormatted }}</div>
                  </div>
                </div>
              </router-link>
            </div>
          </div>
        </div>
      </div>
    </div>
    <SearchFilters />
  </div>
</template>

<script lang="ts">
import SearchFilters from '../components/Category/SearchFilters.vue'
import SearchSort from '../components/Category/SearchSort.vue'

import { Category, Product, Products, SortSetting } from '@/types'

import { defineComponent, PropType } from 'vue'
import { useRoute } from 'vue-router'

import { Api } from '@/utils/api'
import { matchIdFromUrl, validateUrl } from '@/utils'

export default defineComponent({
  name: 'Category',
  components: { SearchFilters, SearchSort },
  data: () => {
    return {
      isLoad: false, // for loader
      product: {} as Products, //  product: [] as PropType<Product[]>,
      category: {} as Category,
      sortSetting: {
        sort: 'name',
        dir: 'desc',
      } as SortSetting,
      isSortOpen: false,
    }
  },
  async created() {
    const route = useRoute()
    const id = matchIdFromUrl(route.params?.name as string)

    if (id === null) this.$router.replace('/category')
    else {
      try {
        this.category = await Api().category.getOne(id)
        const arr = validateUrl(this.$route.query)

        if (arr.length > 0) {
          this.sortSetting.sort = (arr.find((x: any) => x['key'] === 'sort') || { value: 'popularity' })['values']
          this.sortSetting.dir = (arr.find((x: any) => x['key'] === 'dir') || { value: 'desc' })['values']
        }

        const url = this.category.url.substring(this.category.url.lastIndexOf('/') + 1, this.category.url.length)
        this.$router.replace(url + `?sort=${this.sortSetting.sort}&dir=${this.sortSetting.dir}`)

        // this.$router.push({ query: { sort: this.sortSetting.sort, dir: this.sortSetting.dir } })// not work correct )0)0 iHAtePaRSing
        window.document.title = this.category.name

        this.product = await Api().product.getAll(this.category.id, this.sortSetting)
      } catch (e) {
        // this.$router.replace('/category')
        // console.log('e', e)
      }
    }
  },
  methods: {
    toggleSortMenu() {
      this.isSortOpen = !this.isSortOpen
    },
    async handleOnClickSortOption(value: SortSetting) {
      this.sortSetting = value
      this.$router.push({ query: { sort: this.sortSetting.sort, dir: this.sortSetting.dir } })

      // It is better to put it separately in the store action
      this.product = await Api().product.getAll(this.category.id, this.sortSetting)
    },
  },
  setup() {
    return {}
  },
})
</script>

<style lang="scss">
.category {
  position: relative;
  max-width: 1200px;
  width: 100%;
  height: 100%;
}

.category-header {
  width: 100%;

  display: flex;
  justify-content: space-between;
  align-items: center;

  &__title {
    padding-left: 10px;
    font-size: 1.2rem;
  }

  &__sort-button {
    user-select: none;
    display: flex;
    align-items: center;

    min-width: 140px;
    padding: 8px;

    border-radius: 2px;

    &:hover {
      * {
        cursor: pointer;
      }
      background-color: var(--color-background-content);
    }

    .sort {
      &__icon {
        fill: var(--color-text);
      }
      &__title {
        padding: 0 5px;
        color: var(--color-text);
      }
      &__arrow {
        transform: rotate(-90deg);
        fill: var(--color-text);
      }
    }
  }
}

.category-wrapper {
  padding: 8px;
  width: 50%;

  @include tablet {
    width: 33.3%;
  }

  @include desktop {
    width: 25%;
  }
}

.category-item {
  position: relative;
  display: block;
  cursor: pointer;
  overflow: hidden;
  min-height: 300px;

  &__preview {
    width: 100%;
    height: 100%;
    overflow: hidden;
    border-radius: 5px;
  }

  &__img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    background-color: var(--color-background-highlight);

    &:hover {
      transform: scale(1.05);
      transition: 0.2s cubic-bezier(0.075, 0.82, 0.165, 1);
    }
    transition: 0.2s ease-out;
  }

  &__description {
    .description-content {
      &__title {
        padding-top: 7px;
        color: var(--color-text);
        height: 45px;
        overflow: hidden;
        text-overflow: ellipsis;
      }

      &__price {
        color: var(--color-sub-text);
        height: 25px;
        width: 100%;
        line-height: 2;
      }
    }
  }

  padding-bottom: 25px;
}

.category-grid {
  display: flex;
  flex-wrap: wrap;
  padding: 4px 5px;
  width: 100%;
}

.category-list {
  width: calc(100% - 310px);
  margin-top: 35px;

  @include mobile {
    width: 100%;
  }
}

.category-content {
  background-color: var(--color-background-content);
  border-radius: 5px;
  box-shadow: 0 0 2px rgba(0, 0, 0, 0.1);

  border-radius: 5px;
  padding: 5px;
  margin: 0 5px;
  min-height: calc(100vh - var(--footer-content-padding) - var(--header-content-padding) - 10px);
  height: 100%;

  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  gap: 5px;
}

.category-inner {
  padding-bottom: 10px;
}
</style>

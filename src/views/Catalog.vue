<template>
  <div class="catalog">
    <div class="catalog-list">
      <div class="catalog-inner">
        <div class="catalog-content">
          <header class="catalog-header">
            <h1 class="catalog-header__title">{{ $t('catalog.title') }}</h1>
          </header>

          <div class="catalog-grid">
            <div v-for="category in categories.items" :key="category.id" class="catalog-wrapper">
              <router-link :to="`/category/${category.id}`">
                <div class="catalog-item">
                  <div class="catalog-item__preview">
                    <my-image
                      :className="'catalog-item__img'"
                      :width="category.originalImage.width"
                      :height="category.originalImage.height"
                      :src="category.imageUrl"
                    />
                  </div>
                  <div class="catalog-item__description description-content">
                    <h2 class="description-content__title">
                      {{ category.name }}
                    </h2>
                  </div>
                </div>
              </router-link>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { Categories } from '@/types'
import { Api } from '@/utils/api'

export default defineComponent({
  name: 'Catalog',
  data: () => {
    return {
      isLoad: false, // for loader
      categories: {} as Categories,
    }
  },
  async created() {
    this.categories = await Api().category.getAll()
  },
  methods: {},
  setup() {
    return {}
  },
})
</script>

<style lang="scss">
.catalog {
  position: relative;
  max-width: 1200px;
  width: 100%;
  height: 100%;
}

.catalog-header {
  width: 100%;

  display: flex;
  justify-content: space-between;
  align-items: center;

  &__title {
    font-size: 1.2rem;
  }
}

.catalog-wrapper {
  padding: 8px;
  width: 50%;

  @include tablet {
    width: 33.3%;
  }

  @include desktop {
    width: 25%;
  }
}

.catalog-item {
  position: relative;
  display: block;
  cursor: pointer;
  overflow: hidden;

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
    position: absolute;
    bottom: 0;
    right: 0;
    width: 100%;

    .description-content {
      &__title {
        color: var(--color-text);
        height: 45px;
        overflow: hidden;
        text-overflow: ellipsis;
        font-size: 1.5rem;
        text-align: center;
      }
    }
  }
}

.catalog-grid {
  display: flex;
  flex-wrap: wrap;
  padding: 4px 5px;
  width: 100%;
}

.catalog-list {
  width: 100%;
  margin-top: 35px;

  @include mobile {
    width: 100%;
  }
}

.catalog-content {
  // background-color: var(--color-background-content);
  // box-shadow: 0 0 2px rgba(0, 0, 0, 0.1);

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
</style>

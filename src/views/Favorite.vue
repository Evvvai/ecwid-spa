<template>
  <section class="favorite-empty" v-if="isEmpty">
    <h1 class="favorite-empty__title">{{ $t('favorite.empty') }}</h1>
    <router-link :to="`/category`">
      <button class="favorite-empty__button">{{ $t('titles.inCatalog') }}</button>
    </router-link>
  </section>
  <section v-else class="favorite">
    <div class="favorite-list">
      <div class="favorite-inner">
        <div class="favorite-content">
          <header class="favorite-header">
            <h1 class="favorite-header__title">{{ $t('favorite.title') }}</h1>
          </header>

          <div class="favorite-grid">
            <div v-for="item in favorite" :key="item.id" class="favorite-wrapper">
              <div class="favorite-item">
                <router-link :to="`/product/${item.id}`">
                  <div class="favorite-item__preview">
                    <my-image
                      :className="'favorite-item__img'"
                      :width="item.originalImage.width"
                      :height="item.originalImage.height"
                      :src="item.imageUrl"
                    />
                  </div>
                </router-link>
                <div class="favorite-item__description description-content">
                  <h2 class="description-content__title">
                    {{ item.name }}
                  </h2>
                  <div class="description-content__price">{{ item.defaultDisplayedPriceFormatted }}</div>
                  <div class="description-content__control">
                    <span :class="{ lock: isCart(item) }" @click="addCart(item)"
                      ><svg
                        xmlns="http://www.w3.org/2000/svg"
                        height="24px"
                        viewBox="0 0 24 24"
                        width="24px"
                        fill="#000000"
                      >
                        <path d="M0 0h24v24H0V0z" fill="none" />
                        <path
                          d="M11 9h2V6h3V4h-3V1h-2v3H8v2h3v3zm-4 9c-1.1 0-1.99.9-1.99 2S5.9 22 7 22s2-.9 2-2-.9-2-2-2zm10 0c-1.1 0-1.99.9-1.99 2s.89 2 1.99 2 2-.9 2-2-.9-2-2-2zm-8.9-5h7.45c.75 0 1.41-.41 1.75-1.03l3.86-7.01L19.42 4l-3.87 7H8.53L4.27 2H1v2h2l3.6 7.59-1.35 2.44C4.52 15.37 5.48 17 7 17h12v-2H7l1.1-2z"
                        /></svg
                    ></span>
                    <span @click="removeFavorite(item)"
                      ><svg
                        xmlns="http://www.w3.org/2000/svg"
                        height="24px"
                        viewBox="0 0 24 24"
                        width="24px"
                        fill="#8b8c8d"
                      >
                        <path d="M0 0h24v24H0V0z" fill="none" />
                        <path
                          d="M16.5 3c-1.74 0-3.41.81-4.5 2.09C10.91 3.81 9.24 3 7.5 3 4.42 3 2 5.42 2 8.5c0 3.78 3.4 6.86 8.55 11.54L12 21.35l1.45-1.32C18.6 15.36 22 12.28 22 8.5 22 5.42 19.58 3 16.5 3zm-4.4 15.55l-.1.1-.1-.1C7.14 14.24 4 11.39 4 8.5 4 6.5 5.5 5 7.5 5c1.54 0 3.04.99 3.57 2.36h1.87C13.46 5.99 14.96 5 16.5 5c2 0 3.5 1.5 3.5 3.5 0 2.89-3.14 5.74-7.9 10.05z"
                        /></svg
                    ></span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script lang="ts">
import { useCart } from '@/store/modules/cartModule'
import { useFavorite } from '@/store/modules/favoriteModule'
import { Product } from '@/types'
import { defineComponent } from 'vue'
import { mapState } from 'vuex'

export default defineComponent({
  name: 'Favorite',
  data: () => {
    return {}
  },
  methods: {
    isCart(favorite: Product): boolean {
      return this.cart.find((product: any) => product.id === favorite.id) ? true : false
    },

    removeFavorite(favorite: Product) {
      this.favoriteStore.dispatch('favorite/remove', favorite)
    },
    addCart(favorite: Product) {
      this.cartStore.dispatch('cart/add', favorite)
    },
  },
  computed: {
    ...mapState('favorite', ['favorite']),
    ...mapState('cart', ['cart']),

    isEmpty(): boolean {
      return this.favorite.length === 0
    },
  },
  setup() {
    const cartStore = useCart()
    const favoriteStore = useFavorite()
    return { cartStore, favoriteStore }
  },
})
</script>

<style lang="scss">
.favorite-empty {
  height: 90vh;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  &__title {
    font-size: 1.5rem;
    padding-bottom: 40px;
  }

  &__button {
    background-color: var(--color-header-bg);
    height: 40px;
    width: 200px;
    border-radius: 10px;
    font-size: 1rem;
    color: var(--color-header);
    cursor: pointer;
  }
}

.favorite {
  position: relative;
  max-width: 1200px;
  width: 100%;
  height: 100%;
}

.favorite-header {
  width: 100%;

  display: flex;
  justify-content: space-between;
  align-items: center;

  &__title {
    font-size: 1.2rem;
  }
}

.favorite-wrapper {
  padding: 8px;
  width: 50%;

  @include tablet {
    width: 33.3%;
  }

  @include desktop {
    width: 25%;
  }
}

.favorite-item {
  position: relative;
  display: block;
  cursor: pointer;
  overflow: hidden;

  &:hover {
    .description-content__control {
      opacity: 1;
      transition: 0.2s ease-in;
    }
  }

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
    position: relative;
    width: 100%;

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

      &__control {
        position: absolute;
        right: 5px;
        top: 0;
        height: 100%;
        opacity: 0;
        transition: 0.2s ease-in;

        @include mobile {
          opacity: 1;
        }

        span {
          border-radius: 50%;
          background-color: var(--color-background-highlight);
          display: flex;
          align-items: center;
          justify-content: center;
          width: 30px;
          height: 30px;

          &.lock {
            opacity: 0;
            pointer-events: none;
          }

          svg {
            width: 25px;
            fill: var(--color-text);
            width: 20px;
            height: 20px;
          }
          &:hover {
            transform: scale(1.1);
            transition: 0.2s ease-in;
          }
          transition: 0.2s ease-out;
        }

        display: flex;
        flex-direction: column;
        justify-content: space-evenly;
      }
    }
  }
}

.favorite-grid {
  display: flex;
  flex-wrap: wrap;
  padding: 4px 5px;
  width: 100%;
}

.favorite-list {
  width: 100%;
  margin-top: 35px;

  @include mobile {
    width: 100%;
  }
}

.favorite-content {
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

<template>
  <section class="product">
    <div v-if="product.galleryImages?.length" class="product-layout">
      <div class="gallery-content-wrapper">
        <div class="gallery-content-wrapper__content">
          <div class="gallery-aside-wrapper aside-wrapper">
            <ul class="aside-wrapper-content">
              <li
                :class="{ active: imageSelected === key }"
                class="aside-wrapper-item"
                v-for="(image, key) in product.galleryImages"
                :key="key"
              >
                <button @click="imageSwipe(key)">
                  <img :src="image.url" />
                </button>
              </li>
            </ul>
          </div>
          <div class="product-carousel">
            <div class="product-carousel-animate gallery-images">
              <div
                :style="{
                  left: -imageSelected * 100 + '%',
                  width: product.galleryImages.length * 100 + '%',
                }"
                class="gallery-images"
              >
                <div v-for="(image, key) in product.galleryImages" :key="key" class="gallery-image">
                  <my-image
                    :className="'product-carousel__img'"
                    :width="image.width"
                    :height="image.height"
                    :src="image.url"
                  />
                </div>
              </div>
            </div>
            <button @click="imageSwipeLeft" class="product-carousel__arrow left">
              <img src="../assets/icon/chevron.svg" />
            </button>
            <button @click="imageSwipeRight" class="product-carousel__arrow right">
              <img src="../assets/icon/chevron.svg" />
            </button>
          </div>
        </div>
      </div>

      <div class="product-aside aside-content">
        <div class="aside-content">
          <h1 class="aside-content__title">{{ product.name }}</h1>
          <div class="aside-content__price">{{ product.defaultDisplayedPriceFormatted }}</div>

          <div class="aside-description">
            <h2 class="aside-description__title">Информация о товаре</h2>
            <div class="aside-description__info">
              <span v-html="product.description"></span>
            </div>
          </div>
          <div class="aside-action">
            <button @click="addCart" :class="{ active: isCart }" class="aside-action__cart" type="button">
              {{ isCart ? 'Удалить из корзины' : 'Добавить в корзину' }}
            </button>
            <span @click="addFavorite" :class="{ active: isFavorite }" class="aside-action__save">
              <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="#8b8c8d">
                <path d="M0 0h24v24H0V0z" fill="none" />
                <path
                  d="M16.5 3c-1.74 0-3.41.81-4.5 2.09C10.91 3.81 9.24 3 7.5 3 4.42 3 2 5.42 2 8.5c0 3.78 3.4 6.86 8.55 11.54L12 21.35l1.45-1.32C18.6 15.36 22 12.28 22 8.5 22 5.42 19.58 3 16.5 3zm-4.4 15.55l-.1.1-.1-.1C7.14 14.24 4 11.39 4 8.5 4 6.5 5.5 5 7.5 5c1.54 0 3.04.99 3.57 2.36h1.87C13.46 5.99 14.96 5 16.5 5c2 0 3.5 1.5 3.5 3.5 0 2.89-3.14 5.74-7.9 10.05z"
                />
              </svg>
            </span>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useRoute } from 'vue-router'

import { Product } from '@/types'

import { Api } from '@/utils/api'
import { mapState } from 'vuex'
import { useFavorite } from '@/store/modules/favoriteModule'
import { useCart } from '@/store/modules/cartModule'
import { useStore } from '@/store'

export default defineComponent({
  name: 'Product',
  components: {},
  data: () => {
    return {
      isLoad: false, // for loader
      product: {} as Product,
      imageSelected: 0,
    }
  },
  methods: {
    imageSwipe(index: number) {
      this.imageSelected = index
    },
    imageSwipeLeft() {
      this.imageSelected =
        this.product.galleryImages.length > 1 && this.product.galleryImages.length - 1 !== this.imageSelected
          ? this.imageSelected + 1
          : 0
    },
    imageSwipeRight() {
      this.imageSelected =
        this.product.galleryImages.length > 1 && 0 !== this.imageSelected
          ? this.imageSelected - 1
          : this.product.galleryImages.length - 1
    },
    addFavorite() {
      if (!this.isFavorite) this.favoriteStore.dispatch('favorite/add', this.product)
      else this.favoriteStore.dispatch('favorite/remove', this.product)
    },
    addCart() {
      if (!this.isCart) this.cartStore.dispatch('cart/add', this.product)
      else this.cartStore.dispatch('cart/remove', this.product)
    },
  },
  created() {
    const route = useRoute()

    const url: string = route.params?.name as string
    const regex = /\d+((.|,)\d+)?/
    const result = url.match(regex) || []

    if (result.length === 0) this.$router.push('/not-found')
    result.forEach(async (id, i) => {
      if (i === 0)
        try {
          const data = await Api().product.getOne(+id)
          this.product = data
          this.isLoad = true
          window.document.title = data.name
          this.$router.replace(data.url.substring(data.url.lastIndexOf('/') + 1, data.url.length))
        } catch (e) {
          this.$router.push('/not-found')
        }
    })
  },
  computed: {
    ...mapState('favorite', ['favorite']),
    ...mapState('cart', ['cart']),

    isCart(): boolean {
      return this.cart.find((product: any) => product.id === this.product.id)
    },
    isFavorite(): boolean {
      return this.favorite.find((product: any) => product.id === this.product.id)
    },
  },
  setup() {
    const cartStore = useCart()
    const favoriteStore = useFavorite()
    const store = useStore()
    return { cartStore, favoriteStore, store }
  },
})
</script>

<style lang="scss">
.product {
  min-width: 100%;
  float: left;
  display: block;
  margin-top: 50px;
}

.product-layout {
  width: 100%;
  margin: 0 auto;
  max-width: 960px;
  position: relative;
  // padding: 0 5px;
}

.gallery-content-wrapper {
  width: 66%;

  &__content {
    display: flex;
    float: left;
    position: relative;
    padding: 0 10px;
    margin-bottom: 30px;
    width: 100%;
    box-sizing: border-box;
    gap: 5px;
  }

  @include mobile {
    width: 100%;
  }
}

.gallery-aside-wrapper {
  flex-basis: 13%;
  flex-grow: 1;
  position: relative;

  @include mobile {
    display: none;
  }

  .aside-wrapper-content {
    padding-right: 17px;
    margin-top: 20px;
    text-align: center;
    box-sizing: border-box;
  }

  .aside-wrapper-item {
    padding: 0 0 11px;

    button {
      cursor: pointer;

      img {
        user-select: none;
        // pointer-events: none;
      }
    }

    &.active {
      button {
        border: 2px solid var(--color-highlight);
        // box-shadow: 0 0 4px var(--color-highlight);

        &:hover {
          transform: scale(1.1);
          transition: all 0.2s ease-in;
        }
        transition: all 0.2s ease-out;
      }
    }
  }
}

.product-carousel {
  background-color: var(--background-color);
  flex-basis: 83%;
  flex-grow: 1;
  overflow: hidden;
  position: relative;

  ::before {
    content: '';
    float: left;
    padding-top: 133%;
  }

  &__arrow {
    border: 0;
    background-color: transparent;
    position: absolute;
    top: 0;
    z-index: 1;
    cursor: pointer;
    pointer-events: all;

    height: 100%;
    width: 100px;
    // background-color: black;

    &:hover {
      img {
        opacity: 0.5;
      }
    }

    img {
      width: 40px;
      height: 40px;
      opacity: 0.1;
    }

    &.left {
    }

    &.right {
      right: 0;

      img {
        transform: rotate(180deg);
      }
    }
  }

  &__img {
    position: relative;
    width: 100%;
    float: left;
    z-index: 1;
    min-height: 1px;
    user-select: none;
    // pointer-events: none;
    object-fit: contain;
    // object-position: 0 0;
  }

  &__container {
  }

  @include mobile {
    margin-right: 0;
  }
}

.product-carousel-animate {
  width: 100%;
  overflow: hidden;

  .gallery-images {
    // pointer-events: none;
    position: absolute;
    left: 0%;
    display: flex;
    flex-direction: row;
    width: 200%;
    height: 100%;
    transition: all 0.2s ease-in-out;
  }

  .gallery-image {
    display: flex;
    flex-direction: row;
    width: 100%;
    height: 100%;
    background-color: var(--background-color);
  }
}

.product-aside {
  margin-top: 15px;
  float: left;
  display: block;
  width: 34%;

  .aside-content {
    margin-left: 25px;
    &__title {
      font-size: 1.4rem;
    }
    &__price {
      font-size: 1.25rem;
    }
  }

  @include mobile {
    width: 100%;
    padding: 0 5%;

    .aside-content {
      margin-left: 0;
    }
  }
}

.aside-content {
  min-height: 629px;
  position: relative;
  box-sizing: border-box;
  float: left;

  @include mobile {
    min-height: 500px;
  }
}

.aside-action {
  display: flex;
  padding: 5px;
  gap: 20px;

  margin-top: 25px;

  &__cart {
    cursor: pointer;
    border-radius: 5px;
    width: 100%;
    height: 40px;
    background-color: var(--color-submit-bg);

    &:hover {
      background-color: var(--color-submit-bg-hover);
    }
  }

  &__save {
    height: 40px;
    min-width: 40px;
    background-color: var(--color-background-highlight);
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    pointer-events: all;
    cursor: pointer;

    &.active {
      svg {
        fill: rgb(0, 122, 96);
      }
    }
  }
}

.aside-description {
  margin-top: 25px;

  &__title {
  }
  &__info {
  }
}
</style>

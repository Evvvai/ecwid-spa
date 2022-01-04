<template>
  <section class="cart-empty" v-if="isEmpty">
    <h1 class="cart-empty__title">{{ $t('cart.empty') }}</h1>
    <router-link :to="`/category`">
      <button class="cart-empty__button">{{ $t('titles.inCatalog') }}</button>
    </router-link>
  </section>
  <section v-else class="cart">
    <div class="cart-content">
      <header class="cart-header">
        <h1 class="cart-header__title">{{ $t('cart.title') }}</h1>
      </header>

      <div class="cart-inner">
        <div class="cart-grid cart-grid_cart">
          <div class="cart-items">
            <h1 class="cart-items__title">{{ $t('cart.items') }}</h1>
            <div v-for="item in cart" :key="item.id" class="cart-wrapper">
              <div class="cart-item">
                <router-link :to="`/product/${item.id}`">
                  <div class="cart-item__preview">
                    <my-image
                      :className="'cart-item__img'"
                      :width="item.originalImage.width"
                      :height="item.originalImage.height"
                      :src="item.imageUrl"
                    />
                  </div>
                </router-link>
                <div class="cart-item__description description-content">
                  <h2 class="description-content__title">
                    {{ item.name }}
                  </h2>
                  <div class="description-content__control">
                    <!-- Not implemented -->
                    <span>Размер 34</span>
                    <span>Кол-во 1</span>
                  </div>
                  <div class="description-content__price">{{ item.defaultDisplayedPriceFormatted }}</div>
                  <div @click="removeCart(item)" class="description-content__delete">
                    <div>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        height="24px"
                        viewBox="0 0 24 24"
                        width="24px"
                        fill="#000000"
                      >
                        <path d="M0 0h24v24H0V0z" fill="none" />
                        <path
                          d="M16 9v10H8V9h8m-1.5-6h-5l-1 1H5v2h14V4h-3.5l-1-1zM18 7H6v12c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7z"
                        />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <hr class="cart-items__hr" />
            <div class="cart-items__summary">
              <span>{{ $t('cart.summary') }}</span>
              <span>{{ totalPrice }}</span>
            </div>
          </div>
        </div>
        <div class="cart-grid cart-grid_order">
          <div class="cart-order">
            <h1 class="cart-order__title">{{ $t('cart.order') }}</h1>
            <div class="cart-order__description description-content">
              <button @click="orderCart" class="description-content__submit">{{ $t('cart.submit') }}</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>

  <teleport to="body">
    <my-modal :close="closeCart" :class="{ modal_open: isOrdered }">
      <div class="cart-accept" :close="closeCart">
        <span class="cart-accept__title">{{ $t('cart.accept') }}</span>
      </div>
    </my-modal>
  </teleport>
</template>

<script lang="ts">
import { useCart } from '@/store/modules/cartModule'
import { Product } from '@/types'
import { defineComponent } from 'vue'
import { mapState } from 'vuex'

export default defineComponent({
  name: 'Cart',
  data: () => {
    return {
      isOrdered: false,
    }
  },
  methods: {
    removeCart(cart: Product) {
      this.cartStore.dispatch('cart/remove', cart)
    },
    orderCart() {
      this.isOrdered = true
      // Some manipulations
      this.cartStore.dispatch('cart/clear')
    },
    closeCart() {
      this.isOrdered = false
    },
  },
  computed: {
    ...mapState('cart', ['cart']),

    totalPrice(): number {
      return this.cart.reduce((prev: number, x: Product) => {
        prev += x.price
        return prev
      }, 0)
    },

    isEmpty(): boolean {
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
.cart-empty {
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

.cart {
  position: relative;
  max-width: 1200px;
  width: 100%;
  height: 100%;
}

.cart-order {
  &__title {
    color: var(--color-text);
  }

  &__description {
    width: 100%;
    display: flex;
    @include mobile {
      justify-content: center;
    }

    .description-content {
      &__submit {
        height: 35px;
        cursor: pointer;
        width: 200px;
        color: var(--color-header);
        background-color: var(--color-header-bg);
        border-radius: 5px;

        @include mobile {
          margin-top: 25px;
          width: 100%;
        }
      }
    }
  }
}

.cart-items {
  &__title {
    color: var(--color-text);
  }

  &__summary {
    width: 100%;
    display: flex;
    justify-content: space-between;
    font-size: 1rem;
    font-weight: 500;
  }

  &__hr {
    margin-top: 25px;
    margin-bottom: 10px;
  }
}

.cart-header {
  margin-top: 20px;

  width: 100%;

  display: flex;
  justify-content: space-between;
  align-items: center;

  &__title {
    font-size: 1.2rem;
  }
}

.cart-wrapper {
  padding: 8px;
  width: 100%;
}

.cart-inner {
  display: flex;
  flex-direction: row;
  width: 100%;

  @include mobile {
    flex-direction: column;
  }
}

.cart-item {
  position: relative;
  display: flex;
  flex-direction: row;
  cursor: pointer;
  overflow: hidden;
  height: 100px;
  gap: 10px;

  &:hover {
    .description-content__delete {
      opacity: 1;
      transition: 0.2s ease-in;
    }
  }

  &__preview {
    width: 100px;
    height: 100px;
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
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    position: relative;
    width: 100%;
    height: 100%;

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
        display: flex;
        flex-direction: column;
        justify-content: space-evenly;
      }

      &__delete {
        position: absolute;
        display: flex;
        align-items: center;
        justify-content: center;
        bottom: 0;
        right: 0;
        height: 35px;
        width: 35px;
        border-radius: 50%;
        background-color: var(--color-background-highlight);
        opacity: 0;
        transition: 0.2s cubic-bezier(0.075, 0.82, 0.165, 1);

        @include mobile {
          opacity: 1;
        }
      }
    }
  }
}

.cart-grid {
  display: flex;
  flex-direction: column;
  padding: 4px 5px;
  width: 100%;

  &_cart {
    width: 40%;
  }

  &_order {
    width: 60%;
  }

  @include mobile {
    &_cart {
      width: 100%;
    }

    &_order {
      width: 100%;
    }
  }
}

.cart-list {
  width: 100%;
  margin-top: 35px;

  @include mobile {
    width: 100%;
  }
}

.cart-content {
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

.cart-accept {
  background-color: var(--color-background-highlight);
  height: 150px;
  width: 310px;

  display: flex;
  align-items: center;
  justify-content: center;

  &__title {
    font-size: 2rem;
    font-weight: 700;
  }
}
</style>

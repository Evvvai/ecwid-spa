<template>
  <div @mousedown="handleClose" class="modal" :class="{ modal_close: isLock }">
    <div class="modal__inner">
      <div @mousedown.stop class="modal__content">
        <slot></slot>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'MyModal',
  props: ['close'],
  data: () => {
    return {
      isLock: false,
    }
  },
  methods: {
    handleClose() {
      if (!this.isLock) {
        this.isLock = true
        setTimeout(() => {
          this.isLock = false
          this.close()
        }, 400)
      }
    },
  },
})
</script>

<style lang="scss">
.modal {
  display: none;
  position: fixed;

  top: 0;
  bottom: 0;
  left: 0;
  right: 0;

  z-index: 15;
  transform-origin: 0 0;
  flex-direction: column;
  align-items: center;
  padding: 40px 0;
  overflow-y: auto;

  &:before {
    content: '';
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    margin: -100px;
    z-index: 10;
    opacity: 0.5;
    background: black;
  }

  &.modal_open {
    &:before {
      animation: modal-open-before 0.4s cubic-bezier(0.075, 0.82, 0.165, 1);
    }
  }

  &.modal_close {
    &:before {
      animation: modal-close-before 0.4s cubic-bezier(0.215, 0.61, 0.355, 1);
    }
  }

  &__inner {
    max-width: 400px;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
    margin-top: auto;
    margin-bottom: auto;
    z-index: 20;
  }

  &__content {
    position: relative;
    border-radius: 5px;
    box-shadow: 0 5px 40px rgb(0 0 0 / 40%);
    overflow: hidden;
  }
}

.modal_open {
  display: flex;

  .modal {
    &__inner {
      animation: modal-open-inner 0.5s cubic-bezier(0.075, 0.82, 0.165, 1);
    }
  }
}

.modal_close {
  .modal {
    &__inner {
      animation: modal-close-inner 0.4s cubic-bezier(0.215, 0.61, 0.355, 1);
    }
  }
}

@keyframes modal-open-inner {
  0% {
    transform: scale(0.7);
  }

  100% {
    transform: scale(1);
  }
}

@keyframes modal-close-inner {
  0% {
    opacity: 1;
    transform: scale(1);
  }

  100% {
    transform: scale(0.7);
    opacity: 0;
  }
}

@keyframes modal-open-before {
  0% {
    opacity: 0;
  }

  100% {
    opacity: 0.5;
  }
}

@keyframes modal-close-before {
  0% {
    opacity: 0.5;
  }

  100% {
    opacity: 0;
  }
}
</style>

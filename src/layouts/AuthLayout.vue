<template>
  <main class="auth-page">
    <svg class="auth-page__svg first" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
      <path
        fill-opacity="0.5"
        d="M0,224L48,224C96,224,192,224,288,218.7C384,213,480,203,576,176C672,149,768,107,864,85.3C960,64,1056,64,1152,101.3C1248,139,1344,213,1392,250.7L1440,288L1440,0L1392,0C1344,0,1248,0,1152,0C1056,0,960,0,864,0C768,0,672,0,576,0C480,0,384,0,288,0C192,0,96,0,48,0L0,0Z"
      ></path>
      <path
        fill-opacity="0.2"
        d="M0,32L48,74.7C96,117,192,203,288,224C384,245,480,203,576,192C672,181,768,203,864,218.7C960,235,1056,245,1152,234.7C1248,224,1344,192,1392,176L1440,160L1440,0L1392,0C1344,0,1248,0,1152,0C1056,0,960,0,864,0C768,0,672,0,576,0C480,0,384,0,288,0C192,0,96,0,48,0L0,0Z"
      ></path>
      <path
        fill-opacity="0.1"
        d="M0,288L48,261.3C96,235,192,181,288,165.3C384,149,480,171,576,192C672,213,768,235,864,208C960,181,1056,107,1152,117.3C1248,128,1344,224,1392,272L1440,320L1440,0L1392,0C1344,0,1248,0,1152,0C1056,0,960,0,864,0C768,0,672,0,576,0C480,0,384,0,288,0C192,0,96,0,48,0L0,0Z"
      ></path>
    </svg>
    <router-view />
    <div @click="handleClickBack" class="auth-page__back">
      <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="#FFFFFF">
        <path d="M0 0h24v24H0V0z" fill="none" />
        <path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z" />
      </svg>
      <h1>На главную</h1>
    </div>
    <svg class="auth-page__svg second" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
      <path
        fill-opacity="0.5"
        d="M0,288L48,272C96,256,192,224,288,197.3C384,171,480,149,576,165.3C672,181,768,235,864,250.7C960,267,1056,245,1152,250.7C1248,256,1344,288,1392,304L1440,320L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
      ></path>
      <path
        fill-opacity="0.2"
        d="M0,192L48,176C96,160,192,128,288,128C384,128,480,160,576,170.7C672,181,768,171,864,160C960,149,1056,139,1152,112C1248,85,1344,43,1392,21.3L1440,0L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
      ></path>
      <path
        fill-opacity="0.1"
        d="M0,160L48,186.7C96,213,192,267,288,272C384,277,480,235,576,202.7C672,171,768,149,864,154.7C960,160,1056,192,1152,170.7C1248,149,1344,75,1392,37.3L1440,0L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
      ></path>
    </svg>
  </main>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'authLayouts',
  components: {},
  methods: {
    handleClickBack() {
      this.$router.push('/')
    },
  },
  setup() {
    return {}
  },
})
</script>

<style scoped lang="scss">
.auth-page {
  position: relative;

  width: 100vw;
  height: 100vh;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  &__svg {
    position: absolute;
    z-index: -2;

    &.first {
      fill: var(--color-highlight);
      top: 0;

      // @include desktop {
      //   top: -15vh;
      // }

      // @include tablet {
      //   top: -5vh;
      // }

      // @include mobile {
      //   top: 0;
      // }
    }
    &.second {
      fill: var(--color-highlight);
      bottom: 0vh;

      // @include desktop {
      //   bottom: -15vh;
      // }

      // @include tablet {
      //   bottom: -5vh;
      // }

      // @include mobile {
      //   bottom: 0;
      // }
    }
  }

  &__back {
    position: absolute;

    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;

    cursor: pointer;

    margin: 10px;
    opacity: 0.8;

    svg {
      fill: var(--color-text);
      width: 40px;
      height: 40px;
    }
    h1 {
      padding-left: 10px;
      font-size: 1.5rem;
      color: var(--color-text);
    }

    @include after-mobile {
      top: 0;
      left: 0;
    }

    @include mobile {
      top: 0;
      left: 0;
      margin-left: 10px;
      h1 {
        opacity: 0;
      }
    }
  }
}
</style>

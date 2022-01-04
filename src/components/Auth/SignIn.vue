<template>
  <section class="auth">
    <div class="auth__content">
      <header class="auth-header">
        <h1 class="auth-header__title">Войдите в свой аккаунт</h1>
      </header>
      <!-- <div class="auth-errors" v-show="error?.message">
        <transition-group name="auth-errors-tg">
          <span v-for="error in this.error?.message" :key="error" class="auth-errors__text">{{ error }}</span>
        </transition-group>
      </div> -->
      <form @click.prevent class="auth-form form-group">
        <my-input :autoFocus="true" v-model="post.login" :type="'text'" :name="'login'" :error="isError('Not')">
          Логин
        </my-input>
        <my-input v-model="post.password" :type="'password'" :name="'password'" :error="isError('password')">
          Пароль
        </my-input>

        <div class="form-group additional">
          <div>Запомнить?...конечно!</div>
          <!-- Not implemented -->
          <router-link to="/" class="link"> Забыли пароль? </router-link>
        </div>

        <div class="form-group submit">
          <button @click="signIn" class="form-group__submit" type="button">Войти</button>
        </div>
      </form>
      <footer class="auth-footer">
        <span class="auth-footer__title">Неужто новенький!?</span>
        <router-link @click="close" to="/signup" class="auth-footer__button link"> Регистрация </router-link>
      </footer>
    </div>
  </section>
</template>

<script lang="ts">
import './auth.scss'
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'MySignIn',
  props: ['close'],
  data() {
    return {
      post: {
        login: '',
        password: '',
      } as Post,
    }
  },
  methods: {
    // Not implemented //
    isError(field: string) {
      return false
      // return this.error?.message?.some((x: any) => x.includes(field))
    },
    signIn() {
      console.log('signIn')
    },
  },
})

interface Post {
  login: string
  password: string
}
</script>

<style scoped lang="scss"></style>

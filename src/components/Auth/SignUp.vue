<template>
  <section class="auth">
    <div class="auth__content">
      <header class="auth-header">
        <h1 class="auth-header__title">Регистрация</h1>
      </header>
      <!-- <div class="auth-errors" v-show="error?.message">
        <transition-group name="auth-errors-tg">
          <span v-for="error in this.error?.message" :key="error" class="auth-errors__text">{{ error }}</span>
        </transition-group>
      </div> -->
      <form @click.prevent class="auth-form form-group">
        <my-input
          v-model="post.firstName"
          :type="'firstName'"
          :name="'firstName'"
          :error="isError('firstName')"
          :autoFocus="true"
        >
          имя
        </my-input>
        <my-input v-model="post.lastName" :type="'lastName'" :name="'lastName'" :error="isError('lastName')">
          фамилия
        </my-input>
        <my-input v-model="post.email" :type="'email'" :name="'email'" :error="isError('email')"> почта </my-input>
        <my-input v-model="post.login" :type="'login'" :name="'login'" :error="isError('login')"> логин </my-input>
        <my-input v-model="post.password" :type="'password'" :name="'password'" :error="isError('password')">
          пароль
        </my-input>
        <my-input v-model="post.rePassword" :type="'repassword'" :name="'repassword'" :error="isError('rePassword')">
          подтверждение пароля
        </my-input>

        <!-- Not implemented -->
        <div className="form-group submit">
          <button className="form-group__submit" type="button">Регистрация</button>
        </div>
      </form>

      <footer className="auth-footer">
        <span className="auth-footer__title">Имеется аккаунт!?</span>
        <router-link to="/signin" className="auth-footer__button link"> Войти </router-link>
      </footer>
    </div>
  </section>
</template>

<script lang="ts">
import './auth.scss'
import { defineComponent } from 'vue'
// import { mapActions, mapMutations, mapState } from 'vuex'

export default defineComponent({
  name: 'MySignUp',
  data() {
    return {
      post: {
        firstName: '',
        lastName: '',
        email: '',
        login: '',
        password: '',
        rePassword: '',
      } as Post,
    }
  },
  methods: {
    // Not implemented //
    isError(field: string) {
      return false
      // return this.error?.message?.some((x: any) => x.includes(field))
    },
  },
})

interface Post {
  firstName: string
  lastName: string
  email: string
  login: string
  password: string
  rePassword: string
}
</script>

<style scoped lang="scss"></style>

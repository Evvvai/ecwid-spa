import { createApp } from 'vue'
import App from '@/App.vue'
import router from '@/router'
import store from '@/store'
import i18n from '@/i18n'
import '@/assets/scss/index.scss'

import components from './components/UI/index'
import directives from './directives'

// Create vue app
const app = createApp(App)

// Custom components && directives
components.forEach((component) => app.component(component.name, component))
directives.forEach((directive) => app.directive(directive.name, directive.func))

// Use Internationalization
app.use(i18n)

// Etc
app.use(store).use(router).mount('#app')

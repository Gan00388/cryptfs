import { createApp } from 'vue'
import App from './App.vue'
import router from './router/index.js'
import store from './store'
import installElementPlus from './plugins/element'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import { ElMessage } from 'element-plus'
const app = createApp(App)
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component)
  }
installElementPlus(app)
app.provide('message',ElMessage)
app.use(store).use(router).mount('#app')
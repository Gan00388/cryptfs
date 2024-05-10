import { createApp } from 'vue'
import App from './App.vue'
import installElementPlus from './plugins/element'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import { ElMessage } from 'element-plus'
const app = createApp(App)
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}
installElementPlus(app)
app.provide('message', ElMessage)
app.mount('#app')
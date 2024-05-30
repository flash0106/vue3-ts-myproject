// 本地svg图标
import "virtual:svg-icons-register";
//样式
import "element-plus/theme-chalk/dark/css-vars.css";
import "@/styles/index.scss";
import "uno.css";
import { setupStore } from "@/store";
import { setupI18n, setupElIcons, setupPermission } from "./plugins";
import { setupDirective } from "./directive";
import router from "./router";
import { createApp } from "vue";
import App from "./App.vue";

const app = createApp(App);
// 全局注册 状态管理(store)
setupStore(app);
// 国际化
setupI18n(app);
// element-plus 图标
setupElIcons(app);
// 权限控制
setupPermission();
//注册全局指令
setupDirective(app);

//挂载路由
app.use(router);

app.mount("#app");

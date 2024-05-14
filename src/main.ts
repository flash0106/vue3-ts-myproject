// 本地svg图标
import "virtual:svg-icons-register";
//样式
import "uno.css";
import { setupStore } from "@/store";
import { setupI18n, setupElIcons } from "./plugins";
import { createApp } from "vue";
import App from "./App.vue";

const app = createApp(App);
// 全局注册 状态管理(store)
setupStore(app);
// 国际化
setupI18n(app);
// element-plus 图标
setupElIcons(app);

app.mount("#app");

import { createApp } from "vue";
import App from "./App.vue";

import ElementPlus from "element-plus";
import locale from "element-plus/lib/locale/lang/zh-cn";

import "./styles/index.css";
import "element-plus/lib/theme-chalk/index.css";
import "dayjs/locale/zh-cn";

import router from "./router";
import store from "./store";

const app = createApp(App);
app.use(ElementPlus, { locale });
app.use(router);
app.use(store);
app.mount("#app");

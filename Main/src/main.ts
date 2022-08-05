import { createApp } from "vue";
// import "@/style.css";
import "virtual:windi.css";
import App from "@/App.vue";
import router from "@/router";
import store from "@/store";
import { injectJsError } from "@/monitor";
// 捕获错误
injectJsError()

const app = createApp(App);
app.use(router);
app.use(store);
app.mount("#app");


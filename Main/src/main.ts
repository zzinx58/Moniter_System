import { createApp } from "vue";
import "@/style.css";
import "virtual:windi.css";
import App from "@/Test";
import router from "@/router";
import store from "@/store";
// 捕获错误
import injectJSError from ".";
injectJSError()

const app = createApp(App);
app.use(router);
app.use(store);
app.mount("#app");


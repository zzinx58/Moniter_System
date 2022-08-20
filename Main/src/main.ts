import { createApp } from "vue";
import "virtual:windi.css";
import "element-plus/theme-chalk/dark/css-vars.css";
import "animate.css";
import "@/assets/styles/MyCSS.css";
// import "@/style.css";
import App from "@/App.vue";
import router from "@/router/index";
import pinia from "@/store/pinia";
import "../mock";
const app = createApp(App);
//https://cn.vuejs.org/guide/components/provide-inject.html#working-with-reactivity
// app.config.unwrapInjectedRef = true;
app.use(router);
app.use(pinia);
app.mount("#app");

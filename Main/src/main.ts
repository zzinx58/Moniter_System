import { createApp } from "vue";
// import "@/style.css";
import "virtual:windi.css";
import App from "@/App.vue";
import router from "@/router";
import store from "@/store";
//element-plus
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
const app = createApp(App);
app.use(router);
app.use(store);
app.use(ElementPlus);
app.mount("#app");

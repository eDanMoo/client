import { createApp } from "vue";
import { createPinia } from "pinia";

import App from "./App.vue";
import router from "./router";

import "./assets/main.css";
// import mixins from "./mixins";

const app = createApp(App);

app.use(createPinia());
app.use(router);
// app.use(mixins);

app.mount("#app");

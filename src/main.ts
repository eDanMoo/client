import { createApp } from "vue";
import { createPinia } from "pinia";

import App from "./App.vue";
import router from "./router";

import "./assets/main.css";

import io from "socket.io-client";
// const socket = io("https://localhost:3000/", {
//   transports: ["websocket"],
//   upgrade: false,
// });

const app = createApp(App);

app.use(createPinia());
app.use(router);

app.mount("#app");

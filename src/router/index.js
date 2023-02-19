import { createRouter, createWebHistory } from "vue-router";
import inGame from "../views/InGame.vue";
import Home from "../views/Home.vue";

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            // path: "/ws/1",
            path: "/:room_code/:user_id",
            name: "inGame",
            component: inGame,
        },
        {
            path: "/",
            name: "home",
            component: Home,
        },
    ],
});

export default router;

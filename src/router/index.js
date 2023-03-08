import { createRouter, createWebHistory } from "vue-router";
import inGame from "../views/InGame.vue";
import Home from "../views/Home.vue";

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: "/",
            name: "home",
            component: Home,
        },
        {
            path: "/:room_code",
            name: "inGame",
            component: inGame,
            beforeEnter: (to, from, next) => {
                if (from.name === "home" && to.params.room_code) {
                    next();
                } else {
                    next({
                        name: "home",
                        query: { room_code: to.params.room_code },
                    });
                }
            },
        },
    ],
});
router.beforeEach((to, from, next) => {
    // handle redirection for non-existing routes
    if (to.matched.length === 0) {
        next("/");
    } else {
        next();
    }
});

export default router;

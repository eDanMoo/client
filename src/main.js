import { createApp } from "vue";
import { createPinia } from "pinia";

import App from "./App.vue";
import router from "./router";

import "./main.css";
// import mixins from "./mixins";
import * as Sentry from "@sentry/vue";
import { BrowserTracing } from "@sentry/tracing";

const app = createApp(App);

Sentry.init({
    app,
    dsn: "https://16043fbe03b5401391e3cf8725fc0e0c@o4504772214325248.ingest.sentry.io/4504775508230144",
    integrations: [
        new BrowserTracing({
            routingInstrumentation: Sentry.vueRouterInstrumentation(router),
            tracePropagationTargets: ["localhost", "koword.com", /^\//],
        }),
    ],
    tracingOptions: {
        // 하위 구성 요소를 추적하고 렌더링 프로세스에 대한 자세한 내용을 보기
        trackComponents: true,
    },
    attachProps: true,
    // Set tracesSampleRate to 1.0 to capture 100%
    // of transactions for performance monitoring.
    // We recommend adjusting this value in production
    tracesSampleRate: 1.0,
});

app.config.errorHandler = async (error, vm, info) => {
    Sentry.captureException(error);
};

app.use(createPinia());
app.use(router);
// app.use(mixins);

app.mount("#app");

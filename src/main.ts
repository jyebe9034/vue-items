import { createApp } from "vue";
import { createVuetify } from "vuetify";
import App from "./App.vue";
import router from "./router";
import store from "./store";

const app = createApp(App);
const vuetify = createVuetify();

app.use(vuetify).use(router).use(store).mount("#app");

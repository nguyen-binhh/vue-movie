import { createApp, defineAsyncComponent } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";

// api
import api from "@/services/api";
// tailwind css
import "./assets/tailwind.css";
// slider
import "vue3-carousel/dist/carousel.css";
// Base
// import BaseCard from "@/components/base/BaseCard";
// import BaseButton from "@/components/base/BaseButton";
// import BaseSpinner from "@/components/base/BaseSpinner";
// import BaseDialog from "@/components/base/BaseDialog";
const BaseDialog = defineAsyncComponent(() =>
  import("@/components/base/BaseDialog")
);
const BaseButton = defineAsyncComponent(() =>
  import("@/components/base/BaseButton")
);
const BaseCard = defineAsyncComponent(() =>
  import("@/components/base/BaseCard")
);
const BaseSpinner = defineAsyncComponent(() =>
  import("@/components/base/BaseSpinner")
);

const app = createApp(App);

app.config.globalProperties.axios = api;

// app.component("spinner-cpn", Spinner);

app.component("base-card", BaseCard);
app.component("base-button", BaseButton);
app.component("base-dialog", BaseDialog);
app.component("base-spinner", BaseSpinner);

app.use(store);
app.use(router);
app.mount("#app");

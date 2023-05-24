import { createApp } from "vue";
import ElementPlus from "element-plus";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import VideoPlayer from 'vue-video-player/src'
import 'default-passive-events';

import "element-plus/dist/index.css";
import "./assets/css/index.scss";
import "./assets/icons/index.js";
import 'video.js/dist/video-js.css' 
import 'vue-video-player/src/custom-theme.css';

import { ComponentCustomProperties } from "vue";
import { Store } from "vuex";
declare module "@vue/runtime-core" {
  interface State {
    count: number;
  }

  interface ComponentCustomProperties {
    $store: Store<State>;
  }
}

createApp(App).use(store).use(router).use(ElementPlus).use(VideoPlayer).mount("#app");

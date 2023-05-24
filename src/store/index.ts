import { createStore } from "vuex";
import configure from "./configure";
import user from "./user";
import video from "./video";

export default createStore({
  modules: {
    configure,
    user,
    video,
  },
});

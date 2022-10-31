import mutations from "./mutations";
import actions from "./actions";
import getters from "./getters";

export default {
  namespace: true,
  state() {
    return {
      userId: null,
      token: null,
      tokenExpiration: null,
    };
  },
  mutations,
  actions,
  getters,
};

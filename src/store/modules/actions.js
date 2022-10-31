// import firebase from 'firebase'
export default {
  async signup(context, payload) {
    return context.dispatch("auth", {
      ...payload,
      mode: "signup",
    });
  },

  async login(context, payload) {
    return context.dispatch("auth", {
      ...payload,
      mode: "login",
    });
  },

  async auth(context, payload) {
    const mode = payload.mode;
    let url =
      "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDkVThX5BCAk6lBYn7XZTb4Wuny2MJH11s";
    if (mode === "signup") {
      url =
        "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDkVThX5BCAk6lBYn7XZTb4Wuny2MJH11s";
    }
    const res = await fetch(url, {
      method: "POST",
      body: JSON.stringify({
        email: payload.email,
        password: payload.password,
        returnSecureToken: true,
      }),
    });
    const resData = await res.json();
    const user = {
      token: resData.idToken,
      userId: resData.localId,
      tokenExpiration: resData.expiresIn,
    };

    if (!res.ok) {
      const err = new Error(resData.message || "Failed to authenticate.");
      throw err;
    }

    localStorage.setItem("token", resData.idToken);
    localStorage.setItem("userId", resData.localId);

    context.commit("setUser", user);
  },
  autoLogin(context) {
    const token = localStorage.setItem("token");
    const userId = localStorage.setItem("userId");

    if (token && userId) {
      context.commit("setUser", {
        token: token,
        userId: userId,
        tokenExpiration: null,
      });
    }
  },

  logout(context) {
    context.commit("setUser", {
      token: null,
      userId: null,
      tokenExpiration: null,
    });
  },
};

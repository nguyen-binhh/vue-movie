import axios from "axios";

const token = process.env.VUE_APP_API_TOKEN;

export default axios.create({
  baseURL: process.env.VUE_APP_API,
  headers: {
    Authorization: `Bearer ${token}`,
  },
});

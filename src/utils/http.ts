import axios from "axios";
import store from "../store";
import { Message } from "../utils/helper";

axios.defaults.baseURL = "http://127.0.0.1/api/v1";
axios.defaults.headers["Content-Type"] = "application/x-www-form-urlencoded";
axios.defaults.headers["X-Requested-With"] = "XMLHttpRequest";
// 请求拦截
axios.interceptors.request.use((config) => {
	store.commit("setLoading", true);
	return config;
});

// 响应拦截
axios.interceptors.response.use(
	(response) => {
		setTimeout(() => {
			store.commit("setLoading", false);
		}, 2000);
		return Promise.resolve(response);
	},
	(e) => {
		store.commit("setLoading", false);
		const { message } = e.response.data;
		return Promise.reject(Message.error(message));
	}
);

export default axios;

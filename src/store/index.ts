import { createStore, Commit } from "vuex";
import { AxiosRequestConfig } from "axios";
import axios from "../utils/http";
import ls from "../utils/localStorage";
// 用户
export interface UserProps {
	isLogin?: boolean;
}

export interface GlobalDataProps {
	loading: boolean;
	token: string;
	user: UserProps;
}

const asyncAndCommit = async (
	url: string,
	mutationName: string,
	commit: Commit,
	config: AxiosRequestConfig = { method: "get" },
	extraData?: any
) => {
	const { data } = await axios(url, config);
	if (extraData) {
		commit(mutationName, { data, extraData });
	} else {
		commit(mutationName, data);
	}
	return data;
};

export default createStore<GlobalDataProps>({
	state: {
		loading: false,
		token: ls.getItem("token") || "",
		user: { isLogin: false },
	},
	mutations: {
		setLoading(state, loadingStatus) {
			state.loading = loadingStatus;
		},
		// 登录
		login(state, rawData) {
			const { token } = rawData.data;
			state.token = token;
			ls.setItem("token", token);
			axios.defaults.headers.common.Authorization = `Bearer ${token}`;
		},
		// 退出
		logout(state) {
			state.token = "";
			ls.removeItem("token");
			delete axios.defaults.headers.common.Authorization;
		},
		// 获取登录用户信息
		fetchCurrentUser(state, rawData) {
			state.user = { isLogin: true, ...rawData.data };
		},
	},
	actions: {
		login({ commit }, payload) {
			return asyncAndCommit("/login", "login", commit, {
				method: "post",
				data: payload,
			});
		},
		fetchCurrentUser({ commit }) {
			return asyncAndCommit("/user/current", "fetchCurrentUser", commit);
		},
		async loginAndFetchCurrentUser({ dispatch }, loginData) {
			return dispatch("login", loginData).then(() => {
				return dispatch("fetchCurrentUser");
			});
		},
	},
	getters: {},
	modules: {},
});

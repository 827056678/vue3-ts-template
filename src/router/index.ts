import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import axios from "../utils/http";
import store from "../store";

const routes: Array<RouteRecordRaw> = [
	{
		path: "/",
		name: "Home",
		component: () => import("../views/Home.vue"),
	},
	{
		path: "/login",
		name: "Login",
		component: () => import("../views/Login.vue"),
		meta: { redirectAlreadyLogin: true }, // requiredLogin
	},
];

const router = createRouter({
	history: createWebHistory(),
	routes,
});

router.beforeEach((to, from, next) => {
	const { user, token } = store.state;
	const { requiredLogin, redirectAlreadyLogin } = to.meta;

	if (!user.isLogin) {
		if (token) {
			axios.defaults.headers.common.Authorization = `Bearer ${token}`;
			store
				.dispatch("fetchCurrentUser")
				.then(() => {
					if (redirectAlreadyLogin) {
						next("/");
					} else {
						next();
					}
				})
				.catch((e) => {
					console.log(e);
					store.commit("logout");
					next("/login");
				});
		} else {
			if (requiredLogin) {
				next("/login");
			} else {
				next();
			}
		}
	} else {
		if (redirectAlreadyLogin) {
			next("/");
		} else {
			next();
		}
	}
});

export default router;

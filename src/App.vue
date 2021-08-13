<template>
	<div class="mx-auto min-h-screen min-w-max" v-loading="isLoading">
		<div class="container mx-auto">
			<router-view></router-view>
		</div>
	</div>
</template>

<script lang="ts">
import { defineComponent, computed, onMounted } from "vue";
import axios from "./utils/http";
import store from "./store";

export default defineComponent({
	name: "App",
	setup() {
		const currentUser = computed(() => store.state.user);
		const isLoading = computed(() => store.state.loading);
		const token = computed(() => store.state.token);
		onMounted(() => {
			if (!currentUser.value.isLogin && token.value) {
				axios.defaults.headers.common.Authorization = `Bearer ${token.value}`;
				store.dispatch("fetchCurrentUser");
			}
		});

		return {
			currentUser,
			isLoading,
		};
	},
});
</script>

<style scoped>
:deep(.el-loading-spinner .circular) {
	margin: 0 auto !important;
}
</style>

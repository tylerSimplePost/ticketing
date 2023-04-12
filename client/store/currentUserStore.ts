import { defineStore } from "pinia";

export const useCurrentUserStore = defineStore({
  id: "currentUserStore",
  state: () => ({
    currentUser: null,
  }),
  actions: {
    useRequestHeaders2(headersList: any): Record<string, string> {
      const headers: Record<string, string> = {};
      headersList.forEach((header: any) => {
        if (header === "cookie") {
          headers["cookie"] = document.cookie || "";
        }
      });
      return headers;
    },
    async fetchCurrentUser() {
      const url = process.server
        ? "http://ingress-nginx-controller.ingress-nginx.svc.cluster.local/api/users/currentuser"
        : "/api/users/currentuser";

      const { data, error } = await useFetch(url, {
        onRequest: ({ request, options }) => {
          options.headers = this.useRequestHeaders2(["cookie"]);
        },
        onResponse: ({ response, options }) => {
          return response._data;
        },
      });

      if (!error.value && data.value) {
        this.currentUser = data.value as any;
      }
    },
    clearCurrentUser() {
      console.log("clearing current user!");
      this.currentUser = null;
    },
  },
});

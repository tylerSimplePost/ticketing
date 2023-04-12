import { defineStore } from "pinia";

export const useApiStore = defineStore({
  id: "apiStore",
  state: () => ({
    data: null,
    error: null,
    isLoading: false,
  }),
  actions: {
    async fetchData(url: string, method: string = "GET", payload: any = null) {
      this.isLoading = true;
      this.error = null;

      try {
        const requestOptions: RequestInit = {
          method,
          headers: { "Content-Type": "application/json" },
        };

        if (payload) {
          requestOptions.body = JSON.stringify(payload);
        }

        const response = await fetch(url, requestOptions);
        const data = await response.json();
        console.log(data);
        this.data = data;
      } catch (err: any) {
        this.error = err.message || "An error occurred while fetching data.";
      } finally {
        this.isLoading = false;
      }
    },
  },
});

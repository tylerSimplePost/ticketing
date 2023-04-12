<template>
  <div class="success-page">
    <h1>Payment Successful!</h1>
    <p>Thank you for your purchase.</p>
    <p>Your session ID is: {{ sessionId }}</p>
    <button @click="goHome">Go to Homepage</button>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted } from "vue";
import { useCurrentUserStore } from "@/store/currentUserStore";

const router = useRouter();
const sessionId = ref<string>("");

const currentUserStore = useCurrentUserStore();

onMounted(async () => {
  await currentUserStore.fetchCurrentUser();
  const urlParams = new URLSearchParams(window.location.search);
  sessionId.value = urlParams.get("session_id") || "";
});

const goHome = () => {
  router.push("/");
};
</script>

<style scoped>
.success-page {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  text-align: center;
}

button {
  background-color: #4caf50;
  border: none;
  color: white;
  padding: 10px 20px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
  margin: 15px 2px;
  cursor: pointer;
}
</style>

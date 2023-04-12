<template>
  <div>
    <p>You've been signed out!</p>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from "vue-router";
import { watchEffect } from "vue";
import { useCurrentUserStore } from "@/store/currentUserStore";

const currentUserStore = useCurrentUserStore();

const router = useRouter();

watchEffect(async () => {
  try {
    const response: Response = await $fetch("/api/users/signout", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });
    currentUserStore.clearCurrentUser();
  } catch (error) {
    console.error("Error during signout:", error);
  }
});
</script>

<style scoped></style>

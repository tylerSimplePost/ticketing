<template>
  <v-app-bar app color="primary" dark>
    <v-toolbar-title>Ticketing</v-toolbar-title>
    <v-spacer></v-spacer>
    <v-btn text>
      <NuxtLink to="/" class="nav-link">Home</NuxtLink>
    </v-btn>
    <div v-if="!currentUser">
      <v-btn text color="secondary">
        <NuxtLink to="/auth/signin" class="nav-link">Sign In</NuxtLink>
      </v-btn>
      <v-btn text color="secondary">
        <NuxtLink to="/auth/signup" class="nav-link">Sign Up</NuxtLink>
      </v-btn>
    </div>
    <div v-if="currentUser">
      <v-btn text color="secondary">
        <NuxtLink to="/tickets/new" class="nav-link">Sell Tickets</NuxtLink>
      </v-btn>
      <v-btn text color="secondary">
        <NuxtLink to="/orders" class="nav-link">My Orders</NuxtLink>
      </v-btn>
      <v-btn text color="secondary">
        <NuxtLink to="/auth/signout" class="nav-link">Sign Out</NuxtLink>
      </v-btn>
    </div>
  </v-app-bar>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { useCurrentUserStore } from "@/store/currentUserStore";

const currentUserStore = useCurrentUserStore();
const currentUser = computed(() => currentUserStore.currentUser);
</script>

<style scoped>
.nav-link {
  color: white;
  text-decoration: none;
  font-weight: 500;
  transition: 0.3s;
}

.nav-link:hover {
  color: #ffffffcc;
  text-decoration: underline;
}
</style>

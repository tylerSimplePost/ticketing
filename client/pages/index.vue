<template>
  <div>
    <h1>Tickets!!</h1>
    <v-table>
      <thead>
        <tr>
          <th class="text-left">Title</th>
          <th class="text-left">Price</th>
          <th class="text-left">Details</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="ticket in ticketStore.tickets" :key="ticket.title">
          <td>{{ ticket.title }}</td>
          <td>{{ ticket.price }}</td>
          <td>
            <NuxtLink :to="'/tickets/' + ticket.id"> View Details </NuxtLink>
          </td>
        </tr>
      </tbody>
    </v-table>
    <p v-if="!currentUserStore.currentUser">You are not signed in</p>
    <p v-if="currentUserStore.currentUser">You are signed in</p>
  </div>
</template>

<script setup lang="ts">
// import { ref } from "vue";

// const currentUser = ref(null);

// function useRequestHeaders2(headersList: any): Record<string, string> {
//   const headers: Record<string, string> = {};
//   headersList.forEach((header: any) => {
//     if (header === "cookie") {
//       headers["cookie"] = document.cookie || "";
//     }
//   });
//   return headers;
// }

// console.log(useRequestHeaders(["cookie"]));

// const url = process.server
//   ? "http://ingress-nginx-controller.ingress-nginx.svc.cluster.local/api/users/currentuser"
//   : "/api/users/currentuser";

// const { data, error } = await useFetch(url, {
//   onRequest({ request, options }) {
//     options.headers = useRequestHeaders2(["cookie"]);
//   },
//   onResponse({ response, options }) {
//     return response._data;
//   },
// });
// console.log(data);
// if (!error.value && data.value) {
//   currentUser.value = data.value as any;
// }

// console.log(data.value);

import { useCurrentUserStore } from "@/store/currentUserStore";
import { useTicketStore } from "~~/store/ticketStore";

const currentUserStore = useCurrentUserStore();
const ticketStore = useTicketStore();

onMounted(async () => {
  await currentUserStore.fetchCurrentUser();
  await ticketStore.fetchTickets();
});
</script>

<style scoped></style>

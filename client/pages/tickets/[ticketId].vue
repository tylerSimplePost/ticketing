<template>
  <div>
    <h1>Ticket Show</h1>
    <div v-if="ticket">
      <h3>Title: {{ ticket.title }}</h3>
      <h4>Price: {{ ticket.price }}</h4>
      <v-btn
        @click="makeOrder(ticketId as string)"
        type="button"
        block
        class="mt-2"
        >Purchase</v-btn
      >
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";

const ticket = ref();
const { ticketId } = useRoute().params;
const makeOrder = async (ticketId: string) => {
  const response = await fetch("/api/orders", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ ticketId }),
  });
  const apiData = await response.json();
  await navigateTo(`/orders/${apiData.id}`);
};
onMounted(async () => {
  const response = await fetch(`/api/tickets/${ticketId}`);
  ticket.value = await response.json();
});
</script>

<style scoped></style>

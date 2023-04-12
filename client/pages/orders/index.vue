<template>
  <div>
    <h1>Orders</h1>
    <v-table>
      <thead>
        <tr>
          <th class="text-left">Title</th>
          <th class="text-left">Price</th>
          <th class="text-left">Order Id</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="order in orderStore.orders" :key="order.ticket.title">
          <td>{{ order.ticket.title }}</td>
          <td>{{ order.ticket.price }}</td>
          <td>{{ order.id }}</td>
        </tr>
      </tbody>
    </v-table>
  </div>
</template>

<script setup lang="ts">
import { useOrderStore } from "~~/store/orderStore";

const orderStore = useOrderStore();

onMounted(async () => {
  await orderStore.fetchOrders();
});
</script>

<style scoped></style>

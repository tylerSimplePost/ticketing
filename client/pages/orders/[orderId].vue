<template>
  <div>
    <h1>Order Show</h1>
    <div v-if="loading">Loading order...</div>

    <div v-if="order">
      <h3>Order ID: {{ order.id }}</h3>
      <h4>Ticket ID: {{ order.ticket.id }}</h4>
      <h4>Price: {{ order.ticket.price }}</h4>
      <h4>Status: {{ order.status }}</h4>
    </div>
    <div class="countdown-timer">
      <div v-if="timeRemaining >= 0">
        Time remaining: {{ formattedTimeRemaining }}
      </div>
      <div v-else>Order expired!</div>
    </div>
    <StripeCheckout v-if="order" :order="order" />
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted, watch } from "vue";
import StripeCheckout from "@/components/StripeCheckout.vue";
import { useCurrentUserStore } from "@/store/currentUserStore";

// Stores
const currentUserStore = useCurrentUserStore();

// Reactive constatnts
const order = ref();
const { orderId } = useRoute().params;
const loading = ref(true);

const targetTime = ref<number>();
const timeRemaining = ref<number>(0);
let intervalId: any;

const updateTimer = () => {
  if (targetTime.value) {
    timeRemaining.value = targetTime.value - new Date().getTime();
  }
};

// Stripe
const priceString = computed(() => order.value.ticket.price.toString());
const lineItems = computed(() => [
  {
    price: priceString.value,
    quantity: 1,
  },
]);
const successURL = "http://ticketing.dev/";
const cancelURL = "http://ticketing.dev/";

// Lifecycle Hooks
onMounted(async () => {
  await currentUserStore.fetchCurrentUser();
  const response = await fetch(`/api/orders/${orderId}`);
  order.value = await response.json();
  console.log(order.value);
  console.log(priceString.value);
  targetTime.value = new Date(order.value.expiresAt).getTime();
  loading.value = false;
  intervalId = setInterval(updateTimer, 1000);
});

onUnmounted(() => {
  clearInterval(intervalId);
});

// Computed
const formattedTimeRemaining = computed(() => {
  const remaining = timeRemaining.value;

  const seconds = Math.floor(remaining / 1000) % 60;
  const minutes = Math.floor(remaining / (1000 * 60)) % 60;
  const hours = Math.floor(remaining / (1000 * 60 * 60)) % 24;
  const days = Math.floor(remaining / (1000 * 60 * 60 * 24));

  return `${days}d ${hours}h ${minutes}m ${seconds}s`;
});

watch(order, (newValue) => {
  if (newValue) {
    targetTime.value = new Date(newValue.expiresAt).getTime();
    updateTimer();
  }
});
</script>

<style scoped>
.countdown-timer {
  font-size: 1.5rem;
  font-weight: bold;
  text-align: center;
}
</style>

<template>
  <button @click="redirectToCheckout">Pay with Stripe</button>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import { loadStripe } from "@stripe/stripe-js";

const props = defineProps({
  order: {
    type: Object,
    required: true,
  },
});

const publicKey =
  "pk_test_51Mw5AfLTEOyhN6AovBF1rmFXoScX4siPWXoVcxa7tYowV5N6ejplRfd8a5z1T0isDefNrtx5NnKoQCUr93ckbamI00hxWd6uWc";
const stripe = ref<any>(null);

onMounted(async () => {
  stripe.value = await loadStripe(publicKey);
});

const redirectToCheckout = async () => {
  if (!stripe.value) {
    alert("Stripe is not loaded yet, please try again.");
    return;
  }

  const amount = props.order.ticket.price * 100;
  const currency = "usd";

  try {
    const response = await fetch("/api/payments", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ orderId: props.order.id }),
    });

    const { sessionId } = await response.json();
    console.log("sessionID", sessionId);
    const result = await stripe.value.redirectToCheckout({ sessionId });

    if (result.error) {
      console.error(result.error.message);
    }
  } catch (error) {
    console.error("Error creating checkout session:", error);
  }
};
</script>

<style scoped>
.stripe-checkout-button {
  background-color: #6772e5;
  color: #fff;
  padding: 12px 24px;
  font-size: 16px;
  font-weight: 600;
  border-radius: 4px;
  cursor: pointer;
  border: none;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
  transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
}

.stripe-checkout-button:hover {
  box-shadow: 0 14px 28px rgba(0, 0, 0, 0.25), 0 10px 10px rgba(0, 0, 0, 0.22);
}
</style>

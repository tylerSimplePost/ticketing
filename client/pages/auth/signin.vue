<template>
  <div>
    <h1>Sign in!</h1>
    <v-form @submit.prevent="onSubmit">
      <div class="form-group">
        <label>Email</label>
        <v-text-field v-model="email" type="text" />
      </div>
      <div class="form-group">
        <label>Password</label>
        <v-text-field v-model="password" type="password" />
      </div>
      <v-btn type="submit" block class="mt-2">Submit</v-btn>
    </v-form>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
interface Response {
  status: number;
  data: any;
}

const email = ref("");
const password = ref("");

const onSubmit = async () => {
  const data = {
    email: email.value,
    password: password.value,
  };

  const response: Response = await $fetch("/api/users/signin", {
    method: "POST",
    body: data,
  });

  await navigateTo("/");

  email.value = "";
  password.value = "";
  console.log(response);
};
</script>

<style scoped></style>

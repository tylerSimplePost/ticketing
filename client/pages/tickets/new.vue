<template>
  <div>
    <h1>Create A Ticket</h1>
    <v-form @submit.prevent="onSubmit">
      <div class="form-group">
        <label>Title</label>
        <v-text-field v-model="title" type="text" />
      </div>
      <div class="form-group">
        <label>Price</label>
        <v-text-field v-model="price" type="number" />
      </div>
      <v-btn type="submit" block class="mt-2">Submit</v-btn>
    </v-form>
    <div v-if="apiStore.error" class="error">{{ apiStore.error }}</div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useApiStore } from "~/store/apiStore";

const apiStore = useApiStore();
interface Response {
  status: number;
  data: any;
}

const title = ref("");
const price = ref(0);

const onSubmit = async () => {
  const data = {
    title: title.value,
    price: price.value,
  };

  const response = await apiStore.fetchData("/api/tickets", "POST", data);
  console.log(response);
  title.value = "";
  price.value = 0;
  await navigateTo("/");
};
</script>

<style scoped>
.error {
  color: red;
  font-weight: bold;
  border: 1px solid red;
  padding: 10px;
  border-radius: 5px;
}
</style>

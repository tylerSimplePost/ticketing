<template>
  <v-app>
    <v-card>
      <v-layout>
        <HeaderBar />
        <v-main>
          <slot></slot>
        </v-main>
      </v-layout>
    </v-card>
  </v-app>
</template>

<style scoped>
.router-link-exact-active {
  color: #12b488;
}
</style>

<script setup lang="ts"></script>

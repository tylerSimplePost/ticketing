import { defineStore } from "pinia";

interface Ticket {
  id: string;
  price: number;
  title: string;
  userId: string;
}

interface Order {
  userId: string;
  status: string;
  expiresAt: Date;
  ticket: Ticket;
  id: string;
}

export const useOrderStore = defineStore("orderStore", {
  state: () => ({
    orders: [] as Order[],
  }),
  actions: {
    async fetchOrders() {
      const response = await fetch("/api/orders");
      const data = await response.json();
      this.orders = data;
    },
    // async fetchTicket(ticketId: string) {
    //   const response = await fetch(`/api/tickets${ticketId}`);
    //   const data = await response.json();
    //   return data;
    // },
  },
});

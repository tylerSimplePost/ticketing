import { defineStore } from "pinia";

interface Ticket {
  id: string;
  price: number;
  title: string;
  userId: string;
}

export const useTicketStore = defineStore("ticketStore", {
  state: () => ({
    tickets: [] as Ticket[],
  }),
  actions: {
    async fetchTickets() {
      const response = await fetch("/api/tickets");
      const data = await response.json();
      this.tickets = data;
    },
    // async fetchTicket(ticketId: string) {
    //   const response = await fetch(`/api/tickets${ticketId}`);
    //   const data = await response.json();
    //   return data;
    // },
  },
});

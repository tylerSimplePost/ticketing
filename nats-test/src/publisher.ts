import nats from "node-nats-streaming";
import { TicketCreatedPublisher } from "./events/ticket-created-publisher";

console.clear();

const client = nats.connect("ticketing", "abcd", {
  url: "http://localhost:4222",
});

client.on("connect", () => {
  console.log("Publisher connected to NATS");
  try {
    const publisher = new TicketCreatedPublisher(client);
    publisher.publish({
      id: "123",
      title: "concert",
      price: 20,
      userId: "123",
    });
  } catch (err) {
    console.error(err);
  }

  //   const data = JSON.stringify({
  //     id: "123",
  //     title: "concert",
  //     price: 20,
  //   });

  //   client.publish("ticket:created", data, () => {
  //     console.log("Event published");
  //   });
});

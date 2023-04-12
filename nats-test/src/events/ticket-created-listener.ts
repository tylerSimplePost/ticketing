import { Message, Stan } from "node-nats-streaming";
import { Listener } from "../../../common/src/events/base-listener";
import { TicketCreatedEvent } from "@to2tickets/common";
import { Subjects } from "@to2tickets/common";

export class TicketCreatedListener extends Listener<TicketCreatedEvent> {
  readonly subject: Subjects.TicketCreated = Subjects.TicketCreated;
  queueGroupName = "payments-service";

  onMessage(data: TicketCreatedEvent["data"], msg: Message) {
    console.log("Event data!", data);
    msg.ack();
  }
}

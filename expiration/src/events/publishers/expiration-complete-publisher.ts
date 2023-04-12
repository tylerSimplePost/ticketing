import {
  Subjects,
  Publisher,
  ExpirationCompleteEvent,
} from "@to2tickets/common";

export class ExpirationCompletePublisher extends Publisher<ExpirationCompleteEvent> {
  readonly subject = Subjects.ExpirationComplete;
}

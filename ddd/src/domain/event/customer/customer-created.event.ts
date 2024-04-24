import { IEvent } from "../@shared/event.interface";

export class CustomerCreatedEvent implements IEvent {
  timestamp: Date;
  eventData: any;

  constructor(eventData: any) {
    this.eventData = eventData;
    this.timestamp = new Date();
  }

}

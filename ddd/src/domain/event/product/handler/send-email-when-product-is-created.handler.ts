import { IEventHandler } from "../../@shared/event-handler.interface";
import { ProductCreatedEvent } from "../product-created.event";

export class SendEmailWhenProductIsCreated implements IEventHandler<ProductCreatedEvent> {
  handle(event: ProductCreatedEvent): void {
    console.log('Sending email...', {event})
  }
  
}
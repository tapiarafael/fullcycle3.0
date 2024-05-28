import { IEventHandler } from "../../@shared/event-handler.interface";
import { CustomerCreatedEvent } from "../customer-created.event";

export class SendConsoleLogWhenCustomerIsCreated implements IEventHandler<CustomerCreatedEvent> {
  handle(event: CustomerCreatedEvent): void {
    console.log('Esse é o primeiro console.log do evento: CustomerCreated')
  }

}

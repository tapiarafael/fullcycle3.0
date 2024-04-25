import { IEventHandler } from "../../@shared/event-handler.interface";
import { CustomerCreatedEvent } from "../customer-created.event";

export class SendConsoleLog2WhenCustomerIsCreated implements IEventHandler<CustomerCreatedEvent> {
  handle(event: CustomerCreatedEvent): void {
    console.log('Esse é o segundo console.log do evento: CustomerCreated')
  }

}

import { IEventHandler } from "../../@shared/event-handler.interface";
import { IEvent } from "../../@shared/event.interface";

export class SendConsoleLog2WhenCustomerIsCreated implements IEventHandler {
  handle(event: IEvent): void {
    console.log('Esse é o segundo console.log do evento: CustomerCreated')
  }

}

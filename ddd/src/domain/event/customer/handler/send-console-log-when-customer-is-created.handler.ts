import { IEventHandler } from "../../@shared/event-handler.interface";
import { IEvent } from "../../@shared/event.interface";

export class SendConsoleLogWhenCustomerIsCreated implements IEventHandler {
  handle(event: IEvent): void {
    console.log('Esse é o primeiro console.log do evento: CustomerCreated')
  }

}

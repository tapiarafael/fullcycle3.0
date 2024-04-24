import { IEventHandler } from "../../@shared/event-handler.interface";
import { IEvent } from "../../@shared/event.interface";

export class SendConsoleLogWhenAddressIsChanged implements IEventHandler {
  handle({eventData, ...event}: IEvent): void {
    console.log(`Endereço do cliente: ${eventData.id}, ${eventData.name} alterado para: ${eventData.address.street}, ${eventData.address.number} - ${eventData.address.city} (${eventData.address.zipcode})`)
  }

}

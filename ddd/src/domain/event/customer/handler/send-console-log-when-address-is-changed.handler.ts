import { IEventHandler } from "../../@shared/event-handler.interface";
import { CustomerAddressChangedEvent } from "../customer-address-changed.event";

export class SendConsoleLogWhenAddressIsChanged implements IEventHandler<CustomerAddressChangedEvent> {
  handle({eventData, ...event}: CustomerAddressChangedEvent): void {
    console.log(`Endereço do cliente: ${eventData.id}, ${eventData.name} alterado para: ${eventData.address.street}, ${eventData.address.number} - ${eventData.address.city} (${eventData.address.zipcode})`)
  }

}

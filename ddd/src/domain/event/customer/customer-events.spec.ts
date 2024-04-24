import { EventEmitter } from "../@shared/event-emitter";
import { CustomerAddressChangedEvent } from "./customer-address-changed.event";
import { CustomerCreatedEvent } from "./customer-created.event";
import { SendConsoleLogWhenAddressIsChanged } from "./handler/send-console-log-when-address-is-changed.handler";
import { SendConsoleLogWhenCustomerIsCreated } from "./handler/send-console-log-when-customer-is-created.handler";
import { SendConsoleLog2WhenCustomerIsCreated } from "./handler/send-console-log2-when-customer-is-created.handler";

describe('CustomerEvents', () => {
  beforeEach(() => {
    const mockedDate = new Date(2020, 1, 1);

    jest.useFakeTimers("modern");
    jest.setSystemTime(mockedDate);
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it('should handle SendConsoleLog1 when CustomerCreatedEvent is emitted', () => {
    const eventName = 'CustomerCreatedEvent'
    const eventEmitter = new EventEmitter();
    const eventHandler = new SendConsoleLogWhenCustomerIsCreated();
    const eventHandlerSpy = jest.spyOn(eventHandler, "handle");
    const expectedDate = new Date(2020, 1, 1);
    const customerData = {
      id: 'any_id',
      name: 'any_name',
      active: true
    };
    const customerCreatedEvent = new CustomerCreatedEvent(customerData);

    eventEmitter.register(eventName, eventHandler);
    
    expect(eventEmitter.eventHandlers.get(eventName)).toBeDefined

    eventEmitter.emit(customerCreatedEvent);

    expect(eventHandlerSpy).toBeCalled();
    expect(eventHandlerSpy).toBeCalledWith({ timestamp: expectedDate, eventData: customerData })
  })

  it('should handle SendConsoleLog2 when CustomerCreatedEvent is emitted', () => {
    const eventName = 'CustomerCreatedEvent'
    const eventEmitter = new EventEmitter();
    const eventHandler = new SendConsoleLog2WhenCustomerIsCreated();
    const eventHandlerSpy = jest.spyOn(eventHandler, "handle");
    const expectedDate = new Date(2020, 1, 1);
    const customerData = {
      id: 'any_id',
      name: 'any_name',
      active: true
    };
    const customerCreatedEvent = new CustomerCreatedEvent(customerData);

    eventEmitter.register(eventName, eventHandler);
    
    expect(eventEmitter.eventHandlers.get(eventName)).toBeDefined

    eventEmitter.emit(customerCreatedEvent);

    expect(eventHandlerSpy).toBeCalled();
    expect(eventHandlerSpy).toBeCalledWith({ timestamp: expectedDate, eventData: customerData })
  })

  it('should handle all events when CustomerCreatedEvent is emitted', () => {
    const eventName = 'CustomerCreatedEvent'
    const eventEmitter = new EventEmitter();
    const eventHandler = new SendConsoleLogWhenCustomerIsCreated();
    const eventHandler2 = new SendConsoleLog2WhenCustomerIsCreated();
    const eventHandlerSpy = jest.spyOn(eventHandler, "handle");
    const eventHandler2Spy = jest.spyOn(eventHandler2, "handle");
    const expectedDate = new Date(2020, 1, 1);
    const customerData = {
      id: 'any_id',
      name: 'any_name',
      active: true
    };
    const customerCreatedEvent = new CustomerCreatedEvent(customerData);

    eventEmitter.register(eventName, eventHandler);
    eventEmitter.register(eventName, eventHandler2);
    
    expect(eventEmitter.eventHandlers.get(eventName)).toBeDefined
    expect(eventEmitter.eventHandlers.get(eventName).length).toBe(2)

    eventEmitter.emit(customerCreatedEvent);

    expect(eventHandlerSpy).toBeCalled();
    expect(eventHandlerSpy).toBeCalledWith({ timestamp: expectedDate, eventData: customerData })
    expect(eventHandler2Spy).toBeCalled();
    expect(eventHandler2Spy).toBeCalledWith({ timestamp: expectedDate, eventData: customerData })
  })

  it('should handle SendAddressConsoleLog when customer address is changed', () => {
    const eventName = 'CustomerAddressChangedEvent'
    const eventEmitter = new EventEmitter();
    const eventHandler = new SendConsoleLogWhenAddressIsChanged();
    const eventHandlerSpy = jest.spyOn(eventHandler, "handle");
    const expectedDate = new Date(2020, 1, 1);
    const customerData = {
      id: 'any_id',
      name: 'any_name',
      active: true,
      address: {
        street: 'any_street',
        number: 'any_number',
        city: 'any_city',
        zipcode: 'any_zip'
      }
    };
    const customerAddressChangedEvent = new CustomerAddressChangedEvent(customerData);

    eventEmitter.register(eventName, eventHandler);
    
    expect(eventEmitter.eventHandlers.get(eventName)).toBeDefined

    eventEmitter.emit(customerAddressChangedEvent);

    expect(eventHandlerSpy).toBeCalled();
    expect(eventHandlerSpy).toBeCalledWith({ timestamp: expectedDate, eventData: customerData })
  })
})

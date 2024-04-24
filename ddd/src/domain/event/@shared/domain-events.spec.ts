import { SendEmailWhenProductIsCreated } from "../product/handler/send-email-when-product-is-created.handler";
import { ProductCreatedEvent } from "../product/product-created.event";
import { EventEmitter } from "./event-emitter";

describe("Domain Events", () => {
  beforeEach(() => {
    const mockedDate = new Date(2020, 1, 1);

    jest.useFakeTimers("modern");
    jest.setSystemTime(mockedDate);
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it('should register an event handler', () => {
    const eventEmitter = new EventEmitter();
    const eventHandler = new SendEmailWhenProductIsCreated();

    eventEmitter.register('ProductCreatedEvent', eventHandler);
  
    expect(eventEmitter.eventHandlers.get("ProductCreatedEvent")).toBeDefined();
    expect(eventEmitter.eventHandlers.get("ProductCreatedEvent").length).toBe(1);
    expect(eventEmitter.eventHandlers.get("ProductCreatedEvent")[0]).toEqual(eventHandler);
  })
  
  it('should unregister an event handler', () => {
    const eventEmitter = new EventEmitter();
    const eventHandler = new SendEmailWhenProductIsCreated();

    eventEmitter.register('ProductCreatedEvent', eventHandler);
  
    eventEmitter.unregister('ProductCreatedEvent', eventHandler);

    expect(eventEmitter.eventHandlers.get("ProductCreatedEvent")).toBeDefined()
    expect(eventEmitter.eventHandlers.get("ProductCreatedEvent").length).toBe(0)
  })
  
  it('should unregister all events', () => {
    const eventEmitter = new EventEmitter();
    const eventHandler = new SendEmailWhenProductIsCreated();

    eventEmitter.register('ProductCreatedEvent', eventHandler);
  
    eventEmitter.unregisterAll();

    expect(eventEmitter.eventHandlers.size).toBe(0); 
    expect(eventEmitter.eventHandlers.get("ProductCreatedEvent")).not.toBeDefined()
  })
  
  it('should emit all events', () => {
    const eventEmitter = new EventEmitter();
    const eventHandler = new SendEmailWhenProductIsCreated();
    const productData = {
      name: 'any_product',
      description: 'any_description',
      price: 10.0
    }
    const expectedDate = new Date(2020, 1, 1);
    const productCreatedEvent = new ProductCreatedEvent(productData);
    const eventHandlerSpy = jest.spyOn(eventHandler, "handle");

    eventEmitter.register('ProductCreatedEvent', eventHandler);

    eventEmitter.emit(productCreatedEvent);
    
    expect(eventHandlerSpy).toBeCalled();
    expect(eventHandlerSpy).toBeCalledWith({timestamp: expectedDate, eventData: productData})
  
  })
})
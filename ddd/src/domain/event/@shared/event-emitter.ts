import { IEventEmitter } from "./event-emitter.interface";
import { IEventHandler } from "./event-handler.interface";
import { IEvent } from "./event.interface";

export class EventEmitter implements IEventEmitter {
  private _eventHandlers: Map<string, IEventHandler[]> = new Map();

  get eventHandlers(): Map<string, IEventHandler[]> {
    return this._eventHandlers;
  }

  emit(event: IEvent): void {
    const eventName = event.constructor.name;
    console.log({eventName})
    const registeredEvents = this._eventHandlers.get(eventName);
    
    registeredEvents?.forEach(handler => handler.handle(event));
  }

  register(eventName: string, eventHandler: IEventHandler<IEvent>): void {
    const registeredEvents = this._eventHandlers.get(eventName) || [];
    registeredEvents.push(eventHandler);

    this._eventHandlers.set(eventName, registeredEvents);
  }

  unregister(eventName: string, eventHandler: IEventHandler<IEvent>): void {
    const registeredEvents = this._eventHandlers.get(eventName);
    if (registeredEvents) {
      const index = registeredEvents.indexOf(eventHandler);
      if (index !== -1) {
        registeredEvents.splice(index, 1);
        this._eventHandlers.set(eventName, registeredEvents);
      }
    }
  }

  unregisterAll(): void {
    this._eventHandlers.clear();
  }
}

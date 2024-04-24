import { IEventHandler } from "./event-handler.interface"
import { IEvent } from "./event.interface";

export interface IEventEmitter {
  emit(event: IEvent): void;
  register(eventName: string, eventHandler: IEventHandler): void;
  unregister(eventName: string, eventHandler: IEventHandler): void;
  unregisterAll(): void;
}
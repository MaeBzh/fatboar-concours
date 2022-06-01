import { EventState } from "./events.state";

export const types = {
  ADD_ITEM: "ADD_ITEM",
  REMOVE_ITEM: "REMOVE_ITEM",
  REPLACE_ITEM: "REPLACE_ITEM",
};

export default {
  set(state: EventState, events: []): void {
    state.events = events;
  },
  add(state: EventState, events: CustomEvent | CustomEvent[]): void {
    if (!Array.isArray(events)) events = [events];
    state.events.push(...events);
  },
  remove(state: EventState, event: CustomEvent): void {
    state.events = state.events.filter((event) => event !== event);
  },
};

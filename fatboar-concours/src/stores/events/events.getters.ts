import { CustomEvent } from "@/models/custom-event.model";

export default {
  getUserCreatedEvent: (state) => {
    return state.events.find((event: CustomEvent) => {
      return event.name === "created";
    });
  },
  getRgpdAcceptedEvent: (state) => {
    return state.events.find((event: CustomEvent) => {
      return event.name === "rgpdAccepted";
    });
  },
  getEntityCreatedEvent: (state) => {
    return state.events.find((event: CustomEvent) => {
      return event.name === "entityCreated";
    });
  },
  getEntityUpdatedEvent: (state) => {
    return state.events.find((event: CustomEvent) => {
      return event.name === "entityUpdated";
    });
  },
  getEntityDeletedEvent: (state) => {
    return state.events.find((event: CustomEvent) => {
      return event.name === "entityDeleted";
    });
  },
  getErrorEvent: (state) => {
    return state.events.find((event: CustomEvent) => {
      return event.name === "error";
    });
  },
  getWrongCredentialsEvent: (state) => {
    return state.events.find((event: CustomEvent) => {
      return event.name === "wrongCredentials";
    });
  },
  getAccountNotActivatedEvent: (state) => {
    return state.events.find((event: CustomEvent) => {
      return event.name === "accountNotActivated";
    });
  },
  getBadGameTicketEvent: (state) => {
    return state.events.find((event: CustomEvent) => {
      return event.name === "badGameTicket";
    });
  },
  getContactMailSendedEvent: (state) => {
    return state.events.find((event: CustomEvent) => {
      return event.name === "contactMailSend";
    });
  },
  getThrottleEvent: (state) => {
    return state.events.find((event: CustomEvent) => {
      return event.name === "throttle";
    });
  },
};

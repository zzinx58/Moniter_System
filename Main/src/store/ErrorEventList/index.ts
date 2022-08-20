import { ErrorEventItemType } from "./../../components/eventPreview/types";
import { defineStore } from "pinia";

const useErrorEventItemStore = defineStore("error-event-item", {
  state: () => {
    return {
      ErrorEventItemInstance,
    };
  },
  actions: {
    changeErrorEventItemInstance(item: ErrorEventItemType) {
      this.ErrorEventItemInstance = item;
    },
  },
});

export default useErrorEventItemStore;

export const ErrorEventItemInstance: ErrorEventItemType = {
  deviceInfo: {
    JSEngine: "",
    browser: "",
    device: "",
    operationSystem: "",
  },
  locationInfo: {
    IP: "",
    location: "",
    supplier: "",
  },
  otherInfo: {
    eventID: "",
    pluginVersion: "",
    userAgent: "",
  },
  sourceInfo: {
    XPath: "",
    outerHTML: "",
    selector: "",
    src: "",
    status: "",
    tagName: "",
    timeStamp: "",
  },
  summaryInfo: {
    URL: "",
    description: "",
    eventType: "",
    timeStamp: "",
  },
};

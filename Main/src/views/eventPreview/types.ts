export interface ErrorEventItemType {
  summaryInfo: {
    description: string;
    timeStamp: string;
    eventType: string;
    URL: string;
  };
  sourceInfo: {
    outerHTML: string;
    src: string;
    tagName: string;
    XPath: string;
    timeStamp: string;
    selector: string;
    status: string;
  };
  deviceInfo: {
    browser: string;
    JSEngine: string;
    operationSystem: string;
    device: string;
  };
  locationInfo: {
    IP: string;
    location: string;
    supplier: string;
  };
  otherInfo: {
    pluginVersion: string;
    eventID: string;
    userAgent: string;
  };
}

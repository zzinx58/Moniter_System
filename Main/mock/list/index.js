import axios from "axios";
import Mock from "mockjs";
const { Random } = Mock;

const ErrorEventList = Mock.mock({
  [`data|${100}`]: [
    {
      summaryInfo: {
        timeStamp: () => {
          return Random.date("MM-dd");
        },
        description: () => {
          return Random.sentence(5);
        },
        eventType: () => {
          return Random.sentence(1);
        },
        URL: () => {
          return Random.url("http", "randomjustfine.org");
        },
      },
      sourceInfo: {
        outerHTML: () => {
          return `<div>${Random.sentence(1)}</div>`;
        },
        src: () => {
          return Random.url();
        },
        tagName: "DIV",
        XPath: "no support",
        selector: "no support",
        timeStamp: () => {
          return Random.datetime("yyyy-MM-dd A HH:mm:ss");
        },
        status: () => {
          return Random.pick(["200", "500", "404", "301"]);
        },
      },
      deviceInfo: {
        browser: () => {
          return Random.pick(["Opera", "Chrome", "MicrosoftEdge"]);
        },
        JSEngine: () => {
          return "V8";
        },
        operationSystem: () => {
          return Random.pick(["MacOS", "Linux", "Windows", "Android", "IOS"]);
        },
        device: () => {
          return Random.pick(["MacOS", "Linux", "Windows", "Android", "IOS"]);
        },
      },
      locationInfo: {
        IP: () => {
          return Random.ip();
        },
        location: () => {
          return Random.city(true);
        },
        supplier: () => {
          return Random.pick(["联通", "电信", "移动"]);
        },
      },
      otherInfo: {
        pluginVersion: () => {
          return Random.float(0.1, 2, 0, 2);
        },
        eventID: () => {
          return Random.string("lower", 20);
        },
        userAgent: () => {
          return Random.pick(["MacOS", "Linux", "Windows", "Android", "IOS"]);
        },
      },
    },
  ],
});

// const showData = Mock.mock({
//   response: () => {
//     return ErrorEventList;
//   },
// });
// console.log(showData.response.data[0]);

Mock.mock(RegExp("/getErrorEventList"), "post", function () {
  console.log("gotRequest");
  return ErrorEventList;
});

// Mock.mock("mock/test", "post", function () {
//   return "hello,1";
// });

// axios.post("mock/test").then((res) => console.log(res));

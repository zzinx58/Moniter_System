/* 浏览量
访客数
新访客数
IP数
频次（人均）
跳出率 */
import axios from "axios";
import Mock from "mockjs";
const { Random } = Mock;

const FlowData = Mock.mock({
  data: {
    PV: () => Random.integer(10, 6000),
    UV: () => Random.integer(10, 6000),
    newVistor: () => Random.integer(10, 400),
    ipTotal: () => Random.integer(10, 6000),
    FPP: () => Random.integer(0, 10),
    jumpOutRate: () => Random.integer(10, 20),
  },
});

const FlowDataTrendency = Mock.mock({
  data: {
    PV: {
      type: () => Random.pick(["up", "down"]),
      rate: () => Random.float(5, 30, 2, 2),
    },
    UV: {
      type: () => Random.pick(["up", "down"]),
      rate: () => Random.float(5, 30, 2, 2),
    },
    newVistor: {
      type: () => Random.pick(["up", "down"]),
      rate: () => Random.float(5, 30, 2, 2),
    },
    ipTotal: {
      type: () => Random.pick(["up", "down"]),
      rate: () => Random.float(5, 30, 2, 2),
    },
    FPP: {
      type: () => Random.pick(["up", "down"]),
      rate: () => Random.float(5, 30, 2, 2),
    },
    jumpOutRate: {
      type: () => Random.pick(["up", "down"]),
      rate: () => Random.float(5, 30, 2, 2),
    },
  },
});

Mock.mock(RegExp("/getFlowData"), "post", function () {
  return FlowData;
});
Mock.mock(RegExp("/FlowDataTrendency"), "post", function () {
  return FlowDataTrendency;
});

// console.log(FlowData);
// console.log(FlowDataTrendency);

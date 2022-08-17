import * as echarts from "echarts";
//@ts-ignore
export default function useEcharts(dom: HTMLElement, theme?: string) {
  let instance = echarts.getInstanceByDom(dom);
  if (!instance) {
    instance = echarts.init(dom, "chalkTheme");
  }
  return instance;
}

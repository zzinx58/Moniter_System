<template>
  <div class='whole'>
    <div class="left">
      <strong>异常数据</strong>

      <h2>前端异常</h2>
      <ElButton type="success" class='hello' @click="bugJs">JS 代码执行异常</ElButton>
      <ElButton type="success" class='world' @click="bugPromise">Promise 异常</ElButton>
      <ElButton type="success" class='hi' @click="bugAsset">静态资源加载异常</ElButton>
      <ElButton type="success" class='foursheep' @click="bugConsole">console.error 异常</ElButton>
      <ElButton class='good' @click="bugCors">跨域异常</ElButton>

      <br/>

      <h2>接口异常</h2>
      <ElButton @click="bugNoRespond">未响应/超时响应异常</ElButton>
      <ElButton type="warning" @click="bugInterface4">4xx 请求异常</ElButton>
      <ElButton @click="bugInterface5">5xx 服务器异常</ElButton>
      <ElButton @click="bugPowless">权限不足</ElButton>

      <h1>白屏异常</h1>
      <ElButton type="info" @click="bugWhiteScreen">白屏异常</ElButton>

<!--      <img src="http://localhost:8888/nottrue.jpg"/>-->
    </div>

    <div class="right">
      <strong>行为数据</strong><br>
      <ElButton type="success" @click="getPerform">获取性能数据</ElButton>
      <ElButton type="success" @click="getClickInform(this.clickMountList)">点击事件</ElButton>
      <ElButton type="warning">
        <RouterLink to="/">路由跳转</RouterLink>
      </ElButton>
      <ElButton @click="getPv">PV、UV</ElButton>
      <ElButton type="info" @click="bugHttp">HTTP 请求监控</ElButton>
      <ElButton type="success" @click="getUserAgentInform">用户设备类型，浏览器版本，webview引擎类型</ElButton>
    </div>

    <br>
    <hr>
    <br>

<!--    <div>-->
<!--      <strong><h1>性能监控</h1></strong>-->
<!--      <ElButton @click="">白屏时间</ElButton>-->
<!--      <ElButton @click="">页面资源加载耗时</ElButton>-->
<!--      <ElButton @click="">首屏渲染耗时</ElButton>-->
<!--      <ElButton @click="">接口请求耗时</ElButton>-->
<!--      <ElButton @click="">收集长时间运行任务（longtasks）</ElButton>-->
<!--    </div>-->
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import {RouteLocationNormalized, RouterView, useRouter} from "vue-router";
import { useUserStore } from "@/store/User";
import request from "@/utils/axios";
import { getSelector, getLastEvent, } from '@/utils/catchError';
import { getPageInfo, getPerformanceTiming, getUserAgent } from "@/utils/performance";
import {mechanismType, metricsName} from "@/type";

export default defineComponent({
  name: "Collect",
  setup() {
    const router = useRouter();
    const requestTest = async () => {
      let result = await request({
        url: "/api/",
        method: "get",
      });
    };
    const clickMountList = ['button'].map((x) => x.toLowerCase());

    // 监控js错误
    window.addEventListener('error', (event) => {
      handleJs(event);
    }, true)

    // 监控promise错误
    window.addEventListener('unhandledrejection', (event) => {
      handlePromise(event);
    }, true)

    // 判断是 JS异常、静态资源异常、还是跨域异常
    const getErrorKey = (event: ErrorEvent | Event) => {
      const isJsError = event instanceof ErrorEvent;
      if (!isJsError) return mechanismType.RS;
      return event.message === 'Script error.' ? mechanismType.CS : mechanismType.JS;
    };

    const handleJs = function (event: any) {
      // 阻止向上抛出控制台报错
      event.preventDefault();
      console.log('injectJsError报错', event)

      // 如果不是跨域脚本异常,就结束
      if (getErrorKey(event) === mechanismType.CS) return;

      // 用户最后一个交互事件
      const lastEvent = getLastEvent();
      let log = null;
      // 有 e.target.src(href) 的认定为资源加载错误
      if (event.target && (event.target.src || event.target.href)) {
        log = {
          type: event.type,
          url: event.target.src,
          message: `GET ${event.target.src} net::ERR_CONNECTION_REFUSED`, // TODO
          html: event.target.outerHTML,
          errorType: 'resourceError',
          tagName: event.target.tagName,
          selector: getSelector(event.path),
        }
      } else {
        log = {
          message: event.message, // 报错信息
          type: event.type,
          errorType: 'jsError',
          fileName: event.filename,
          position: `${event.lineno}:${event.colno}`,
          // stack: getLines(event.error.stack), //错误堆栈
          selector: lastEvent ? getSelector(lastEvent.path) : '',
        }
      }
      console.log('injectJsError log数据', log)
    }

    const handlePromise = function (event: any) {
      console.log('promise报错', event)
      // 用户最后一个交互事件
      const lastEvent = getLastEvent();
      let message;
      let filename;
      let line = 0;
      let column = 0;
      let stack = '';
      let reason = event.reason;
      if (typeof reason === 'string') {
        message = reason;
      } else if (typeof reason === 'object') {
        if (reason.stack) {
          let matchResult = reason.stack.match(/at\s+(.+):(\d+):(\d+)/);
          filename = matchResult[1];
          line = matchResult[2];
          column = matchResult[3];
        }
        message = reason.message;
      }
      const log = {
        message, // 报错信息
        type: event.type,
        errorType: 'promiseError',
        fileName: filename,
        position: `${line}:${column}`,
        selector: lastEvent ? getSelector(lastEvent.path) : '',
      }
      console.log('promise log数据', log)
    }

    const getPerform = function () {
      getPerformanceTiming();
    }

    // 初始化 CBR 点击事件的获取和返回
    const getClickInform = function (mountList: Array<string>): void {
      const handler = (e: MouseEvent | any) => {
        // 这里是根据 tagName 进行是否需要捕获事件的依据，可以根据自己的需要，额外判断id\class等
        // 先判断浏览器支持 e.path ，从 path 里先取
        let target = e.path?.find((x: Element) => mountList.includes(x.tagName?.toLowerCase()));
        // 不支持 path 就再判断 target
        target = target || (mountList.includes(e.target.tagName?.toLowerCase()) ? e.target : undefined);
        if (!target) return;
        const metrics = {
          tagInfo: {
            id: target.id,
            classList: Array.from(target.classList),
            tagName: target.tagName,
            text: target.textContent,
          },
          // 创建时间
          timestamp: new Date().getTime(),
          // 页面信息
          pageInfo: getPageInfo(),
        };
        // 除开商城业务外，一般不会特意上报点击行为的数据，都是作为辅助检查错误的数据存在;
        // this.metrics.add(metricsName.CBR, metrics);
        // 行为记录 不需要携带 完整的pageInfo
        // delete metrics.pageInfo;
        // 记录到行为记录追踪
        const behavior = {
          category: metricsName.CBR,
          data: metrics,
          // ...this.getExtends(),
        };
        console.log('点击事件 log数据', behavior)
        const oldBehavior = localStorage.getItem('click_behavior');
        let newBehavior = [];
        if (oldBehavior) {
          newBehavior = JSON.parse(oldBehavior);
        }
        newBehavior.push(behavior);
        localStorage.setItem('click_behavior', JSON.stringify(newBehavior));
        // this.breadcrumbs.push(behavior);
      };
      window.addEventListener(
          'click',
          (e) => {
            handler(e);
          },
          true,
      );
    }

    // 监听页面
    // 进入页面时调用
    interface routeObj {
      referrer: RouteLocationNormalized | string, // 用户来路地址
      url: RouteLocationNormalized | string, // 路由跳转地址
      type: number | string, // 用户来路方式
      startTime: number,
      duration: number,
      endTime: number,
    }
    let ddd: RouteLocationNormalized | string = window.location.pathname;
    router.beforeEach(to => {
      // to 代表新页面的路由对象
      ddd = to;
      recordBehaviors(to);
    });

    [
      { type: 'load', value: '首页加载' },
      { type: 'replaceState', value: '单页面应用触发 replaceState' },
      { type: 'pushState', value: '单页面应用触发 pushState' },
      { type: 'popstate', value: '浏览器回退或前进' },
      { type: 'beforeunload', value: '我离开页面了' }
    ].forEach(event => {
      document.addEventListener(event.type, () => {
        console.log(event.value)
        if (event.type === 'beforeunload') {
          // 上报
        }
        // recordBehaviors(ddd);
      }, {
        capture: true,
        passive: true // 默认不阻止默认事件
      });
    })

    // 记录当前页面信息，并更新上一个页面的 endTime
    const recordBehaviors = (to: RouteLocationNormalized | string) => {
      let routeList: routeObj[] = [];
      let time = new Date().getTime();
      let behaviors = localStorage.getItem('current_behavior');
      const typeNum = window.performance?.navigation.type;
      let type = '';
      switch (typeNum) {
        case 0:
          type = '点击链接、地址栏输入、表单提交、脚本操作等';
          break;
        case 1:
          type = '点击重新加载按钮、location.reload';
          break;
        case 2:
          type = '点击前进或后退按钮';
          break;
        case 3:
          type = '任何其他来源。即非刷新/非前进后退、非点击链接/地址栏输入/表单提交/脚本操作等';
          break;
      }
      const routeTemplate: routeObj = {
        referrer: '',
        url: to?.path || to,
        type,
        startTime: time,
        duration: 0,
        endTime: 0,
      }
      if (behaviors) {
        routeList = JSON.parse(behaviors);
        const len = routeList.length;
        if (len > 0) {
          routeList[len - 1].endTime = time;
          routeList[len - 1].duration = time - routeList[len - 1].startTime;
          routeTemplate.referrer = routeList[len - 1].url;
        }
      }
      routeList.push(routeTemplate);
      console.log('routeList', routeList)
      localStorage.setItem('current_behavior', JSON.stringify(routeList));
    }

    const getPv = function () {
      const pvLog = {
        kind: "business",
        type: "pv",
        startTime: performance.now(),
        pageURL: window.location.href,
        referrer: document.referrer,
        uuid: 0,
      }
      console.log('pvLog', pvLog)
    }

    // 重写 console.error
    {
      var consoleError = window.console.error;
      window.console.error = function (error) {
        if (error != '参数有缺失') {
          const message = error.message;
          const stack = error.stack;
          const url = window.location.href;
          let row = 0, column = 0;
          if (stack) {
            let mres = stack.match(/\(.*?\)/g) || [];
            let firstLine = (mres[0] || "").replace("(", "").replace(")", ""); // 获取到堆栈信息的第一条

            // 根据:分隔获取行列
            let info = firstLine.split(':')
            row = info[info.length - 2] // 行
            column = info[info.length - 1] // 列
          }

          // setTimeout(function () {
          // 上报错误内容
          let opt = {
            url,
            row,
            column,
            message,
            stack // 错误堆栈信息
          }
          console.log('error捕获', opt);
          // }, 0);
        }
        return consoleError.apply(console, arguments);
      };
    }

    // ========================制造bug=============================
    const bugJs = () => {
      window.someVar.error = 'error'
    }
    const bugPromise = function () {
      new Promise(function (resolve, reject) {
        window.someVar.error = 'error';
      })
    }
    const bugAsset = function () {

    }
    const bugConsole = function () {
      console.error(new Error('错误捕获222'));
    }
    const bugCors = function () {
      try {
        request({
          url: "/test",
          method: "post",
          data: '你好foursheep',
        });
      } catch (e) {
        console.error(e);
        // if (ErrorEvent) {
        //   window.dispatchEvent(new ErrorEvent('error', { e, message: e.message })) // 这里也会触发window.onerror
        // } else {
        //   window.onerror && window.onerror(null, null, null, null, e)
        // }

        // window.addEventListener('error', (e) => {
        //   console.log('捕获到跨域报错', e);
        // })
      }
    }
    const bugNoRespond = function () {

    }
    const bugInterface4 = function () {
      request({
        url: "/test",
        method: "post",
        data: '你好foursheep',
      });
    }
    const bugInterface5 = function () {

    }
    const bugPowless = function () {

    }
    const bugWhiteScreen = function () {

    }
    const bugHttp = function () {

    }
    const getUserAgentInform = function () {
      const userAgentObj = getUserAgent();
      console.log('userAgentObj', userAgentObj)
    }

    return {
      clickMountList,
      bugJs,
      bugPromise,
      bugAsset,
      bugConsole,
      bugCors,
      bugNoRespond,
      bugInterface4,
      bugInterface5,
      bugPowless,
      bugWhiteScreen,
      getPv,
      bugHttp,
      getUserAgentInform,
      getPerform,
      getClickInform,
    }
  },
});
</script>

<style lang="scss" scoped>
//.router-links {
//  li {
//    margin-bottom: 10px;
//  }
//}
//.router-link {
//  padding-inline: 50%;
//}
</style>
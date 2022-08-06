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
      <ElButton @click="bugInterface4">4xx 请求异常</ElButton>
      <ElButton @click="bugInterface5">5xx 服务器异常</ElButton>
      <ElButton @click="bugPowless">权限不足</ElButton>

      <img src="http://localhost:8888/nottrue.jpg"/>
    </div>

    <div class="right">
      <strong>行为数据</strong><br>
      <ElButton type="success" @click="getPerform">获取性能数据</ElButton>
      <ElButton @click="getClickInform">点击事件</ElButton>
      <a href=""></a>
      <a href=""></a>
<!--      <ElButton @click="history.go">跳转</ElButton>-->
<!--      <el-button onClick={history.back()}>Default</el-button>-->
<!--      <el-button onClick={history.pushState('problem')}>Default</el-button>-->
<!--      <el-button onClick={history.popstate()}>Default</el-button>-->
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { RouterView } from "vue-router";
import { useUserStore } from "@/store/User";
import request from "@/utils/axios";
import { getSelector, getLastEvent, } from '@/utils/catchError';
import { getPerformanceTiming } from "@/utils/performance";
import {mechanismType} from "@/type";
import {
  Check,
  Delete,
  Edit,
  Message,
  Search,
  Star,
} from '@element-plus/icons-vue'
export default defineComponent({
  name: "Collect",
  setup() {
    const requestTest = async () => {
      let result = await request({
        url: "/api/",
        method: "get",
      });
    };

    // 监控js错误
    window.addEventListener('error', (event) => {
      handleJs(event);
    }, true)

    // 监控promise错误
    window.addEventListener('unhandledrejection', (event) => {
      handlePromise(event);
    }, true)

    // 监听页面
    {
      const routeList = [];
      const routeTemplate = {
        url: window.location.pathname,
        startTime: 0,
        dulation: 0,
        endTime: 0,
      }
      const recordNextPage = () => {
        // 记录前一个页面的页面停留时间
        const time = new Date().getTime();
        routeList[routeList.length - 1].endTime = time;
        routeList[routeList.length - 1].dulation = time - routeList[routeList.length - 1].startTime;
        // 推一个新的页面停留记录
        routeList.push({
          ...routeTemplate,
          ...{ startTime: time },
        });
      }

      window.addEventListener('load', () => {
        const time = new Date().getTime();
        routeList.push({
          ...routeTemplate,
          ...{
            startTime: time,
          },
        })
        console.log('load', routeList);
      })

      // 单页面应用触发 replaceState 时的上报
      window.addEventListener('replaceState', () => {
        console.log('单页面应用触发 replaceState');
        recordNextPage();
      });
      // 单页面应用触发 pushState 时的上报
      window.addEventListener('pushState', () => {
        console.log('单页面应用触发 pushState');
        recordNextPage();
      });
      // 浏览器回退、前进行为触发的 可以自己判断是否要上报
      window.addEventListener('popstate', () => {
        console.log('浏览器回退或前进')
        recordNextPage();
      });

      window.addEventListener('beforeunload', (event) => {
        console.log('我离开页面了')
        recordNextPage();
      })
    }

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

    // window.addEventListener('click', (event) => {
      // console.log('event', event)
    // })

    const getPerform = function () {
      getPerformanceTiming();
    }

    const getClickInform = function () {

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

    return {
      bugJs,
      bugPromise,
      bugAsset,
      bugConsole,
      bugCors,
      bugNoRespond,
      bugInterface4,
      bugInterface5,
      bugPowless,
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
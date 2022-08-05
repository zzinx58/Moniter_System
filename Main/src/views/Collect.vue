<template>
  <div class='whole'>
    <div class="left">
      <h1>异常数据</h1>

      <h2>前端异常</h2>
      <input class='hello' type="button" onClick={bugjs} value='JS 代码执行异常'/><br/>
      <input class='world' type="button" onClick={bugPromise} value='Promise 异常'/><br/>
      <input type="button" onClick={bugAsset} value='静态资源加载异常'/><br/>
      <img src="http://localhost:8888/nottrue.jpg"/>
      <input type="button" onClick={bugConsole} value='console.error 异常'/><br/>
      <input type="button" onClick={bugCors} value='跨域异常'/><br/>
      <br/>
      <h2>接口异常</h2>
      <button>未响应/超时响应异常</button><br/>
      <button>4xx 请求异常</button><br/>
      <button>5xx 服务器异常</button><br/>
      <button>权限不足</button><br/>
    </div>


    <div class="right">
      <h1>行为数据</h1>
      <input type="button" onClick={getPerform} value='获取性能数据'/><br/>
      <input type="button" onClick={getClickInform} value='点击事件'/><br/>
      <a href=""></a>
      <a href=""></a>
      <el-button onClick={history.go}>跳转</el-button>
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
  name: "Home",
  setup() {
    const userStore = useUserStore();
    const handleClick = () => userStore.updateName("zzinx");
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

    // ====监听页面begin====
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
    // ====监听页面end====

    // 判断是 JS异常、静态资源异常、还是跨域异常
    const getErrorKey = (event: ErrorEvent | Event) => {
      console.log('是不是跨域了', typeof event)
      const isJsError = event instanceof ErrorEvent;
      if (!isJsError) return mechanismType.RS;
      return event.message === 'Script error.' ? mechanismType.CS : mechanismType.JS;
    };

    const handleJs = function (event: any) {
      // 阻止向上抛出控制台报错
      event.preventDefault();
      console.log('injectJsError报错', event)

      // 如果不是跨域脚本异常,就结束
      if (getErrorKey(event) !== mechanismType.CS) return;

      // 用户最后一个交互事件
      const lastEvent = getLastEvent();
      let log = null;
      // 有 e.target.src(href) 的认定为资源加载错误
      if (event.target && (event.target.src || event.target.href)) {
        log = {
          type: event.type,
          errorType: 'resourceError', // js报错
          fileName: event.target.src || event.target.href,
          tagName:event.target.tagName,
          selector: getSelector(event.target),
        }
      } else {
        log = {
          message: event.message, // 报错信息
          type: event.type,
          errorType: 'jsError', // js报错
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
        errorType: 'promiseError', // js报错
        fileName: filename,
        position: `${line}:${column}`,
        selector: lastEvent ? getSelector(lastEvent.path) : '',
      }
      console.log('promise log数据', log)
    }

    window.addEventListener('click', (event) => {
      // console.log('event', event)
    })

    const getPerform = function () {
      getPerformanceTiming();
    }

    const getClickInform = function () {

    }




    const bugjs = function() {
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

    }
    const bugCors = function () {
      try {
        request({
          url: "/api/test",
          method: "post",
          data: '你好foursheep',
        });
      } catch (e) {
        console.error(e);
        window.addEventListener('error', (e) => {
          console.log('捕获到跨域报错', e);
        })
      }
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

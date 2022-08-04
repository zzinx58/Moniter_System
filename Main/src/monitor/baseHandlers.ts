import { getLastEvent, getSelector } from "@/utils/catchError";

interface LogType {
  type: any,
  errorType: string,
  fileName: any,
  tagName?: any,
  selector: string | undefined,
  message?: any,
  position?: string
}

export const handleJs = function (event: any) {
  // 阻止向上抛出控制台报错
  event.preventDefault();
  console.log('injectJsError报错', event)
  // 用户最后一个交互事件
  const lastEvent = getLastEvent();
  let log: LogType
  // 脚本加载错误
  if (event.target && (event.target.src || event.target.href)) {
    log = {
      type: event.type,
      errorType: 'resourceError', // js报错
      fileName: event.target.src || event.target.href,
      tagName: event.target.tagName,
      selector: getSelector(event.target),
    }
  } else {
    log = {
      message: event.message, // 报错信息
      type: event.type,
      errorType: 'jsError', // js报错
      fileName: event.filename,
      position: `${event.lineno}:${event.colno}`,
      selector: lastEvent ? getSelector((lastEvent as any).path!) : '',
    }
  }
  console.log('injectJsError log数据', log)
}

export const handlePromise = function (event: any) {
  console.log('promise报错', event)
  // 用户最后一个交互事件
  const lastEvent = getLastEvent();
  let message: string = '';
  let filename: any;
  let line = 0;
  let column = 0;
  // let stack = '';
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
    selector: lastEvent ? getSelector((lastEvent as any).path!) : '',
  }
  console.log('promise log数据', log)
}
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

export const handleJs = function (event: any): LogType {
  // 阻止向上抛出控制台报错
  event.preventDefault();
  // console.log('injectJsError报错', event)
  // 用户最后一个交互事件
  const lastEvent = getLastEvent();
  let log: LogType
  const { src, href, tagName } = event.target
  // 脚本加载错误
  if (event.target && (src || href)) {
    log = {
      type: event.type,
      errorType: 'resourceError', // js报错
      fileName: src || href,
      tagName: tagName,
      selector: getSelector(event.target),
    }
  } else {
    const { message, type, filename, lineno, colno } = event
    log = {
      message: message, // 报错信息
      type: type,
      errorType: 'jsError', // js报错
      fileName: filename,
      position: `${lineno}:${colno}`,
      selector: lastEvent ? getSelector((lastEvent as any).path!) : '',
    }
  }
  return log
  // console.log('injectJsError log数据', log)
}

export const handlePromise = function (event: any): LogType {
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
  const log: LogType = {
    message, // 报错信息
    type: event.type,
    errorType: 'promiseError', // js报错
    fileName: filename,
    position: `${line}:${column}`,
    selector: lastEvent ? getSelector((lastEvent as any).path!) : '',
  }
  return log
  // console.log('promise log数据', log)
}

export function handleSelector(pathArr: any[]) {
  return pathArr.reverse().filter(element => {
    // 去除 document 和 window
    return element !== document && element !== window;
  }).map(element => {
    let selector: string = ''
    const { id, tagName, className } = element;
    if (id) {
      return `${tagName.toLowerCase()}#${id}`;
    } else if (className && typeof className === 'string') {
      return `${tagName.toLowerCase()}.${className}`;
    } else {
      selector = tagName.toLowerCase()
    }
    return selector
  }).join(' ');
}
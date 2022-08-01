export default function injectJSError() {
  //  "title": "前端监控系统", // 页面标题
  //   "url": "http://localhost:8080/", // 页面URL
  //   "timestamp": "1590815288710", // 访问时间戳
  //   "userAgent": "Chrome", // 用户浏览器类型
  //   "kind": "stability", // 大类
  //   "type": "error", // 小类
  //   "errorType": "jsError", // 错误类型
  //   "message": "Uncaught TypeError: Cannot set property 'error' of undefined", // 类型详情
  //   "filename": "http://localhost:8080/", // 访问的文件名
  //   "position": "0:0", // 行列信息
  //   "stack": "btnClick (http://localhost:8080/:20:39)^HTMLInputElement.onclick (http://localhost:8080/:14:72)", // 堆栈信息
  //   "selector": "HTML BODY #container .content INPUT" // 选择器
  window.addEventListener('error', (e) => {
    console.log(e);
    return {
      kind: 'stability',
      type: 'error',
      errorType: 'jsError',
      filename: e.filename,
      position: (e.lineno) || 0 + ":" + (e.colno || 0),
      // stack: getLines(e.error.stack),
      // selector: lastEvent ? getSelector(lastEvent.path || lastEvent.target) : ""
    }
  })
};

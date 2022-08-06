let lastEvent: Event;
[
    'click',
    'mousedown',
    // 'mouseover',
    'keydown',
    'touchstart',
].forEach(eventType => {
    document.addEventListener(eventType, (event) => {
        lastEvent = event;
    }, {
        capture: true,
        passive: true // 默认不阻止默认事件
    });
})
export function getLastEvent() {
    return lastEvent;
}

// 获取选择器
export function getSelector(pathsOrTarget) {
    if (Array.isArray(pathsOrTarget)) {
        return handleSelector(pathsOrTarget);
    } else {
        let pathArr = [];
        while (pathsOrTarget) {
            pathArr.push(pathsOrTarget);
            pathsOrTarget = pathsOrTarget.parentNode;
        }
        return handleSelector(pathArr);
    }
}
function handleSelector (pathArr) {
    return pathArr.reverse().filter(element => {
        // 去除 document 和 window
        return element !== document && element !== window;
    }).map(element => {
        const {id, className, tagName} = element;
        if (id) {
            return `${tagName.toLowerCase()}#${id}`;
        } else if (className && typeof className === 'string') {
            return `${tagName.toLowerCase()}.${className}`;
        } else {
            return tagName.toLowerCase();
        }
    }).join(' ');
}

// 捕获接口异常
const orignalEvents = [
    'abort',
    'error',
    'load',
    'timeout',
    'onreadystatechange',
]
const method = 'open'
const originalXhrProto = window.XMLHttpRequest.prototype
const original = originalXhrProto[method]
originalXhrProto[method] = function (...args) {
    // 获取xhr实例  绑定事件
    const xhr = this
    orignalEvents.forEach((eType) => {
        xhr.addEventListener(eType, function (e) {
            // ...
        })
    })
    original.apply(this, args)
}
export function interfaceError (error: any) {
    console.log('接口异常', error)
    let { url, method, params, data } = error.config
    let err_data = {
        url: error.request.responseURL,
        // timestamp,
        // userAgent, //浏览器版本
        method,
        type: 'xhr',
        eventType: "load", //事件类型 TODO
        // pathname: url, //路径
        status: error.status,
        // duration:
        response: error.response ? JSON.stringify(error.response) : "",
        params: { query: params, body: data },
        error: error.data?.message || error.statusText,
        // error: error.data?.message || JSON.stringify(error.data),
    }
    console.log('接口异常 log数据', err_data)
}
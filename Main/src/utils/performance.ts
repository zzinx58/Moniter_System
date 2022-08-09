export interface PageInformation {
    host: string;
    hostname: string;
    href: string;
    protocol: string;
    origin: string;
    port: string;
    pathname: string;
    search: string;
    hash: string;
    // 网页标题
    title: string;
    // 浏览器的语种 (eg:zh) ; 这里截取前两位，有需要也可以不截取
    language: string;
    // 用户 userAgent 信息
    userAgent?: string;
    // 屏幕宽高 (eg:1920x1080)  屏幕宽高意为整个显示屏的宽高
    winScreen: string;
    // 文档宽高 (eg:1388x937)   文档宽高意为当前页面显示的实际宽高（有的同学喜欢半屏显示）
    docScreen: string;
}
// 获取 PI 页面基本信息
export function getPageInfo (): PageInformation  {
    const { host, hostname, href, protocol, origin, port, pathname, search, hash } = window.location;
    const { width, height } = window.screen;
    const { language } = navigator;
    const userAgent = getUserAgent();
    return {
        host,
        hostname,
        href,
        protocol,
        origin,
        port,
        pathname,
        search,
        hash,
        title: document.title,
        language: language.substr(0, 2),
        userAgent,
        winScreen: `${width} x ${height}`,
        docScreen: `${document.documentElement.clientWidth || document.body.clientWidth}x${
            document.documentElement.clientHeight || document.body.clientHeight
        }`,
    };
};

export function getPerformanceTiming () {
    const {
        redirectStart, redirectEnd,
        domainLookupStart, domainLookupEnd,
        fetchStart,
        connectStart, connectEnd,
        secureConnectionStart,
        responseStart, responseEnd,
        requestStart,
        domComplete,
        domLoading,
        loadEventStart, loadEventEnd,
        domInteractive,
        navigationStart,
        domContentLoadedEventEnd,
        // domContentLoaded,
        // domContentLoaded,
        // } = window.performance.getEntriesByType('navigation');
    } = window.performance.timing;
    const redirect = redirectEnd - redirectStart; // 重定向
    const appCache = domainLookupStart - fetchStart; // 缓存
    const DNS = domainLookupEnd - domainLookupStart; // DNS 解析耗时
    const TCP = connectEnd - connectStart; // TCP 连接耗时
    const SSL = connectEnd - secureConnectionStart; // SSL 握手
    const request = responseStart - requestStart; // 请求耗时
    const response = responseEnd - responseStart; // 响应耗时
    const Trans = responseEnd - responseStart; // 内容传输耗时
    const DOM = domInteractive - responseEnd; // DOM解析耗时
    const FirstByte = responseStart - domainLookupStart; // 首包时间
    const processing = domComplete - domLoading;
    const Load = loadEventStart - fetchStart; // 页面完全加载时间
    const Res = loadEventStart - domContentLoadedEventEnd; // 资源加载耗时
    const DomReady = domContentLoadedEventEnd - fetchStart;
    const domParse = domInteractive - responseEnd; // DOM 解析耗时
    const TTFB = responseStart - requestStart;
    // const TTFB = responseStart - navigationStart;
    const FP = responseEnd - fetchStart; // 首次渲染时间 / 白屏时间
    const TTI = domInteractive - fetchStart; // 首次可交互时间
    // const ready = domContentLoaded - fetchStart; // HTML 加载完成时间
    // const resourceLoad = domComplete - domContentLoaded;
    console.log('!', {
        redirect: redirectEnd - redirectStart, // 重定向
        appCache: domainLookupStart - fetchStart, // 缓存
        DNS: domainLookupEnd - domainLookupStart, // DNS 解析
        TCP: connectEnd - connectStart, // TCP 连接耗时
        SSL: connectEnd - secureConnectionStart, // SSL 握手
        request: responseStart - requestStart, // 请求耗时
        response: responseEnd - responseStart, // 响应耗时
        Trans: responseEnd - responseStart, // 内容传输耗时
        DOM: domInteractive - responseEnd, // DOM解析耗时
        FirstByte: responseStart - domainLookupStart, // 首包
        processing: domComplete - domLoading,
        Load: loadEventStart - fetchStart, // 页面完全加载时间
        Res: loadEventStart - domContentLoadedEventEnd, //
        DomReady: domContentLoadedEventEnd - fetchStart,
        domParse: domInteractive - responseEnd, // DOM 解析耗时
        TTFB: responseStart - requestStart,
        FP: responseEnd - fetchStart, // 首次渲染时间 / 白屏时间
        TTI: domInteractive - fetchStart, // 首次可交互时间
    })
}

// 获取user-agent解析
import parser from 'ua-parser-js';
export function getUserAgent () {
    return parser();
}
// import Bowser from 'bowser';
// export function getFeature(userAgent) {
//     const browserData = Bowser.parse(userAgent);
//     const parserData = parser(userAgent);
//     const browserName = browserData.browser.name || parserData.browser.name; // 浏览器名
//     const browserVersion = browserData.browser.version || parserData.browser.version; // 浏览器版本号
//     const osName = browserData.os.name || parserData.os.name; // 操作系统名
//     const osVersion = parserData.os.version || browserData.os.version; // 操作系统版本号
//     const deviceType = browserData.platform.type || parserData.device.type; // 设备类型
//     const deviceVendor = browserData.platform.vendor || parserData.device.vendor || ''; // 设备所属公司
//     const deviceModel = browserData.platform.model || parserData.device.model || ''; // 设备型号
//     const engineName = browserData.engine.name || parserData.engine.name; // engine名
//     const engineVersion = browserData.engine.version || parserData.engine.version; // engine版本号
//     return {
//         browserName,
//         browserVersion,
//         osName,
//         osVersion,
//         deviceType,
//         deviceVendor,
//         deviceModel,
//         engineName,
//         engineVersion,
//     };
// }


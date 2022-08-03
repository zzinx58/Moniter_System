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
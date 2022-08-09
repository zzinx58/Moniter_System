// 错误类型
export enum mechanismType {
    JS = 'js',
    RS = 'resource',
    UJ = 'unhandledrejection',
    HP = 'http',
    CS = 'cors',
    VUE = 'vue',
}

// 用户行为所做的参数
export enum metricsName {
    PI = 'page-information',
    OI = 'origin-information',
    RCR = 'router-change-record',
    CBR = 'click-behavior-record',
    CDR = 'custom-define-record',
    HT = 'http-record',
}

export interface HttpMetrics {
    method: string;
    url: string | URL;
    body: Document | XMLHttpRequestBodyInit | null | undefined | ReadableStream;
    requestTime: number;
    responseTime: number;
    status: number;
    statusText: string;
    response?: any;
}


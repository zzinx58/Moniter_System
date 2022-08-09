import { handlePromise, handleSelector } from '@/monitor/baseHandlers';
import { getSelector } from '@/utils/catchError';
import { PromiseRejectionEvent } from '@/utils/Event'
describe('promise', () => {
  test('async test', async () => {
    const asyncMock = jest
      .fn()
      .mockResolvedValueOnce('first call')
      .mockRejectedValueOnce(new Error('Async error message'));

    const text = await asyncMock(); // 'first call'
    expect(text).toBe('first call')
    try {
      await asyncMock()
    } catch (e: any) {
      expect(e.message).toEqual('Async error message')
    }
  })
  test('test', async () => {
    const asyncMock = jest
      .fn()
      .mockRejectedValueOnce(new Error('类型“Window & typeof globalThis”上不存在属性“someVar”'));
    try {
      await asyncMock()
    } catch (e: any) {
      expect(e.message).toEqual('类型“Window & typeof globalThis”上不存在属性“someVar”')
    }
  })


  it('test getSelector', () => {
    const set = new Set()
    const dom1 = document.createElement('input')
    dom1.setAttribute('class', 'world')
    const dom2 = document.createElement('div')
    dom2.setAttribute('class', 'left')
    const dom3 = document.createElement('body')
    const dom4 = document.createElement('html')
    set.add(dom1)
    set.add(dom2)
    set.add(dom3)
    set.add(dom4)
    expect(getSelector(Array.from(set) as any)).toEqual("html body div.left input.world")
    expect(handleSelector(Array.from(set) as any[])).toEqual("html body div.left input.world")
  });

  it('unhandledrejection', async () => {
    const myPromise = new Promise((resolve, reject) => {
      // 假设抛出了一个错误
    })


    let myRejectionEvent = new PromiseRejectionEvent('unhandledrejection', {
      promise: myPromise,
      reason: {
        message: "Cannot set property 'error' of undefined",
        stack: "TypeError: Cannot set property 'error' of undefined\n    at http://localhost:5173/src/Test.tsx:42:30\n    at new Promise (<anonymous>)\n    at bugPromise (http://localhost:5173/src/Test.tsx:41:7)\n    at callWithErrorHandling (http://localhost:5173/node_modules/.vite/deps/chunk-V4LB3WK7.js?v=df02e3af:1369:18)\n    at callWithAsyncErrorHandling (http://localhost:5173/node_modules/.vite/deps/chunk-V4LB3WK7.js?v=df02e3af:1377:17)\n    at HTMLInputElement.invoker (http://localhost:5173/node_modules/.vite/deps/chunk-V4LB3WK7.js?v=df02e3af:7512:7)",
      },
    });

    expect(handlePromise(myRejectionEvent)).toEqual({
      message: "Cannot set property 'error' of undefined",
      type: 'unhandledrejection',
      errorType: 'promiseError',
      fileName: 'http://localhost:5173/src/Test.tsx',
      position: '42:30',
      selector: ''
    })
  });
});
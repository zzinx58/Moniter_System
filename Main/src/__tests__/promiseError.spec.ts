import { handleSelector } from '@/monitor/baseHandlers';
import { getSelector } from '@/utils/catchError';
export type PromiseRejectionEventTypes = 'rejectionhandled' | 'unhandledrejection';

export type PromiseRejectionEventInit = {
  promise: Promise<any>;
  reason: any;
}

export type Event = {
  /** Returns true or false depending on how event was initialized. True if event goes through its target's ancestors in reverse tree order, and false otherwise. */
  readonly bubbles: boolean;
  cancelBubble: boolean;
  /** Returns true or false depending on how event was initialized. Its return value does not always carry meaning, but true can indicate that part of the operation during which event was dispatched, can be canceled by invoking the preventDefault() method. */
  readonly cancelable: boolean;
  /** Returns true or false depending on how event was initialized. True if event invokes listeners past a ShadowRoot node that is the root of its target, and false otherwise. */
  readonly composed: boolean;
  /** Returns the object whose event listener's callback is currently being invoked. */
  readonly currentTarget: EventTarget | null;
  /** Returns true if preventDefault() was invoked successfully to indicate cancelation, and false otherwise. */
  readonly defaultPrevented: boolean;
  /** Returns the event's phase, which is one of NONE, CAPTURING_PHASE, AT_TARGET, and BUBBLING_PHASE. */
  readonly eventPhase: number;
  /** Returns true if event was dispatched by the user agent, and false otherwise. */
  readonly isTrusted: boolean;
  /** @deprecated */
  returnValue: boolean;
  /** @deprecated */
  readonly srcElement: EventTarget | null;
  /** Returns the object to which event is dispatched (its target). */
  readonly target: EventTarget | null;
  /** Returns the event's timestamp as the number of milliseconds measured relative to the time origin. */
  readonly timeStamp: DOMHighResTimeStamp;
  /** Returns the type of event, e.g. "click", "hashchange", or "submit". */
  readonly type: string;
  /** Returns the invocation target objects of event's path (objects on which listeners will be invoked), except for any nodes in shadow trees of which the shadow root's mode is "closed" that are not reachable from event's currentTarget. */
  composedPath(): EventTarget[];
  /** @deprecated */
  initEvent(type: string, bubbles?: boolean, cancelable?: boolean): void;
  /** If invoked when the cancelable attribute value is true, and while executing a listener for the event with passive set to false, signals to the operation that caused event to be dispatched that it needs to be canceled. */
  preventDefault(): void;
  /** Invoking this method prevents event from reaching any registered event listeners after the current one finishes running and, when dispatched in a tree, also prevents event from reaching any other objects. */
  stopImmediatePropagation(): void;
  /** When dispatched in a tree, invoking this method prevents event from reaching any objects other than the current object. */
  stopPropagation(): void;
  readonly AT_TARGET: number;
  readonly BUBBLING_PHASE: number;
  readonly CAPTURING_PHASE: number;
  readonly NONE: number;
}

export class PromiseRejectionEvent extends Event {
  public readonly promise: Promise<any>;
  public readonly reason: any;

  public constructor(type: PromiseRejectionEventTypes, options: PromiseRejectionEventInit) {
    super(type);

    this.promise = options.promise;
    this.reason = options.reason;
  }
}
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
    expect(handleSelector(Array.from(set) as any)).toEqual("html body div.left input.world")
  });

  // it('unhandledrejection', async () => {
  //   const myPromise = new Promise((resolve, reject) => { })
  //   // const mouseEvents = document.createEvent("MouseEvents")
  //   // mouseEvents.initEvent

  //   const mouseEvent = new MouseEvent('click', {
  //     bubbles: true,
  //     cancelable: true,
  //   })
  //   let myRejectionEvent = new PromiseRejectionEvent('unhandledrejection', {
  //     promise: myPromise,
  //     reason: {
  //       message: "Cannot set property 'error' of undefined",
  //       stack: "TypeError: Cannot set property 'error' of undefined\n    at http://localhost:5173/src/Test.tsx:42:30\n    at new Promise (<anonymous>)\n    at bugPromise (http://localhost:5173/src/Test.tsx:41:7)\n    at callWithErrorHandling (http://localhost:5173/node_modules/.vite/deps/chunk-V4LB3WK7.js?v=df02e3af:1369:18)\n    at callWithAsyncErrorHandling (http://localhost:5173/node_modules/.vite/deps/chunk-V4LB3WK7.js?v=df02e3af:1377:17)\n    at HTMLInputElement.invoker (http://localhost:5173/node_modules/.vite/deps/chunk-V4LB3WK7.js?v=df02e3af:7512:7)"
  //     }
  //   });

  //   console.log(handlePromise(myRejectionEvent));
  // readonly colno: number;
  // readonly error: any;
  // readonly filename: string;
  // readonly lineno: number;
  // let message: string = '';
  // let filename: any;
  // let line = 0;
  // let column = 0;readonly message: string;
  // const event = jest.fn().mockRejectedValueOnce(new ErrorEvent('unhandledrejection', {
  //   message: 'PromiseRejectionEvent',
  //   filename: 'promiseError.spec.ts',
  //   lineno: 10,
  //   colno: 10
  // }))
  // try {
  //   await event()
  // } catch (e: any) {
  //   console.log(e.message);
  // }

  // });
});
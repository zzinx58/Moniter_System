
export type PromiseRejectionEventTypes = 'rejectionhandled' | 'unhandledrejection';

export type PromiseRejectionEventInit = {
  promise: Promise<any>;
  reason: any;
}

export type Event = {
  readonly bubbles: boolean;
  cancelBubble: boolean;
  readonly cancelable: boolean;
  readonly composed: boolean;
  readonly currentTarget: EventTarget | null;
  readonly defaultPrevented: boolean;
  readonly eventPhase: number;
  readonly isTrusted: boolean;
  /** @deprecated */
  returnValue: boolean;
  /** @deprecated */
  readonly srcElement: EventTarget | null;
  readonly target: EventTarget | null;
  readonly timeStamp: DOMHighResTimeStamp;
  readonly type: string;
  composedPath(): EventTarget[];
  /** @deprecated */
  initEvent(type: string, bubbles?: boolean, cancelable?: boolean): void;
  preventDefault(): void;
  stopImmediatePropagation(): void;
  stopPropagation(): void;
  readonly AT_TARGET: number;
  readonly BUBBLING_PHASE: number;
  readonly CAPTURING_PHASE: number;
  readonly NONE: number;
  readonly path: number
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
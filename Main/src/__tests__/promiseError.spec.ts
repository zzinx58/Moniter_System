// import { handlePromise } from "@/monitor/baseHandlers";
import { mount } from "@vue/test-utils";
import ErrorButton from '@/test_compoents/ErrorButton.vue'
// 监控promise错误
let e: PromiseRejectionEvent;
window.addEventListener('unhandledrejection', (event: PromiseRejectionEvent) => {
  e = event
  console.log('unhandledrejection event');

  console.log(e);
  // const errorLog = handlePromise(event);
  // console.log('unhandledrejection ---- errorLog', errorLog);
}, true)

describe('promise', () => {
  test.skip('async test', async () => {
    const asyncMock = jest
      .fn()
      .mockResolvedValueOnce('first call')
      .mockRejectedValueOnce(new Error('Async error message'));

    await asyncMock(); // 'first call'
    try {
      await asyncMock()
    } catch (e: any) {
      expect(e.message).toEqual('Async error message')
    }
  })
  test.skip('test', async () => {
    const asyncMock = jest
      .fn()
      .mockRejectedValueOnce(new Error('类型“Window & typeof globalThis”上不存在属性“someVar”'));
    try {
      await asyncMock()
    } catch (e: any) {
      expect(e.message).toEqual('类型“Window & typeof globalThis”上不存在属性“someVar”')
    }
  })
  test('test', async () => {
    const wrapper = mount(ErrorButton as any)
    const proButton = wrapper.find('[data-test="button1"]')
    try {
      await proButton.trigger('click')
      console.log(1);
    } catch (e) {
      console.log(1);
    }
  })
});

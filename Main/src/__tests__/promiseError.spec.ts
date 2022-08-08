// import { mount } from "@vue/test-utils";
// import ErrorButton from '@/test_compoents/ErrorButton.vue';
// let e: PromiseRejectionEvent
// window.addEventListener('unhandledrejection', (event) => {
//   e = event
//   console.log(e);
// })

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
});
// test('test', async () => {
//   const wrapper = mount(ErrorButton as any)
//   const proButton = wrapper.find('[data-test="button1"]')
//   try {
//     await proButton.trigger('click')
//   } catch (e: any) {
//     console.log(e.message);
//   }
// })

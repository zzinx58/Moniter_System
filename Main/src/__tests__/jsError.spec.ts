// import injectJSError from "..";
import { mount } from '@vue/test-utils'
import type { VueWrapper, DOMWrapper } from '@vue/test-utils'
import Button from '@/views/Button.vue'

let wrapper: VueWrapper<any>
let button: DOMWrapper<any>
let setupState: Record<string, unknown> = {}

beforeAll(() => {
  wrapper = mount(Button as any)
  button = wrapper.find('[data-tests="button"]')
  setupState = wrapper.vm.$.setupState
})

describe('first Button test', () => {
  it.skip('we should have a button dom', () => {
    expect(button.exists()).toBeTruthy()
  })

});

describe('Button Cannot set property error of undefined', () => {
  it.skip('button injectJSError', async () => {
    // const throwError = () => {
    //   throw new Error(`Cannot set property 'error' of undefined`)
    // }
    // expect(() => throwError()).toThrowError("")
    // const throwError = jest.fn()
    // const Component = {
    //   template: `<button @click="throwError"></button>`,
    //   methods: {
    //     throwError
    //   }
    // }
    // const wrap = mount(Component, {})
    // const fn = wrap.trigger('click')
    // // await nextTick()
    // expect(fn).rejects.toThrowError()
    // expect(injectJSError()).toEqual({
    //   "kind": "stability", // 大类
    //   "type": "error", // 小类
    //   "errorType": "jsError", // 错误类型
    //   "filename": "http://localhost:5173/node_modules/.vite/deps/chunk-V4LB3WK7.js?v=59b8a3e7", // 访问的文件名
    //   "position": "1427:7", // 行列信息
    const expectedErrorMessage =
      '[vue-test-utils]: you cannot set the target value of an event. See the notes section of the docs for more details—https://vue-test-utils.vuejs.org/api/wrapper/trigger.html'

    const clickHandler = jest.fn()
    const Component = {
      template: '<div @click="clickHandler" />',
      methods: { clickHandler }
    }
    const wrapper = mount(Component, {})

    const fn = wrapper.trigger('click', { target: "something" })
    expect(fn).rejects.toThrowError(expectedErrorMessage)

    expect(clickHandler).not.toHaveBeenCalled()
  })
})



// it('test button click handler', () => {
//   const throwError = () => {
//     try {
//       throw new Error('thrown')
//     } catch (e: any) {
//       // console.log(e.message);
//     }

//   }
//   const Component = {
//     template: `<button @click="throwError"></button>`,
//     methods: { throwError }
//   }
//   const wrap = mount(Component, {})
//   const fn = wrap.trigger('click')
//   expect(fn).resolves.toThrowError('thrown')
// });


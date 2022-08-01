import injectJSError from "..";
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
  it('button injectJSError', () => {
    const throwError = () => {
      throw new Error(`Cannot set property 'error' of undefined`)
    }
    expect(() => throwError()).toThrowError("")
    expect(injectJSError()).toEqual({
      "kind": "stability", // 大类
      "type": "error", // 小类
      "errorType": "jsError", // 错误类型
      "filename": "http://localhost:5173/node_modules/.vite/deps/chunk-V4LB3WK7.js?v=59b8a3e7", // 访问的文件名
      "position": "1427:7", // 行列信息
    })
  })
})
// import injectJSError from "..";
import { mount } from '@vue/test-utils'
import type { VueWrapper, DOMWrapper } from '@vue/test-utils'
import Button from '@/views/Button.vue'

let wrapper: VueWrapper<any>
let button: DOMWrapper<any>

beforeAll(() => {
  wrapper = mount(Button as any)
  button = wrapper.find('[data-tests="button"]')
})

describe('first Button test', () => {
  it.skip('we should have a button dom', () => {
    expect(button.exists()).toBeTruthy()
  })

});

describe('Button Cannot set property error of undefined', () => {
  it.skip('button injectJSError', async () => {
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



it('test button click handler', (done) => {
  let message: string = ''
  const throwError = () => {
    try {
      throw new Error('thrown')
    } catch (e: any) {
      message = e.message
    }
  }
  const Component = {
    template: `<button @click="throwError"></button>`,
    methods: { throwError }
  }
  const wrap = mount(Component, {})
  const fn = wrap.trigger('click')
  fn.then(() => {
    if (message) {
      expect(message).toBe('thrown')
      done()
    }
  })
});
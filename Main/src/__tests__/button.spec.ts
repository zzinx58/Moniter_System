import { mount } from '@vue/test-utils'
import type { VueWrapper, DOMWrapper } from '@vue/test-utils'
import Button from '@/views/Button.vue'


let wrapper: VueWrapper<any> | null = null
let button: DOMWrapper<any>
let setupState: Record<string, unknown> = {}

beforeEach(() => {
  wrapper = mount(Button as any)
  button = wrapper.find('[data-tests="button"]')
  setupState = wrapper.vm.$.setupState
})

describe('first Button test', () => {
  it.skip('we should have a button dom', () => {
    expect(button.exists()).toBeTruthy()
  })

  it('we should throw error when user trigger button click event', async () => {
    // await button.trigger('click')
    const { throwError } = setupState
    expect(throwError).toThrowError('Test error')
    // expect(wrapper?.emitted().click).toBeTruthy()
  })
});
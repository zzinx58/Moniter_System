import { mount } from '@vue/test-utils'
import Button from '@/views/Button.vue'

describe('first Button test', () => {
  it('we should have a button dom', () => {
    const wrapper = mount(Button as any)
    const button = wrapper.find('[data-tests="button"]')
    expect(button.exists()).toBeTruthy()
  })
});
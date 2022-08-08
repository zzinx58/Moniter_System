import { handleJs } from '@/monitor/baseHandlers';
import Button from '@/test_compoents/ErrorButton.vue';
import { mount } from '@vue/test-utils'

let event: ErrorEvent


window.addEventListener('error', (e) => {
  event = e
}, true)


describe('js Error', () => {
  it('button click => handleJs', async () => {
    const wrapper = mount(Button as any)
    const input = wrapper.find('[data-test="button"]')
    await input.trigger('click')
    expect(event ?? false).not.toBeFalsy()
    expect(handleJs(event)).toMatchObject({
      type: 'error',
      errorType: 'jsError'
    })
  });
});
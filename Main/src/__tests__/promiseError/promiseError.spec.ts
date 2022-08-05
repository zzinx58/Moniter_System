import { handlePromise } from "@/monitor/baseHandlers";
import { mount } from "@vue/test-utils";
import promiseButton from '@/test_compoents/promiseErrorButton.vue'

let event: PromiseRejectionEvent

window.addEventListener('unhandledrejection', (e) => {
  event = e
  console.log(event);
}, true)

describe('promiseError', () => {
  it('test promise', async () => {
    const wrapper = mount(promiseButton as any)
    const input = wrapper.find('[data-test="button"]')
    await input.trigger('click')
    // expect(event ?? false).not.toBeFalsy()
    // expect(handlePromise(event)).toMatchObject({
    //   type: 'unhandledrejection',
    //   errorType: 'promiseError'
    // })
  });
})
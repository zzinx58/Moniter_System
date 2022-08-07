import { handleJs } from '@/monitor/baseHandlers';
import Button from '@/test_compoents/ErrorButton.vue';
import { mount } from '@vue/test-utils'

let event: ErrorEvent


window.addEventListener('error', (e) => {
  event = e
}, true)


describe('js Error', () => {
  it.skip('button click => handleJs', async () => {
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


// const bugPromise = function () {
//   return new Promise(function (resolve, reject) {
//     window.someVar.error = 'error';
//   })
// }

// describe('promise', () => {
//   it('should return a promise', async () => {
//     expect(bugPromise).toThrow(Promise)
//   })
// })


// describe('Button Cannot set property error of undefined', () => {
//   it.skip('button injectJSError', async () => {
//     const expectedErrorMessage =
//       '[vue-test-utils]: you cannot set the target value of an event. See the notes section of the docs for more details—https://vue-test-utils.vuejs.org/api/wrapper/trigger.html'

//     const clickHandler = jest.fn()
//     const Component = {
//       template: '<div @click="clickHandler" />',
//       methods: { clickHandler }
//     }
//     const wrapper = mount(Component, {})

//     const fn = wrapper.trigger('click', { target: "something" })
//     expect(fn).rejects.toThrowError(expectedErrorMessage)

//     expect(clickHandler).not.toHaveBeenCalled()
//   })
// })
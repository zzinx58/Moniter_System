jest.mock('@/test_compoents/demo')
import { fetchData, axiosData } from "@/test_compoents/demo";
describe('api Test', () => {
  it('data is a function, and implementation it should return 123', async () => {
    return await fetchData().then(data => {
      expect(eval(data)).toEqual('123')
    })
  })
  it('should return object', async () => {
    return await axiosData().then((data: Record<string, any>) => {
      expect(data).toEqual({
        code: 200,
        data: {
          item: {
            msg: 'lalala'
          }
        },
        msg: 'success'
      })
    })
  })
  it('200 Test', async () => {
    const { axios200 } = jest.requireActual('@/test_compoents/demo')
    return expect(axios200()).resolves.toMatchObject({
      status: 200,
      statusText: 'OK',
      data: {
        "userId": 1,
        "id": 1,
        "title": "delectus aut autem",
        "completed": false
      },
      config: {
        url: 'https://jsonplaceholder.typicode.com/todos/1',
        method: 'get',
      }
    })
  })

  it('404 Test', async () => {
    const { axios404 } = jest.requireActual('@/test_compoents/demo')
    return expect(axios404()).rejects.toThrow(/404/)
  })
});
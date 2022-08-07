jest.mock('@/test_compoents/demo')
import { fetchData } from "@/test_compoents/demo";

describe('api Test', () => {
  it('should create a new instance', () => {
    return fetchData().then(data => {
      expect(eval(data)).toEqual('123')
    })
  })
});
jest.mock('@/test_compoents/demo')
import { fetchData } from "@/test_compoents/demo";

describe('api Test', () => {
  it('should return 123', async () => {
    return await fetchData().then(data => {
      expect(eval(data)).toEqual('123')
    })
  })
});
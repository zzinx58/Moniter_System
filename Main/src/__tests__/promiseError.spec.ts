describe('promise', () => {
  test('async test', async () => {
    const asyncMock = jest
      .fn()
      .mockResolvedValueOnce('first call')
      .mockRejectedValueOnce(new Error('Async error message'));

    await asyncMock(); // 'first call'
    try {
      await asyncMock()
    } catch (e: any) {
      expect(e.message).toEqual('Async error message')
    }
  })
  test('test', async () => {
    const asyncMock = jest
      .fn()
      .mockResolvedValueOnce('first call')
      .mockRejectedValueOnce(new Error('Async error message'));

    await asyncMock(); // 'first call'
    try {
      await asyncMock()
    } catch (e: any) {
      expect(e.message).toEqual('Async error message')
    }
  })
});

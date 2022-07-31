import { add } from '../views';
describe('button error', () => {
  it('1 + 1 shoule be 2', () => {
    expect(2).toBe(2) 
  });
  it('1 + 1 shoule be 2', () => {
    expect(add(1,1)).toBe(2) 
  });
});

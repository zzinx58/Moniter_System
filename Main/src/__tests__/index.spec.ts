import { describe, it, expect } from 'vitest'
import add from '.';
describe('first test cases', () => {
  it('1 + 1 shoule be 2', () => {
    expect(1 + 1).toBe(2) 
  }); 
  // function
  it('1 + 1 shoule be 2', () => {
    expect(add(1, 1)).toBe(2) 
  }); 
});
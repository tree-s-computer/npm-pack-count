import { describe, expect, test } from 'vitest';
import { formatDate } from '../src/util';

describe('Test Format Date', () => {
  test('Test#1', () => {
    expect(formatDate(new Date('2024-03-17T10:03:23'))).toBe('2024-03-17');
  });
});

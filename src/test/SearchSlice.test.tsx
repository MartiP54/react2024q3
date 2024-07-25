import { describe, it, expect } from 'vitest';
import searchReducer, { setSearchQuery } from '../slice/searchSlice';

describe('searchSlice', () => {
  it('handles initial state', () => {
    expect(searchReducer(undefined, { type: 'unknown' })).toEqual({
      query: '',
    });
  });

  it('handles setSearchQuery', () => {
    const actual = searchReducer({ query: '' }, setSearchQuery('test'));
    expect(actual.query).toEqual('test');
  });
});
// selectedObjectSlice.test.ts
import { describe, it, expect } from 'vitest';
import selectedObjectReducer, { setSelectedObject, clearSelectedObject } from '../slice/selectedObjectSlice';
import { AstronomicalObject } from '../services/astronomicalObjectsApi';

describe('selectedObjectSlice', () => {
  it('should return the initial state', () => {
    const initialState = { selectedObject: null };
    expect(selectedObjectReducer(undefined, { type: '@@INIT'})).toEqual(initialState);
  });

  it('should handle setSelectedObject', () => {
    const previousState = { selectedObject: null };
    const astronomicalObject: AstronomicalObject = {
      uid: '1',
      name: 'Earth',
      astronomicalObjectType: 'planet',
      location: null
    };
    expect(
      selectedObjectReducer(previousState, setSelectedObject(astronomicalObject))
    ).toEqual({ selectedObject: astronomicalObject });
  });

  it('should handle clearSelectedObject', () => {
    const previousState = {
      selectedObject: {
        uid: '1',
        name: 'Earth',
        astronomicalObjectType: 'planet',
        location: null
      },
    };
    expect(
      selectedObjectReducer(previousState, clearSelectedObject())
    ).toEqual({ selectedObject: null });
  });
});

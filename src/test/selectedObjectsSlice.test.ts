
import { describe, it, expect } from 'vitest';
import selectedObjectsReducer, { addSelectedObject, removeSelectedObject, clearSelectedObjects } from '../slice/selectedObjectsSlice';
import { AstronomicalObject } from '../services/astronomicalObjectsApi';

describe('selectedObjectsSlice', () => {
  it('should return the initial state', () => {
    const initialState = { selectedObjects: [] };
    expect(selectedObjectsReducer(undefined, { type: '@@INIT' })).toEqual(initialState);
  });

  it('should handle addSelectedObject', () => {
    const previousState = { selectedObjects: [] };
    const astronomicalObject: AstronomicalObject = {
      uid: '1',
      name: 'Earth',
      astronomicalObjectType: 'planet',
      location: null,
    };
    expect(
      selectedObjectsReducer(previousState, addSelectedObject(astronomicalObject))
    ).toEqual({ selectedObjects: [astronomicalObject] });
  });

  it('should handle removeSelectedObject', () => {
    const previousState = {
      selectedObjects: [
        {
          uid: '1',
          name: 'Earth',
          astronomicalObjectType: 'planet',
          location: null,
        },
        {
          uid: '2',
          name: 'Mars',
          astronomicalObjectType: 'planet',
          location: null,
        },
      ],
    };
    expect(
      selectedObjectsReducer(previousState, removeSelectedObject('1'))
    ).toEqual({
      selectedObjects: [
        {
          uid: '2',
          name: 'Mars',
          astronomicalObjectType: 'planet',
          location: null,
        },
      ],
    });
  });

  it('should handle clearSelectedObjects', () => {
    const previousState = {
      selectedObjects: [
        {
          uid: '1',
          name: 'Earth',
          astronomicalObjectType: 'planet',
          location: null,
        },
      ],
    };
    expect(
      selectedObjectsReducer(previousState, clearSelectedObjects())
    ).toEqual({ selectedObjects: [] });
  });
});


import { describe, it, expect } from 'vitest';
import astronomicalObjectsReducer, { setAstronomicalObjects, clearAstronomicalObjects } from '../slice/astronomicalObjectsSlice';
import { AstronomicalObject } from '../services/astronomicalObjectsApi';

describe('astronomicalObjectsSlice', () => {
  it('should return the initial state', () => {
    const initialState = { data: null };
    expect(astronomicalObjectsReducer(undefined, { type: '@@INIT' })).toEqual(initialState);
  });

  it('should handle setAstronomicalObjects', () => {
    const previousState = { data: null };
    const astronomicalObjects: AstronomicalObject[] = [
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
    ];
    expect(
      astronomicalObjectsReducer(previousState, setAstronomicalObjects(astronomicalObjects))
    ).toEqual({ data: astronomicalObjects });
  });

  it('should handle clearAstronomicalObjects', () => {
    const previousState = {
      data: [
        {
          uid: '1',
          name: 'Earth',
          astronomicalObjectType: 'planet',
          location: null,
        },
      ],
    };
    expect(
      astronomicalObjectsReducer(previousState, clearAstronomicalObjects())
    ).toEqual({ data: null });
  });
});

import { describe, it, expect } from 'vitest';
import astronomicalObjectsApi from '../services/astronomicalObjectsApi';

describe('astronomicalObjectsApi', () => {
  it('should have correct endpoint configuration', () => {
    const { endpoints } = astronomicalObjectsApi;
    expect(endpoints.fetchAstronomicalObjects).toBeDefined();
    expect(endpoints.fetchAstronomicalObjectDetails).toBeDefined();
  });
});

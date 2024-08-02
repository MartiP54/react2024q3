
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

interface Location {
  uid: string;
  name: string;
  astronomicalObjectType?: string;
  location?: Location;
}

export interface AstronomicalObject {
  uid: string;
  name: string;
  astronomicalObjectType: string;
  location: Location | null;
  astronomicalObjects?: AstronomicalObject[];
}

export interface AstronomicalObjectResponse {
  astronomicalObjects: AstronomicalObject[];
  page: {
    totalElements: number;
    totalPages: number;
    pageNumber: number;
    pageSize: number;
  };
}

export interface AstronomicalObjectDetailsResponse {
  astronomicalObject: AstronomicalObject;
}

const baseQuery = fetchBaseQuery({ baseUrl: 'http://stapi.co/api/v2/rest/' });

const astronomicalObjectsApi = createApi({
  reducerPath: 'astronomicalObjectsApi',
  baseQuery,
  endpoints: (builder) => ({
    fetchAstronomicalObjects: builder.query<AstronomicalObjectResponse, { searchQuery: string; page: number }>({
      query: ({ searchQuery, page }) => ({
        url: `astronomicalObject/search?pageNumber=${page - 1}`,
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: `name=${searchQuery}`,
      }),
    }),
    fetchAstronomicalObjectDetails: builder.query<AstronomicalObjectDetailsResponse, string>({
      query: (uid) => `astronomicalObject?uid=${uid}`,
    }),
  }),
});

export { baseQuery };
export default astronomicalObjectsApi;

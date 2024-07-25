export interface Location {
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
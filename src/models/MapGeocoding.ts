export interface IMapGeocoding {
  address_component: [];
  formatted_address: string;
  geometry: {
    location: {
      lat: number;
      lng: number;
    };
    location_type: string;
    viewport: {
      northeast: {
        lat: number;
        lng: number;
      };
      southwest: {
        lat: number;
        lng: number;
      };
    };
  };
  place_id: string;
}

export interface ICoordinateModel {
  lat: number;
  lng: number;
}

import type { FeatureCollection, MultiPolygon } from 'geojson';
import type { LatLngBoundsExpression } from 'leaflet';
import boundaryData from './lallo-boundary.json';

export interface LalloBoundaryProperties {
  type: string;
  level: string;
  label: string;
  locale: string;
  country_id: number;
  country_reference: number;
  country_name: string;
  region_id: string;
  region_reference: string;
  region_name: string;
  province_id: string;
  province_reference: string;
  province_name: string;
  city_id: string;
  city_reference: string;
  city_name: string;
}

export const lalloBoundary = boundaryData as FeatureCollection<
  MultiPolygon,
  LalloBoundaryProperties
>;

const boundaryFeature = lalloBoundary.features[0];
const boundaryRings = boundaryFeature?.geometry.coordinates.flatMap(
  polygon => polygon
);

if (
  !boundaryRings ||
  boundaryRings.length === 0 ||
  boundaryRings.some(ring => ring.length === 0)
) {
  throw new Error(
    'The Lal-lo boundary GeoJSON does not contain polygon rings.'
  );
}

const boundaryPositions = boundaryRings.flatMap(ring => ring);
const longitudes = boundaryPositions.map(([longitude]) => longitude);
const latitudes = boundaryPositions.map(([, latitude]) => latitude);

export const lalloBoundaryBounds: LatLngBoundsExpression = [
  [Math.min(...latitudes), Math.min(...longitudes)],
  [Math.max(...latitudes), Math.max(...longitudes)],
];

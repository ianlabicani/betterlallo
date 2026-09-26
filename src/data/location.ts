import type { SourceRecord } from '../types/civic';
import { REVIEW_DATE } from './civicRecords';

export interface MunicipalityLocation {
  latitude: number;
  longitude: number;
  label: string;
  source: SourceRecord;
}

export function buildGoogleMapsSearchUrl(
  location: Pick<MunicipalityLocation, 'latitude' | 'longitude'> | null
): string | null {
  if (!location) {
    return null;
  }

  const query = `${location.latitude},${location.longitude}`;
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(query)}`;
}

export const lalloLocationSource: SourceRecord = {
  label: 'OpenStreetMap municipal hall feature',
  url: 'https://www.openstreetmap.org/way/315700644',
  lastVerified: REVIEW_DATE,
  status: 'verified',
  authority: 'municipal',
  jurisdiction: 'Lal-lo, Cagayan',
  sourceType: 'directory',
  verificationNote:
    'The public map feature is used only for municipality-level orientation; verify the destination before travel.',
};

export const lalloBoundarySource: SourceRecord = {
  label: 'OSSPhilippines geoph Lal-lo boundary GeoJSON',
  url: 'https://github.com/OSSPhilippines/geoph/blob/06e792bd6c241c57f8c3946b648381ae8a328846/geojson/city/ph.cagayan-valley-region-ii.cagayan.lal-lo.any.geo.json',
  lastVerified: REVIEW_DATE,
  status: 'verified',
  authority: 'national',
  jurisdiction: 'Lal-lo, Cagayan',
  sourceType: 'open-data',
  verificationNote:
    'The OSSPhilippines geoph feature labels Lal-Lo as a city-level boundary and is used here for municipality-level map orientation. The source repository is MIT-licensed.',
};

const latitudeValue = import.meta.env.VITE_LALLO_LATITUDE;
const longitudeValue = import.meta.env.VITE_LALLO_LONGITUDE;
const latitude = latitudeValue ? Number(latitudeValue) : Number.NaN;
const longitude = longitudeValue ? Number(longitudeValue) : Number.NaN;

export const lalloLocation: MunicipalityLocation | null =
  Number.isFinite(latitude) && Number.isFinite(longitude)
    ? {
        latitude,
        longitude,
        label: 'Lal-lo Municipal Hall',
        source: lalloLocationSource,
      }
    : null;

export const lalloGoogleMapsUrl = buildGoogleMapsSearchUrl(lalloLocation);

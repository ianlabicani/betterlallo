import type { SourceRecord } from '../types/civic';
import { REVIEW_DATE } from './civicRecords';

export interface MunicipalityLocation {
  latitude: number;
  longitude: number;
  label: string;
  source: SourceRecord;
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

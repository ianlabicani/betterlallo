import type { SourceRecord } from '../types/civic';
import { officialSources } from './civicRecords';

export interface LalloHistoryRecord {
  id: string;
  year: string;
  title: string;
  description: string;
  source: SourceRecord;
}

export const lalloHistoryRecords: LalloHistoryRecord[] = [
  {
    id: 'shell-midden-heritage',
    year: 'Prehistory',
    title: 'Shell-midden heritage',
    description:
      'Early Cagayan communities left large shell-midden sites in Lal-lo and Gattaran. The provincial history page notes that these sites are on the UNESCO World Heritage Shortlist.',
    source: officialSources.provincialHistory,
  },
  {
    id: 'juan-salcedo-lalloc',
    year: '1572',
    title: 'Juan Salcedo visits Lalloc',
    description:
      'The historical marker at Lallo Church records Juan Salcedo’s visit to Lalloc during the early Spanish period.',
    source: officialSources.nhcpHistory,
  },
  {
    id: 'lalloc-nueva-segovia',
    year: '1581',
    title: 'Lalloc becomes Nueva Segovia',
    description:
      'Juan Pablo Carrión names the town Nueva Segovia, the historic name preserved in the NHCP marker record.',
    source: officialSources.nhcpHistory,
  },
  {
    id: 'luis-perez-dasmarinas-lalloc',
    year: '1592',
    title: 'Luis Pérez Dasmariñas visits Lalloc',
    description:
      'The NHCP marker text also records Luis Pérez Dasmariñas’s visit to Lalloc.',
    source: officialSources.nhcpHistory,
  },
  {
    id: 'diocese-of-nueva-segovia',
    year: '1595',
    title: 'Seat of the Diocese of Nueva Segovia',
    description:
      'After the diocese is created by Pope Clement VIII, Lalloc serves as its seat for the next 160 years.',
    source: officialSources.nhcpHistory,
  },
  {
    id: 'diocese-moved-to-vigan',
    year: '1755',
    title: 'The diocesan seat moves to Vigan',
    description:
      'The Diocese of Nueva Segovia is transferred to Vigan, ending Lalloc’s role as its seat.',
    source: officialSources.nhcpHistory,
  },
  {
    id: 'capital-moved-to-tuguegarao',
    year: '1839',
    title: 'Cagayan’s capital moves to Tuguegarao',
    description:
      'Lalloc serves as the capital of Cagayan until the provincial government is moved to Tuguegarao.',
    source: officialSources.nhcpHistory,
  },
  {
    id: 'historical-marker-installed',
    year: '1939',
    title: 'Lalloc–Nueva Segovia marker installed',
    description:
      'A historical marker is installed at the facade of Lallo Church to preserve the town’s early history.',
    source: officialSources.nhcpHistory,
  },
  {
    id: 'heritage-projects-2026',
    year: '2026',
    title: 'Heritage work continues',
    description:
      'A provincial publication reports heritage projects at the Tocolana Church and Hospital Ruins in Tucalana and the Evangelization Cross in Centro.',
    source: officialSources.provincialHeritage,
  },
];

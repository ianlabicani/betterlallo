import { readdir, readFile } from 'node:fs/promises';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';

const scriptDirectory = fileURLToPath(new URL('.', import.meta.url));
const draftsDirectory = join(scriptDirectory, '..', 'research', 'drafts');
const allowedAuthorities = new Set([
  'municipal',
  'provincial',
  'regional',
  'national',
]);
const allowedStatuses = new Set(['draft', 'approved']);
const allowedSourceTypes = new Set([
  'open-data',
  'budget',
  'financial-report',
  'full-disclosure',
  'audit',
  'procurement',
  'directory',
  'facility-registry',
  'citizens-charter',
  'project-report',
  'history',
  'program-report',
  'legal-framework',
]);
const requiredFields = [
  'id',
  'claim',
  'sourceUrl',
  'authority',
  'jurisdiction',
  'sourceType',
  'reviewStatus',
];

const files = (await readdir(draftsDirectory)).filter(file =>
  file.endsWith('.json')
);
const errors = [];
let draftCount = 0;
let approvedCount = 0;

for (const file of files) {
  const path = join(draftsDirectory, file);
  let record;
  try {
    record = JSON.parse(await readFile(path, 'utf8'));
  } catch (error) {
    errors.push(`${file}: invalid JSON (${error.message})`);
    continue;
  }

  for (const field of requiredFields) {
    if (typeof record[field] !== 'string' || record[field].trim() === '') {
      errors.push(`${file}: missing required field ${field}`);
    }
  }
  if (
    typeof record.sourceUrl === 'string' &&
    !/^https:\/\//.test(record.sourceUrl)
  ) {
    errors.push(`${file}: sourceUrl must use https://`);
  }
  if (!allowedAuthorities.has(record.authority)) {
    errors.push(
      `${file}: authority must be municipal, provincial, regional, or national`
    );
  }
  if (!allowedSourceTypes.has(record.sourceType)) {
    errors.push(`${file}: sourceType is not a supported civic source type`);
  }
  if (!allowedStatuses.has(record.reviewStatus)) {
    errors.push(`${file}: reviewStatus must be draft or approved`);
  }
  if (!record.publicationDate && !record.dataPeriod) {
    errors.push(`${file}: include publicationDate or dataPeriod`);
  }

  if (record.sourceType === 'financial-report') {
    if (
      typeof record.extractionDate !== 'string' ||
      record.extractionDate === ''
    ) {
      errors.push(`${file}: financial-report drafts require extractionDate`);
    }
    if (!record.rowIdentity || typeof record.rowIdentity !== 'object') {
      errors.push(`${file}: financial-report drafts require rowIdentity`);
    } else {
      for (const field of ['sheet', 'lguName', 'lguType', 'excelRow']) {
        if (
          record.rowIdentity[field] === undefined ||
          String(record.rowIdentity[field]).trim() === ''
        ) {
          errors.push(`${file}: rowIdentity requires ${field}`);
        }
      }
    }
    if (!record.metrics || typeof record.metrics !== 'object') {
      errors.push(`${file}: financial-report drafts require metrics`);
    } else {
      const requiredMetrics = [
        'currentOperatingIncome',
        'localSources',
        'externalSources',
        'currentOperatingExpenditures',
        'netOperatingIncome',
        'cashBalanceEnd',
        'generalPublicServices',
        'socialServices',
        'economicServices',
        'debtServiceInterest',
      ];
      for (const metric of requiredMetrics) {
        if (typeof record.metrics[metric] !== 'number') {
          errors.push(`${file}: metrics requires numeric ${metric}`);
        }
      }
      if (
        typeof record.metrics.currentOperatingIncome === 'number' &&
        typeof record.metrics.localSources === 'number' &&
        typeof record.metrics.externalSources === 'number' &&
        Math.abs(
          record.metrics.localSources +
            record.metrics.externalSources -
            record.metrics.currentOperatingIncome
        ) > 0.01
      ) {
        errors.push(
          `${file}: localSources plus externalSources must equal currentOperatingIncome`
        );
      }
      if (
        typeof record.metrics.currentOperatingExpenditures === 'number' &&
        [
          'generalPublicServices',
          'socialServices',
          'economicServices',
          'debtServiceInterest',
        ].every(metric => typeof record.metrics[metric] === 'number') &&
        Math.abs(
          record.metrics.generalPublicServices +
            record.metrics.socialServices +
            record.metrics.economicServices +
            record.metrics.debtServiceInterest -
            record.metrics.currentOperatingExpenditures
        ) > 0.01
      ) {
        errors.push(
          `${file}: expenditure categories must equal currentOperatingExpenditures`
        );
      }
      if (
        typeof record.metrics.currentOperatingIncome === 'number' &&
        typeof record.metrics.currentOperatingExpenditures === 'number' &&
        typeof record.metrics.netOperatingIncome === 'number' &&
        Math.abs(
          record.metrics.currentOperatingIncome -
            record.metrics.currentOperatingExpenditures -
            record.metrics.netOperatingIncome
        ) > 0.01
      ) {
        errors.push(
          `${file}: income minus expenditures must equal netOperatingIncome`
        );
      }
    }
  }

  if (record.reviewStatus === 'approved') approvedCount += 1;
  if (record.reviewStatus === 'draft') draftCount += 1;
}

if (errors.length > 0) {
  console.error(errors.join('\n'));
  process.exitCode = 1;
} else {
  console.log(
    `Validated ${files.length} source draft${files.length === 1 ? '' : 's'}: ${draftCount} draft, ${approvedCount} approved. No records were published.`
  );
}

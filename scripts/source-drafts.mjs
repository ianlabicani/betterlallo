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
  if (!allowedStatuses.has(record.reviewStatus)) {
    errors.push(`${file}: reviewStatus must be draft or approved`);
  }
  if (!record.publicationDate && !record.dataPeriod) {
    errors.push(`${file}: include publicationDate or dataPeriod`);
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

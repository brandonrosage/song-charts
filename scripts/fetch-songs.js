import fs from 'fs';
import path from 'path';
import { google } from 'googleapis';
import yaml from 'js-yaml';

const SHEET_ID = '1q2iJbQn6_atQMf-zeOky27qlsE_K7eitf9lDAnrE2rI';
const SHEET_RANGE = "'Songs'"; // Tab name
const OUTPUT_PATH = path.resolve('_data/songs.yml');

if (!process.env.GOOGLE_SERVICE_ACCOUNT_JSON) {
  console.error('GOOGLE_SERVICE_ACCOUNT_JSON environment variable is missing.');
  process.exit(1);
}

async function authorize() {
  const credentials = JSON.parse(process.env.GOOGLE_SERVICE_ACCOUNT_JSON);
  const scopes = ['https://www.googleapis.com/auth/spreadsheets.readonly'];

  const auth = new google.auth.GoogleAuth({
    credentials,
    scopes,
  });

  return await auth.getClient();
}

async function fetchSheet(auth) {
  const sheets = google.sheets({ version: 'v4', auth });
  const res = await sheets.spreadsheets.values.get({
    spreadsheetId: SHEET_ID,
    range: SHEET_RANGE,
  });
  return res.data.values;
}

function toYaml(rows) {
  if (!rows || rows.length === 0) return '';
  const [header, ...body] = rows;
  const objects = body.map(row =>
    Object.fromEntries(header.map((key, i) => [key, row[i] ?? '']))
  );
  return {yamlStr: yaml.dump(objects, { lineWidth: -1 }), count: body.length};
}

async function main() {
  try {
    const auth = await authorize();
    const rows = await fetchSheet(auth);
    const {yamlStr, count} = toYaml(rows);

    fs.mkdirSync(path.dirname(OUTPUT_PATH), { recursive: true });
    fs.writeFileSync(OUTPUT_PATH, yamlStr, 'utf8');
    console.log(`Saved ${count} records to ${OUTPUT_PATH}`);
  } catch (err) {
    console.error('Error:', err);
    process.exit(1);
  }
}

main();
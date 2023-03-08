import { json as json$1 } from '@sveltejs/kit';
import fs from 'fs/promises';


/** @type {import('@sveltejs/kit/types').RequestHandler} */
export async function GET({ request }) {
  try {
    const jsonData = await fs.readFile('src/lib/json/data.json', 'utf8');
    const parsedJson = JSON.parse(jsonData);
    return json$1(parsedJson);
  } catch (err) {
    console.error(err);
    return json$1({ error: 'Failed to read data from file' });
  }
}

export async function POST({ request }) {
  try {
    const data = await request.json();
    const json = JSON.stringify(data, null, 2);
    await fs.writeFile('src/lib/json/data.json', json, 'utf8');
    return json$1({ message: 'success' });
  } catch (err) {
    console.error(err);
    return json$1({ error: 'Failed to write data to file' });
  }
}






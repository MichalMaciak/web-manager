import fs from 'fs/promises';
import { json as json$1 } from '@sveltejs/kit'

/** @type {import('@sveltejs/kit/types').RequestHandler} */

export async function POST({ request }) {

    const data = await request.json();
    const json = JSON.stringify(data, null, 2)
    await fs.writeFile('src/lib/json/data.json', json, 'utf8');
        return json$1({
          message: 'success',
        })
    } 
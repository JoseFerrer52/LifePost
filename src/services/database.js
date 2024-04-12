import fs from 'fs';
import { promisify } from 'util';

const readFile = promisify(fs.readFile);
const writeFile = promisify(fs.writeFile);

const databasePath = "./src/services/database.json"; // Cambia esto por la ruta a tu archivo JSON.

async function readDatabase() {
    try {
        const data = await readFile(databasePath, 'utf8');
        if (data === '') {
            return [];
        }
        return JSON.parse(data);
    } catch (error) {
        console.error(error);
        return [];
    }
}

async function writeDatabase(data) {
    try {
        const json = JSON.stringify(data, null, 2);
        await writeFile(databasePath, json, 'utf8');
    } catch (error) {
        console.error(error);
    }
}

export { readDatabase, writeDatabase };
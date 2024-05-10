import { dirname, join } from "path";
import { fileURLToPath } from "url";
import fs from "fs";
import { promisify } from "util";

const readFile = promisify(fs.readFile);
const writeFile = promisify(fs.writeFile);
const __dirname = dirname(fileURLToPath(import.meta.url));
const databasePath = join(__dirname, "/database.json");

async function readDatabase() {
  try {
    const data = await readFile(databasePath, "utf8");
    if (data === "") {
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
    await writeFile(databasePath, json, "utf8");
  } catch (error) {
    console.error(error);
  }
}

export { readDatabase, writeDatabase };

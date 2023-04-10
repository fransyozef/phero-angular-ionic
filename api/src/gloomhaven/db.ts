import { JsonDB, Config } from 'node-json-db'


export function getDatabase(): JsonDB {
    return new JsonDB(new Config("gloomhaven-db", true, false, '/'));
}
import { DBConfig, ObjectStoreMeta } from 'ngx-indexed-db';

const GAME_TITLES: string[] = [
  'p3p',
  'p3fes',
  'p3ans',
  'p4',
  'p4g',
  'p5',
  'p5r',
];

function metaGenerator(storeName: string): ObjectStoreMeta[] {
  return GAME_TITLES.map((game) => {
    return {
      store: `${game}_${storeName}`,
      storeConfig: { keyPath: 'id', autoIncrement: true },
      storeSchema: [
        { name: 'saveName', keypath: 'saveName', options: { unique: true } },
      ],
    };
  });
}

const GAME_STORES: ObjectStoreMeta[] = metaGenerator('personae');
const GAME_SETTINGS: ObjectStoreMeta = {
  store: 'settings',
  storeConfig: { keyPath: 'id', autoIncrement: true },
  storeSchema: [{ name: 'name', keypath: 'name', options: { unique: true } }],
};

export const appDbConfig: DBConfig = {
  name: 'FusionToolDB',
  version: 1,
  objectStoresMeta: [...GAME_STORES, GAME_SETTINGS],
};

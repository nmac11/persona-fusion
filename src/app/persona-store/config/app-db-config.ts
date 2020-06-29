import { DBConfig } from 'ngx-indexed-db';

export const appDbConfig: DBConfig = {
  name: 'FusionToolDB',
  version: 1,
  objectStoresMeta: [
    {
      store: 'p3fes_personas',
      storeConfig: { keyPath: 'id', autoIncrement: true },
      storeSchema: [
        { name: 'saveName', keypath: 'saveName', options: { unique: true } },
      ],
    },
    {
      store: 'p3p_personas',
      storeConfig: { keyPath: 'id', autoIncrement: true },
      storeSchema: [
        { name: 'saveName', keypath: 'saveName', options: { unique: true } },
      ],
    },
    {
      store: 'p4_personas',
      storeConfig: { keyPath: 'id', autoIncrement: true },
      storeSchema: [
        { name: 'saveName', keypath: 'saveName', options: { unique: true } },
      ],
    },
    {
      store: 'p4g_personas',
      storeConfig: { keyPath: 'id', autoIncrement: true },
      storeSchema: [
        { name: 'saveName', keypath: 'saveName', options: { unique: true } },
      ],
    },
  ],
};

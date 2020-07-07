import { DBConfig, ObjectStoreMeta } from 'ngx-indexed-db';
import { serviceToken } from '../../helpers/service-token-helper';

const GAME_TITLES: string[] = Object.keys(serviceToken);
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
const GAME_SETTINGS: ObjectStoreMeta[] = metaGenerator('settings');

export const appDbConfig: DBConfig = {
  name: 'FusionToolDB',
  version: 1,
  objectStoresMeta: [...GAME_STORES, ...GAME_SETTINGS],
};

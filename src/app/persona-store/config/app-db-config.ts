import { DBConfig } from 'ngx-indexed-db';
import { serviceToken } from '../../helpers/service-token-helper';
export const appDbConfig: DBConfig = {
  name: 'FusionToolDB',
  version: 1,
  objectStoresMeta: Object.keys(serviceToken).map(game => {
    return {
      store: `${game}_personae`,
      storeConfig: { keyPath: 'id', autoIncrement: true },
      storeSchema: [
        { name: 'saveName', keypath: 'saveName', options: { unique: true } },
      ],
    }
  }),
};

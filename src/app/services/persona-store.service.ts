import { Injectable, Inject } from '@angular/core';
import { NgxIndexedDBService } from 'ngx-indexed-db';
import { StoredFusionNode } from '../models/stored-fusion-node';

@Injectable()
export class PersonaStoreService {
  storeName: string;

  constructor(
    @Inject(String) game: string,
    private dbService: NgxIndexedDBService,
  ) {
    this.storeName = game + '_personas';
  }

  load(name: string): Promise<StoredFusionNode> {
    return this.dbService.getByIndex(this.storeName, 'name', name);
  }

  save(data: StoredFusionNode) {
    this.dbService.add(this.storeName, data);
  }

  loadAll(): Promise<StoredFusionNode[]> {
    return this.dbService.getAll(this.storeName);
  }
}

import { Injectable, Inject } from '@angular/core';
import { NgxIndexedDBService } from 'ngx-indexed-db';
import { FusionNode } from '../models/fusion-node';

@Injectable()
export class PersonaStoreService {
  storeName: string;

  constructor(
    @Inject(String) game: string,
    private dbService: NgxIndexedDBService,
  ) {
    this.storeName = game + '_personas';
  }

  load(name: string): Promise<FusionNode> {
    return this.dbService.getByIndex(this.storeName, 'saveName', name);
  }

  save(data: FusionNode) {
    this.dbService.add(this.storeName, data);
  }

  loadAll(): Promise<FusionNode[]> {
    return this.dbService.getAll(this.storeName);
  }
}

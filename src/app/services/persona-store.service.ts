import { Injectable, Inject } from '@angular/core';
import { NgxIndexedDBService } from 'ngx-indexed-db';

@Injectable()
export class PersonaStoreService {
  storeName: string;

  constructor(
    @Inject(String) game: string,
    private dbService: NgxIndexedDBService,
  ) {
    this.storeName = game + '_personas';
  }

  load(name: string) {
    return this.dbService.getByIndex(this.storeName, 'name', name);
  }

  save(data: { name: string; data: any}) {
    this.dbService.add(this.storeName, data);
  }
}

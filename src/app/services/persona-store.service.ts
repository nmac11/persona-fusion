import { Injectable, Inject } from '@angular/core';
import { NgxIndexedDBService } from 'ngx-indexed-db';
import { FusionNode } from '../models/fusion-node';
import { GAME_CONFIG } from '../injection-tokens/game-config.token';
import { GameConfig } from '../models/game-config';

@Injectable()
export class PersonaStoreService {
  storeName: string;

  constructor(
    @Inject(GAME_CONFIG) private config: GameConfig,
    private dbService: NgxIndexedDBService,
  ) {
    this.storeName = this.config.title + '_personae';
  }

  load(id: number): Promise<FusionNode> {
    return this.dbService.getByKey(this.storeName, id);
  }

  loadByName(name: string): Promise<FusionNode> {
    return this.dbService.getByIndex(this.storeName, 'saveName', name);
  }

  async save(data: FusionNode): Promise<number | false> {
    try {
      return await this.dbService.add(this.storeName, data);
    } catch (error) {
      console.error(error);
      return false;
    }
  }

  async update(data: FusionNode): Promise<boolean> {
    try {
      await this.dbService.update(this.storeName, data);
      return true;
    } catch (error) {
      console.error(error);
      return false;
    }
  }

  async delete(id: number): Promise<boolean> {
    try {
      await this.dbService.delete(this.storeName, id);
      return true;
    } catch (error) {
      console.error(error);
      return false;
    }
  }

  async loadAll(): Promise<FusionNode[]> {
    return ((await this.dbService.getAll(
      this.storeName,
    )) as FusionNode[]).reverse();
  }
}

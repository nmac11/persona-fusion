import { Observable, fromEvent } from 'rxjs';
import { map, take, tap } from 'rxjs/operators';
import { Persona } from '../models/persona';

export class NormalFusionsFilterWorkerWrapper {
  constructor(
    private fusions: Persona[][],
    private fusionPersonae: Persona[],
  ) {}

  filter(nameFilters: string[]): Observable<Persona[][]> {
    const worker = new Worker('../workers/normal-fusions-filter.worker', {
      type: 'module',
    });
    worker.postMessage({
      fusions: this.fusions,
      fusionPersonae: this.fusionPersonae,
      nameFilters,
    });
    return fromEvent(worker, 'message').pipe(
      map((e: MessageEvent) => e.data as Persona[][]),
      take(1),
      tap(() => worker.terminate()),
    );
  }
}

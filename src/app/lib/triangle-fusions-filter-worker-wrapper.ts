import { Observable, fromEvent } from 'rxjs';
import { map, take, tap } from 'rxjs/operators';
import { Persona } from '../models/persona';

export class TriangleFusionsFilterWorkerWrapper {
  constructor(private fusions: Persona[][]) {}

  filter(selected: Persona[], nameFilters: string[]): Observable<Persona[]> {
    const worker = new Worker('../workers/triangle-fusions-filter.worker', {
      type: 'module',
    });
    worker.postMessage({
      fusions: this.fusions,
      selected,
      nameFilters,
    });
    return fromEvent(worker, 'message').pipe(
      map((e: MessageEvent) => e.data as Persona[]),
      take(1),
      tap(() => worker.terminate()),
    );
  }
}

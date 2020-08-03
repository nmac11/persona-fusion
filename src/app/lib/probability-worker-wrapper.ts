import { WorkerHandler } from './worker-handler';

export class ProbabilityWorkerWrapper {
  worker: Worker;

  constructor() {
    this.worker = new Worker('../workers/probability.worker', {
      type: 'module',
    });
    this.worker.onmessage = WorkerHandler.getInstance().msgHandler;
  }

  async calculate(data): Promise<any> {
    const result = await WorkerHandler.getInstance().msgSender(
      data,
      this.worker,
    );
    this.worker.terminate();
    return result;
  }
}

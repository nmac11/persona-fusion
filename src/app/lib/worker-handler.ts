interface ActivePromise {
  resolve: Function;
  reject: Function;
}

export class WorkerHandler {
  private activePromises: { [key: number]: ActivePromise } = {};
  private static instance: WorkerHandler;
  autoId = 0;
  resolves = {};

  static getInstance(): WorkerHandler {
    if (!WorkerHandler.instance) WorkerHandler.instance = new WorkerHandler();
    return WorkerHandler.instance;
  }

  msgSender = (payload, worker) => {
    const id = this.autoId++;
    const msg = { id, payload };
    return new Promise((resolve, reject) => {
      this.activePromises[id] = { resolve, reject };
      worker.postMessage(msg);
    });
  };

  msgHandler = (msg) => {
    const { id, err, payload } = msg.data;
    if (payload) {
      const resolve = this.activePromises[id].resolve;
      if (resolve) resolve(payload);
    } else {
      const reject = this.activePromises[id].reject;
      if (reject) reject(err || 'Got nothing');
    }
    delete this.activePromises[id];
  };
}

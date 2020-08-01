const resolves = {};
const rejects = {};
let globalMsgId = 0;

// Activate calculation in the worker, returning a promise
function sendMsg(payload, worker) {
  const msgId = globalMsgId++;
  const msg = {
    id: msgId,
    payload,
  };

  return new Promise(function (resolve, reject) {
    // save callbacks for later
    resolves[msgId] = resolve;
    rejects[msgId] = reject;
    worker.postMessage(msg);
  });
}

// Handle incoming calculation result
function handleMsg(msg) {
  const { id, err, payload } = msg.data;
  if (payload) {
    const resolve = resolves[id];
    if (resolve) {
      resolve(payload);
    }
  } else {
    // error condition
    const reject = rejects[id];
    if (reject) {
      if (err) {
        reject(err);
      } else {
        reject('Got nothing');
      }
    }
  }

  delete resolves[id];
  delete rejects[id];
}

export class ProbabilityWorkerWrapper {
  worker: any;

  constructor() {
    this.worker = new Worker('../workers/probability.worker', {
      type: 'module',
    });
    this.worker.onmessage = handleMsg;
  }

  async calculate(data): Promise<any> {
    const result = await sendMsg(data, this.worker);
    this.worker.terminate();
    return result;
  }
}

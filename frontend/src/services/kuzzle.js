import { backends } from '@/config';
import { Kuzzle, WebSocket } from 'kuzzle-sdk/dist/kuzzle';

let backendName = process.env.VUE_APP_BACKEND
  ? process.env.VUE_APP_BACKEND
  : 'local';

if (process.env.NODE_ENV === 'production') {
  // Define here which backend is to be used by the production build
}

const backend = backends[backendName] ? backends[backendName] : null;

if (!backend) {
  throw new Error(`Unable to find backend ${backendName}`);
}

if (!backend.host || !backend.options) {
  throw new Error(`Backend ${backendName} is malformed`);
}

const kuzzle = new Kuzzle(new WebSocket(backend.host, backend.options));

window.kuzzle = kuzzle;
export default kuzzle;

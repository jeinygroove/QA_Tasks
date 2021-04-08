import * as events from "events";

const dev = process.env.NODE_ENV !== 'production';

export const server = dev ? 'http://localhost:3000' : 'https://cdn.statically.io/gh/jeinygroove/jeinygroove.github.io/QA_Tasks/gh-pages/';

events.EventEmitter.prototype._maxListeners = 100;

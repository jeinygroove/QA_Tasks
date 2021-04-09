import * as events from "events";

const dev = process.env.NODE_ENV !== 'production';

export const server = dev ? 'http://localhost:3000' : process.env.DEV_ULR;


events.EventEmitter.prototype._maxListeners = 100;

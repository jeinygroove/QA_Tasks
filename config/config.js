import * as events from "events";

const dev = process.env.NODE_ENV !== 'production';

export const server = dev ? 'http://localhost:3000' : 'https://online-ru-library.herokuapp.com'


events.EventEmitter.prototype._maxListeners = 100;

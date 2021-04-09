import * as events from "events";

const dev = process.env.NODE_ENV !== 'production';

export const server = dev ? 'http://localhost:5000' : 'https://qa-course-task1-books.herokuapp.com'


events.EventEmitter.prototype._maxListeners = 100;

import * as events from "events";

const dev = process.env.NODE_ENV !== 'production';

export const server = dev ? 'http://localhost:3000' : 'https://olga-shim-blogr-nextjs-prisma.vercel.app/api/auth'


events.EventEmitter.prototype._maxListeners = 100;

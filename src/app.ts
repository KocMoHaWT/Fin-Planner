import * as express from 'express';
import { RequestHandler } from 'express';
import Server from './server';
import connection from './db';

const app = express();
const server = new Server(app, connection, 3000);

const controllers: [] = [
];

const globalMiddleware: Array<RequestHandler> = [
    express.urlencoded({ extended: false }),
    express.json(),
    // cors({ credentials: true, origin: true }),
];

Promise.resolve()
    .then(() => server.initDatabase())
    .then(() => {
        server.loadGlobalMiddleware(globalMiddleware);
        server.loadControllers(controllers)
        server.run();
    });
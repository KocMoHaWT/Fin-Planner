import * as express from 'express';
import { RequestHandler } from 'express';
import Server from './server';
import connection from './db';
import AuthRoutes from './chunks/auth';
import UserRouter from './chunks/user';

const app = express();
const server = new Server(app, connection, 3001);

const routes = [
    AuthRoutes,
    UserRouter
]

const globalMiddleware: Array<RequestHandler> = [
    express.urlencoded({ extended: false }),
    express.json(),
    // cors({ credentials: true, origin: true }),
];

Promise.resolve()
    .then(() => server.initDatabase())
    .then(() => {
        server.loadGlobalMiddleware(globalMiddleware);
        server.loadRoutes(routes)
        server.run();
    });
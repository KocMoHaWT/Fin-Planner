import * as express from 'express';
import { RequestHandler } from 'express';
import Server from './server';
import connection from './db';
import InjectableContainer from './application/InjectableContainer';
import autInit from './chunks/auth';
import userInit from './chunks/user';
import * as cookieParser from 'cookie-parser';

const routers = ['authRouter', 'userRouter'];

const app = express();
const server = new Server(app, connection, 3001);

const globalMiddleware: Array<RequestHandler> = [
    express.urlencoded({ extended: false }),
    // cors({ credentials: true, origin: true }),
    express.json(),
    express.static('public'),
    cookieParser(),
];

Promise.resolve()
    .then(() => server.initDatabase())
    .then(() => {
       Promise.all([ ...userInit, ...autInit])
    })
    .then(() => {
        server.loadGlobalMiddleware(globalMiddleware);
        InjectableContainer.initialise();
        server.loadRoutes(routers)
        server.run();
    });

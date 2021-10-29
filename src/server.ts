import { Application, RequestHandler } from 'express';
import * as http from 'http';
import InjectableContainer from './application/InjectableContainer';

export default class Server {
    private app: Application;
    private readonly port: number;
    private connection;

    constructor(app: Application, connection: any, port: number) {
        this.app = app;
        this.port = port;
        this.connection = connection;
    };

    public run(): http.Server {
        return this.app.listen(this.port, () => {
            console.log(`Up and running on port ${this.port}`)
        });
    };

    public loadGlobalMiddleware(middleware: Array<RequestHandler>): void {
        // global stuff like cors, body-parser, etc
        middleware.forEach(mw => {
            this.app.use(mw);
        });
    };

    public loadRoutes(routes: Array<any>): void {
        routes.forEach(route => {
            this.app.use(InjectableContainer.getDepency(route).path, InjectableContainer.getDepency(route).configureRoutes());
        });
    };

    public async initDatabase(): Promise<void> {
       return this.connection;
    }
}
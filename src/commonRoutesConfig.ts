import * as express from 'express';

export abstract class CommonRoutesConfig {
    router: express.Router;
    name: string;
    comonPath?: string;

    constructor(router: express.Router, name: string, commonPath: string) {
        this.router = router;
        this.name = name;
        this.comonPath = commonPath;
    }

    get path() {
        return this.comonPath;
    } 
    
    getName() {
        return this.name;
    }

    abstract configureRoutes(): express.Router
}
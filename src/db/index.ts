import {createConnection, Connection} from "typeorm";
import envs from '../config';

export default createConnection({
    type: "postgres",
    host: envs.host,
    port: envs.port,
    username: envs.user,
    password: envs.password,
    database: envs.database,
    "ssl": {
      "rejectUnauthorized": false
    },
    entities: ["./src/models/*.ts"],
    synchronize: true,
    logging: true
});
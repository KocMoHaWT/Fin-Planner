const envs = require('./src/config');
module.exports = {
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
  logging: true,
    seeds: ['./src/seeds/**/*{.ts,.js}'],
}
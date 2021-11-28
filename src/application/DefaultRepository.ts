import { getConnection, getManager } from "typeorm";

export default class DefaultRepository {
    async getRunner() {
        const connection = getConnection();
        const queryRunner = await connection.createQueryRunner();
        console.log('qew', queryRunner.connection);
        return queryRunner;
    }

    async startTransaction(queryRunner: any) {
        await queryRunner.startTransaction();
    }

    async commitTransaction(queryRunner: any) {
        await queryRunner.commitTransaction();
    }

    async rollbackTransaction(queryRunner: any) {
        await queryRunner.revertTransaction();
    }
}
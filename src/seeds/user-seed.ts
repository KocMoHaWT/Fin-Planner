import { Factory, Seeder } from 'typeorm-seeding'
import { Connection } from 'typeorm'
import { BucketType } from '../models/bucketType'
 
export default class CreateBucketTypes implements Seeder {
  public async run(factory: Factory, connection: Connection): Promise<any> {
    await connection
      .createQueryBuilder()
      .insert()
      .into(BucketType)
      .values([
        { title: 'Strict Bucket', strict: true, planned: true },
        { title: 'Nonstritct Bucket', strict: false, planned: true },
        { title: 'Regular Bucket', regular: true, planned: true },
        { title: 'Planned Bucket', planned: true },
        { title: 'Leftover Bucket', leftover: true },
      ])
      .execute()
  }
}
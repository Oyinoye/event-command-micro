import { KafkaEntity } from './../domain/kafka.entity';
import { EntityRepository, Repository } from 'typeorm';

@EntityRepository(KafkaEntity)
export class KafkaRepository extends Repository<KafkaEntity> {}

import { EntityRepository, Repository } from 'typeorm';
import { EventCommandEntity } from '../domain/event-command.entity';

@EntityRepository(EventCommandEntity)
export class EventCommandEntityRepository extends Repository<EventCommandEntity> {}

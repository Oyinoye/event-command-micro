import { EntityRepository, Repository } from 'typeorm';
import { EventCommandEntity } from '../domain/event-command.entity';

@EntityRepository(EventCommandEntity)
export class EventCommandRepository extends Repository<EventCommandEntity> {}

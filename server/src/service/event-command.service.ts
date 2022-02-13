import { Injectable, HttpException, HttpStatus, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindManyOptions, FindOneOptions } from 'typeorm';
import { EventCommandDTO } from '../service/dto/event-command.dto';
import { EventCommandMapper } from '../service/mapper/event-command.mapper';
import { EventCommandEntityRepository } from '../repository/event-command.repository';

const relationshipNames = [];

@Injectable()
export class EventCommandService {
    logger = new Logger('EventCommandService');

    constructor(
        @InjectRepository(EventCommandEntityRepository) private eventCommandEntityRepository: EventCommandEntityRepository,
    ) {}

    async findById(id: number): Promise<EventCommandDTO | undefined> {
        const options = { relations: relationshipNames };
        const result = await this.eventCommandEntityRepository.findOne(id, options);
        return EventCommandMapper.fromEntityToDTO(result);
    }

    async findByFields(options: FindOneOptions<EventCommandDTO>): Promise<EventCommandDTO | undefined> {
        const result = await this.eventCommandEntityRepository.findOne(options);
        return EventCommandMapper.fromEntityToDTO(result);
    }

    async findAndCount(options: FindManyOptions<EventCommandDTO>): Promise<[EventCommandDTO[], number]> {
        options.relations = relationshipNames;
        const resultList = await this.eventCommandEntityRepository.findAndCount(options);
        const eventCommandEntityDTO: EventCommandDTO[] = [];
        if (resultList && resultList[0]) {
            resultList[0].forEach(eventCommandEntity =>
                eventCommandEntityDTO.push(EventCommandMapper.fromEntityToDTO(eventCommandEntity)),
            );
            resultList[0] = eventCommandEntityDTO;
        }
        return resultList;
    }

    async save(eventCommandEntityDTO: EventCommandDTO, creator?: string): Promise<EventCommandDTO | undefined> {
        const entity = EventCommandMapper.fromDTOtoEntity(eventCommandEntityDTO);
        if (creator) {
            if (!entity.createdBy) {
                entity.createdBy = creator;
            }
            entity.lastModifiedBy = creator;
        }
        const result = await this.eventCommandEntityRepository.save(entity);
        return EventCommandMapper.fromEntityToDTO(result);
    }

    async update(eventCommandEntityDTO: EventCommandDTO, updater?: string): Promise<EventCommandDTO | undefined> {
        const entity = EventCommandMapper.fromDTOtoEntity(eventCommandEntityDTO);
        if (updater) {
            entity.lastModifiedBy = updater;
        }
        const result = await this.eventCommandEntityRepository.save(entity);
        return EventCommandMapper.fromEntityToDTO(result);
    }

    async deleteById(id: number): Promise<void | undefined> {
        await this.eventCommandEntityRepository.delete(id);
        const entityFind = await this.findById(id);
        if (entityFind) {
            throw new HttpException('Error, entity not deleted!', HttpStatus.NOT_FOUND);
        }
        return;
    }
}

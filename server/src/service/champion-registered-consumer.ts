import { EventCommandEntityRepository } from '../repository/event-command.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { ModuleRef } from '@nestjs/core';
import { Repository, getRepository } from 'typeorm';
import { KafkaEntity } from '../domain/kafka.entity';

import { EventCommandService } from './event-command.service';
import { EventCommandEntity } from '../domain/event-command.entity';
import { EventCommandDTO } from './dto/event-command.dto';
import { ConsumerService } from './consumer.service';

import { Injectable, OnModuleInit, forwardRef, Inject } from '@nestjs/common';
import { EventCommandMapper } from './mapper/event-command.mapper';
import { getManager } from "typeorm";



@Injectable()
export class ChampionRegisteredConsumer implements OnModuleInit {
    private eventCommandEntityService: EventCommandService;
    constructor( 
        private moduleRef: ModuleRef,
        @Inject(forwardRef(() => ConsumerService))
        private consumerService: ConsumerService,

        @InjectRepository(EventCommandEntityRepository) private eventCommandEntityRepository: EventCommandEntityRepository,
        // private EventCommandEntityRepository: EventCommandEntityRepository,
        ) {}

    // const manager = getManager();

    async onModuleInit() {
        const manager = getManager();
        const connection = manager.connection;
        const repository = connection.getRepository(EventCommandEntity)
        const eventCommandEntityDTO = new EventCommandDTO();
        this.eventCommandEntityService = await this.moduleRef.resolve(EventCommandService)
        await this.consumerService.consume({ topic: 'ChampionStateChanged' }, {
            eachMessage: async ({ topic, partition, message}) => {
                // const created = await this.eventCommandEntityService.save({});
                console.log({
                    value: message.value.toString(),
                    topic: topic.toString(),
                    partition: partition.toString(),
                });
               
                const saved_message = JSON.parse(message.value.toString())
                eventCommandEntityDTO.championID = saved_message["championID"];
                eventCommandEntityDTO.eventDateTime = saved_message["lastModifiedDate"];
                eventCommandEntityDTO.event = saved_message["status"];
                eventCommandEntityDTO.eventPayload = JSON.stringify(saved_message);
                eventCommandEntityDTO.createdBy = saved_message["createdBy"];
                eventCommandEntityDTO.lastModifiedBy = saved_message["lastModifiedBy"];
                eventCommandEntityDTO.lastModifiedDate = saved_message["lastModifiedDate"];

                const created = await repository.save(eventCommandEntityDTO)
                console.log(created)
            }
        });

        
        
    }
  
}

// export class KafkaService {
//     constructor(
    //   @InjectRepository(KafkaEntity) private readonly kafkaRepository: Repository<KafkaEntity>,
//       @Inject("KAFKA_SERVICE") private client: ClientKafka
//     ) {
//     }

//     async emit(topic: string[], key: string, value: any) {
//       for (let i = 0; i < topic.length; i++) {
//         await this.client.emit(topic, {
//           key,
//           value: JSON.stringify(value)
//         });
//       }
//     }
  
//     async save(data: any) {
//       return this.kafkaRepository.save(data);
//     }
//   }


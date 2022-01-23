
import { EventCommandService } from './../event-command.service';
import { EventCommandEntity } from './../../domain/event-command.entity';
import { EventCommandDTO } from './../dto/event-command.dto';
import { ConsumerService } from '../consumer.service';

import { Injectable, OnModuleInit } from '@nestjs/common';


@Injectable()
export class ChampionRegisteredConsumer implements OnModuleInit {
    constructor( private readonly consumerService: ConsumerService,
        private readonly eventCommandEntityService: EventCommandService) {}

    async onModuleInit() {

        await this.consumerService.consume({ topic: 'ChampionStateChanged' }, {
            eachMessage: async ({ topic, partition, message}) => {
                console.log({
                    value: message.value.toString(),
                    topic: topic.toString(),
                    partition: partition.toString(),
                });
                // {
                //     championID: message.value["championID"],
                //     eventDateTime: message.value["lastModifiedDate"],
                //     eventPayload: message.value,
                //     event: message.value["status"],
                // }
                const eventCommandDTO = new EventCommandDTO();
                const saved_message = JSON.parse(message.value.toString())
                console.log(saved_message["championID"])
                console.log(saved_message["status"])
                eventCommandDTO.championID = saved_message["championID"];
                eventCommandDTO.eventDateTime = saved_message["lastModifiedDate"];
                eventCommandDTO.eventPayload = JSON.stringify(saved_message);
                eventCommandDTO.event = saved_message["status"];

                console.log(eventCommandDTO)
                // console.log(JSON.parse(eventCommandDTO))
                const created = await this.eventCommandEntityService.save(eventCommandDTO)
                
                // console.log(created)
                // console.log(JSON.parse(message.value.toString()))
            }
        })
    }
}


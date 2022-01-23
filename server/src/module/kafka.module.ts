import { EventCommandRepository } from './../repository/event-command.repository';
import { EventCommandModule } from './event-command.module';
import { EventCommandService } from './../service/event-command.service';
import { ChampionRegisteredConsumer } from './../service/kafka_consumers/champion-registered-consumer';
import { ConsumerService } from './../service/consumer.service';
import { ProducerService } from './../service/producer.service';
import { Module } from '@nestjs/common';

@Module({
    imports: [EventCommandModule],
    providers: [ProducerService, ConsumerService, ChampionRegisteredConsumer, EventCommandService, EventCommandRepository],
    exports: [ProducerService, ConsumerService],
})
export class KafkaModule {}
 
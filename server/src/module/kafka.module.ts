import { ChampionRegisteredConsumer } from './../service/kafka_consumers/champion-registered-consumer';
import { ConsumerService } from './../service/consumer.service';
import { ProducerService } from './../service/producer.service';
import { Module } from '@nestjs/common';

@Module({
    providers: [ProducerService, ConsumerService, ChampionRegisteredConsumer],
    exports: [ProducerService, ConsumerService],
})
export class KafkaModule {}
 
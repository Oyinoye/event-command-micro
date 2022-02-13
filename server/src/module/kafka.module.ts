import { EventCommandEntity } from './../domain/event-command.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { KafkaEntity } from './../domain/kafka.entity';
import { ClientsModule, Transport } from "@nestjs/microservices";
import { EventCommandEntityRepository } from './../repository/event-command.repository';
import { EventCommandModule } from './event-command.module';
import { EventCommandService } from './../service/event-command.service';
import { ChampionRegisteredConsumer } from '../service/champion-registered-consumer';
import { ConsumerService } from './../service/consumer.service';
import { ProducerService } from './../service/producer.service';
import { Module } from '@nestjs/common';

const { KAFKA_USERNAME: username, KAFKA_PASSWORD: password } = process.env
const sasl = username && password ? { username, password, mechanism: 'plain' } : null
const ssl = !!sasl

@Module({
    imports: [
        //added
        TypeOrmModule.forFeature([EventCommandEntityRepository]),
        // ClientsModule.register([
        // {
        //     name: "KAFKA_SERVICE",
        //     transport: Transport.KAFKA,
        //     options: {
        //     client: {
        //         brokers: [process.env.KAFKA_BOOTSTRAP_SERVER],
        //         ssl: true,
        //         sasl: {
        //         mechanism: "plain",
        //         username,
        //         password
        //         }
        //     }
        //     }
        // }
        // ]),

    //ended
        
        EventCommandModule],
    providers: [ProducerService, ConsumerService, ChampionRegisteredConsumer, EventCommandService, EventCommandEntityRepository],
    exports: [ProducerService, ConsumerService],
})
export class KafkaModule {}
 
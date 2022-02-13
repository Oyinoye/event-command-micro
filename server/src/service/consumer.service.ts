import { EventCommandEntity } from './../domain/event-command.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from "typeorm";
import { Injectable, OnApplicationShutdown } from "@nestjs/common";
import { Kafka, Consumer, ConsumerRunConfig, ConsumerSubscribeTopic } from "kafkajs";

const { KAFKA_USERNAME: username, KAFKA_PASSWORD: password } = process.env
const sasl = username && password ? { username, password, mechanism: 'plain' } : null
const ssl = !!sasl

@Injectable()
export class ConsumerService implements OnApplicationShutdown {
    constructor(

        @InjectRepository(EventCommandEntity) private eventCommandEntity: Repository<EventCommandEntity>
    ) {}

    private readonly kafka = new Kafka({
        clientId: 'event-command-kafka',
        brokers: [process.env.KAFKA_BOOTSTRAP_SERVER], // change this to brokers: [process.env.KAFKA_BOOTSTRAP_SERVER],     ssl, sasl
        ssl,
        sasl: {
            mechanism: 'plain',
            username,
            password
        }
    });
    private readonly consumers: Consumer[] = [];
 
    async consume(topic: ConsumerSubscribeTopic, config: ConsumerRunConfig) {
        const consumer = this.kafka.consumer({ groupId: 'event-command'});
        await consumer.connect();
        await consumer.subscribe(topic);
        await consumer.run(config);
        this.consumers.push(consumer)
    }

    async save(data: any) {
        return this.eventCommandEntity.save(data);
      }

    async onApplicationShutdown() {
        for (const consumer of this.consumers) {
            await consumer.disconnect();
        }
    }
}[]
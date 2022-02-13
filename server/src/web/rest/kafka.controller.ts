import { EventCommandService } from './../../service/event-command.service';


import { Controller } from "@nestjs/common";
import { MessagePattern, Payload } from "@nestjs/microservices";
import { KafkaMessage } from "kafkajs";
import { ConsumerService } from 'src/service/consumer.service';

@Controller()
export class KafkaController {

  constructor(
    private eventcommandService: EventCommandService,
    private kafkaService: ConsumerService,
  ) {
  }

  @MessagePattern("ChampionStateChanged")
  async event(@Payload() message: KafkaMessage) {
    try {
      await this[message.key.toString()](message.value);
    } catch (e) {
      await this.kafkaService.save({
        key: message.key.toString(),
        value: message.value,
        error: e.message
      });
    }
  }

  async eventCreated(data: any) {
    await this.eventcommandService.save(data);
  }

  async eventUpdated(data: any) {
    await this.eventcommandService.update(data.id, data);
  }



//   async linkCreated(data: any) {
//     await this.linkService.save(data);
//   }
}

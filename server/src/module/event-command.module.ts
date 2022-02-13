import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EventCommandController } from '../web/rest/event-command.controller';
import { EventCommandEntityRepository } from '../repository/event-command.repository';
import { EventCommandService } from '../service/event-command.service';

@Module({
    imports: [TypeOrmModule.forFeature([EventCommandEntityRepository])],
    controllers: [EventCommandController],
    providers: [EventCommandService],
    exports: [EventCommandService],
})
export class EventCommandModule {}

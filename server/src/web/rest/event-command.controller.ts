import {
    Body,
    ClassSerializerInterceptor,
    Controller,
    Delete,
    Get,
    Logger,
    Param,
    Post as PostMethod,
    Put,
    UseGuards,
    Req,
    UseInterceptors,
} from '@nestjs/common';
import { ApiBearerAuth, ApiUseTags, ApiResponse, ApiOperation } from '@nestjs/swagger';
import { EventCommandDTO } from '../../service/dto/event-command.dto';
import { EventCommandService } from '../../service/event-command.service';
import { PageRequest, Page } from '../../domain/base/pagination.entity';
import { AuthGuard, Roles, RolesGuard, RoleType } from '../../security';
import { HeaderUtil } from '../../client/header-util';
import { Request } from '../../client/request';
import { LoggingInterceptor } from '../../client/interceptors/logging.interceptor';

@Controller('api/event-commands')
@UseGuards(AuthGuard, RolesGuard)
@UseInterceptors(LoggingInterceptor, ClassSerializerInterceptor)
@ApiBearerAuth()
@ApiUseTags('event-commands')
export class EventCommandController {
    logger = new Logger('EventCommandController');

    constructor(private readonly eventCommandEntityService: EventCommandService) {}

    @Get('/')
    @Roles(RoleType.USER)
    @ApiResponse({
        status: 200,
        description: 'List all records',
        type: EventCommandDTO,
    })
    async getAll(@Req() req: Request): Promise<EventCommandDTO[]> {
        const pageRequest: PageRequest = new PageRequest(req.query.page, req.query.size, req.query.sort);
        const [results, count] = await this.eventCommandEntityService.findAndCount({
            skip: +pageRequest.page * pageRequest.size,
            take: +pageRequest.size,
            order: pageRequest.sort.asOrder(),
        });
        HeaderUtil.addPaginationHeaders(req.res, new Page(results, count, pageRequest));
        return results;
    }

    @Get('/:id')
    @Roles(RoleType.USER)
    @ApiResponse({
        status: 200,
        description: 'The found record',
        type: EventCommandDTO,
    })
    async getOne(@Param('id') id: number): Promise<EventCommandDTO> {
        return await this.eventCommandEntityService.findById(id);
    }

    @PostMethod('/')
    @Roles(RoleType.ADMIN)
    @ApiOperation({ title: 'Create eventCommandEntity' })
    @ApiResponse({
        status: 201,
        description: 'The record has been successfully created.',
        type: EventCommandDTO,
    })
    @ApiResponse({ status: 403, description: 'Forbidden.' })
    async post(@Req() req: Request, @Body() eventCommandEntityDTO: EventCommandDTO): Promise<EventCommandDTO> {
        const created = await this.eventCommandEntityService.save(eventCommandEntityDTO, req.user?.login);
        HeaderUtil.addEntityCreatedHeaders(req.res, 'EventCommand', created.id);
        return created;
    }

    @Put('/')
    @Roles(RoleType.ADMIN)
    @ApiOperation({ title: 'Update eventCommandEntity' })
    @ApiResponse({
        status: 200,
        description: 'The record has been successfully updated.',
        type: EventCommandDTO,
    })
    async put(@Req() req: Request, @Body() eventCommandEntityDTO: EventCommandDTO): Promise<EventCommandDTO> {
        HeaderUtil.addEntityCreatedHeaders(req.res, 'EventCommand', eventCommandEntityDTO.id);
        return await this.eventCommandEntityService.update(eventCommandEntityDTO, req.user?.login);
    }

    @Put('/:id')
    @Roles(RoleType.ADMIN)
    @ApiOperation({ title: 'Update eventCommandEntity with id' })
    @ApiResponse({
        status: 200,
        description: 'The record has been successfully updated.',
        type: EventCommandDTO,
    })
    async putId(@Req() req: Request, @Body() eventCommandEntityDTO: EventCommandDTO): Promise<EventCommandDTO> {
        HeaderUtil.addEntityCreatedHeaders(req.res, 'EventCommand', eventCommandEntityDTO.id);
        return await this.eventCommandEntityService.update(eventCommandEntityDTO, req.user?.login);
    }

    @Delete('/:id')
    @Roles(RoleType.ADMIN)
    @ApiOperation({ title: 'Delete eventCommandEntity' })
    @ApiResponse({
        status: 204,
        description: 'The record has been successfully deleted.',
    })
    async deleteById(@Req() req: Request, @Param('id') id: number): Promise<void> {
        HeaderUtil.addEntityDeletedHeaders(req.res, 'EventCommand', id);
        return await this.eventCommandEntityService.deleteById(id);
    }
}

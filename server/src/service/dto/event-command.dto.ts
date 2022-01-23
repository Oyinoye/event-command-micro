/* eslint-disable @typescript-eslint/no-unused-vars */
import { ApiModelProperty } from '@nestjs/swagger';
import { BaseDTO } from './base.dto';

import { MaxEvent } from '../../domain/enumeration/max-event';

/**
 * A EventCommandDTO object.
 */
export class EventCommandDTO extends BaseDTO {
    @ApiModelProperty({ description: 'championID field', required: false })
    championID: string;

    @ApiModelProperty({ description: 'eventDateTime field', required: false })
    eventDateTime: string;

    @ApiModelProperty({ description: 'eventPayload field', required: false })
    eventPayload: string;

    @ApiModelProperty({ enum: MaxEvent, description: 'event enum field', required: false })
    event: MaxEvent;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
}
1
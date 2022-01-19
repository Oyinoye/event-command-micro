/* eslint-disable @typescript-eslint/no-unused-vars */
import { Entity, Column, JoinColumn, OneToOne, ManyToOne, OneToMany, ManyToMany, JoinTable } from 'typeorm';
import { BaseEntity } from './base/base.entity';

import { MaxEvent } from './enumeration/max-event';

/**
 * Champion
 */
@Entity('event_command')
export class EventCommandEntity extends BaseEntity {
    @Column({ name: 'champion_id', nullable: true })
    championID: string;

    @Column({ name: 'event_date_time', nullable: true })
    eventDateTime: string;

    @Column({ name: 'event_payload', nullable: true })
    eventPayload: string;

    @Column({ type: 'simple-enum', name: 'event', enum: MaxEvent })
    event: MaxEvent;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
}

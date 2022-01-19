import { EventCommandEntity } from '../../domain/event-command.entity';
import { EventCommandDTO } from '../dto/event-command.dto';

/**
 * A EventCommand mapper object.
 */
export class EventCommandMapper {
    static fromDTOtoEntity(entityDTO: EventCommandDTO): EventCommandEntity {
        if (!entityDTO) {
            return;
        }
        const entity = new EventCommandEntity();
        const fields = Object.getOwnPropertyNames(entityDTO);
        fields.forEach(field => {
            entity[field] = entityDTO[field];
        });
        return entity;
    }

    static fromEntityToDTO(entity: EventCommandEntity): EventCommandDTO {
        if (!entity) {
            return;
        }
        const entityDTO = new EventCommandDTO();

        const fields = Object.getOwnPropertyNames(entity);

        fields.forEach(field => {
            entityDTO[field] = entity[field];
        });

        return entityDTO;
    }
}

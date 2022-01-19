import { MaxEvent } from 'app/shared/model/enumerations/max-event.model';

export interface IEventCommand {
  id?: number;
  championID?: string | null;
  eventDateTime?: string | null;
  eventPayload?: string | null;
  event?: MaxEvent | null;
}

export const defaultValue: Readonly<IEventCommand> = {};

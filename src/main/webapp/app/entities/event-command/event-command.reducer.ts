import axios from 'axios';
import { ICrudGetAction, ICrudGetAllAction, ICrudPutAction, ICrudDeleteAction } from 'react-jhipster';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';

import { IEventCommand, defaultValue } from 'app/shared/model/event-command.model';

export const ACTION_TYPES = {
  FETCH_EVENTCOMMAND_LIST: 'eventCommand/FETCH_EVENTCOMMAND_LIST',
  FETCH_EVENTCOMMAND: 'eventCommand/FETCH_EVENTCOMMAND',
  CREATE_EVENTCOMMAND: 'eventCommand/CREATE_EVENTCOMMAND',
  UPDATE_EVENTCOMMAND: 'eventCommand/UPDATE_EVENTCOMMAND',
  PARTIAL_UPDATE_EVENTCOMMAND: 'eventCommand/PARTIAL_UPDATE_EVENTCOMMAND',
  DELETE_EVENTCOMMAND: 'eventCommand/DELETE_EVENTCOMMAND',
  RESET: 'eventCommand/RESET',
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<IEventCommand>,
  entity: defaultValue,
  updating: false,
  updateSuccess: false,
};

export type EventCommandState = Readonly<typeof initialState>;

// Reducer

export default (state: EventCommandState = initialState, action): EventCommandState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.FETCH_EVENTCOMMAND_LIST):
    case REQUEST(ACTION_TYPES.FETCH_EVENTCOMMAND):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true,
      };
    case REQUEST(ACTION_TYPES.CREATE_EVENTCOMMAND):
    case REQUEST(ACTION_TYPES.UPDATE_EVENTCOMMAND):
    case REQUEST(ACTION_TYPES.DELETE_EVENTCOMMAND):
    case REQUEST(ACTION_TYPES.PARTIAL_UPDATE_EVENTCOMMAND):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true,
      };
    case FAILURE(ACTION_TYPES.FETCH_EVENTCOMMAND_LIST):
    case FAILURE(ACTION_TYPES.FETCH_EVENTCOMMAND):
    case FAILURE(ACTION_TYPES.CREATE_EVENTCOMMAND):
    case FAILURE(ACTION_TYPES.UPDATE_EVENTCOMMAND):
    case FAILURE(ACTION_TYPES.PARTIAL_UPDATE_EVENTCOMMAND):
    case FAILURE(ACTION_TYPES.DELETE_EVENTCOMMAND):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload,
      };
    case SUCCESS(ACTION_TYPES.FETCH_EVENTCOMMAND_LIST):
      return {
        ...state,
        loading: false,
        entities: action.payload.data,
      };
    case SUCCESS(ACTION_TYPES.FETCH_EVENTCOMMAND):
      return {
        ...state,
        loading: false,
        entity: action.payload.data,
      };
    case SUCCESS(ACTION_TYPES.CREATE_EVENTCOMMAND):
    case SUCCESS(ACTION_TYPES.UPDATE_EVENTCOMMAND):
    case SUCCESS(ACTION_TYPES.PARTIAL_UPDATE_EVENTCOMMAND):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data,
      };
    case SUCCESS(ACTION_TYPES.DELETE_EVENTCOMMAND):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: {},
      };
    case ACTION_TYPES.RESET:
      return {
        ...initialState,
      };
    default:
      return state;
  }
};

const apiUrl = 'api/event-commands';

// Actions

export const getEntities: ICrudGetAllAction<IEventCommand> = (page, size, sort) => ({
  type: ACTION_TYPES.FETCH_EVENTCOMMAND_LIST,
  payload: axios.get<IEventCommand>(`${apiUrl}?cacheBuster=${new Date().getTime()}`),
});

export const getEntity: ICrudGetAction<IEventCommand> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_EVENTCOMMAND,
    payload: axios.get<IEventCommand>(requestUrl),
  };
};

export const createEntity: ICrudPutAction<IEventCommand> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_EVENTCOMMAND,
    payload: axios.post(apiUrl, cleanEntity(entity)),
  });
  dispatch(getEntities());
  return result;
};

export const updateEntity: ICrudPutAction<IEventCommand> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_EVENTCOMMAND,
    payload: axios.put(`${apiUrl}/${entity.id}`, cleanEntity(entity)),
  });
  return result;
};

export const partialUpdate: ICrudPutAction<IEventCommand> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.PARTIAL_UPDATE_EVENTCOMMAND,
    payload: axios.patch(`${apiUrl}/${entity.id}`, cleanEntity(entity)),
  });
  return result;
};

export const deleteEntity: ICrudDeleteAction<IEventCommand> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_EVENTCOMMAND,
    payload: axios.delete(requestUrl),
  });
  dispatch(getEntities());
  return result;
};

export const reset = () => ({
  type: ACTION_TYPES.RESET,
});

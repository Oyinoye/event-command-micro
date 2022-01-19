import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, Label } from 'reactstrap';
import { AvFeedback, AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
import { Translate, translate } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import { getEntity, updateEntity, createEntity, reset } from './event-command.reducer';
import { IEventCommand } from 'app/shared/model/event-command.model';
import { convertDateTimeFromServer, convertDateTimeToServer, displayDefaultDateTime } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface IEventCommandUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const EventCommandUpdate = (props: IEventCommandUpdateProps) => {
  const [isNew] = useState(!props.match.params || !props.match.params.id);

  const { eventCommandEntity, loading, updating } = props;

  const handleClose = () => {
    props.history.push('/event-command');
  };

  useEffect(() => {
    if (isNew) {
      props.reset();
    } else {
      props.getEntity(props.match.params.id);
    }
  }, []);

  useEffect(() => {
    if (props.updateSuccess) {
      handleClose();
    }
  }, [props.updateSuccess]);

  const saveEntity = (event, errors, values) => {
    if (errors.length === 0) {
      const entity = {
        ...eventCommandEntity,
        ...values,
      };

      if (isNew) {
        props.createEntity(entity);
      } else {
        props.updateEntity(entity);
      }
    }
  };

  return (
    <div>
      <Row className="justify-content-center">
        <Col md="8">
          <h2 id="maxeventApp.eventCommand.home.createOrEditLabel" data-cy="EventCommandCreateUpdateHeading">
            <Translate contentKey="maxeventApp.eventCommand.home.createOrEditLabel">Create or edit a EventCommand</Translate>
          </h2>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col md="8">
          {loading ? (
            <p>Loading...</p>
          ) : (
            <AvForm model={isNew ? {} : eventCommandEntity} onSubmit={saveEntity}>
              {!isNew ? (
                <AvGroup>
                  <Label for="event-command-id">
                    <Translate contentKey="global.field.id">ID</Translate>
                  </Label>
                  <AvInput id="event-command-id" type="text" className="form-control" name="id" required readOnly />
                </AvGroup>
              ) : null}
              <AvGroup>
                <Label id="championIDLabel" for="event-command-championID">
                  <Translate contentKey="maxeventApp.eventCommand.championID">Champion ID</Translate>
                </Label>
                <AvField id="event-command-championID" data-cy="championID" type="text" name="championID" />
              </AvGroup>
              <AvGroup>
                <Label id="eventDateTimeLabel" for="event-command-eventDateTime">
                  <Translate contentKey="maxeventApp.eventCommand.eventDateTime">Event Date Time</Translate>
                </Label>
                <AvField id="event-command-eventDateTime" data-cy="eventDateTime" type="text" name="eventDateTime" />
              </AvGroup>
              <AvGroup>
                <Label id="eventPayloadLabel" for="event-command-eventPayload">
                  <Translate contentKey="maxeventApp.eventCommand.eventPayload">Event Payload</Translate>
                </Label>
                <AvField id="event-command-eventPayload" data-cy="eventPayload" type="text" name="eventPayload" />
              </AvGroup>
              <AvGroup>
                <Label id="eventLabel" for="event-command-event">
                  <Translate contentKey="maxeventApp.eventCommand.event">Event</Translate>
                </Label>
                <AvInput
                  id="event-command-event"
                  data-cy="event"
                  type="select"
                  className="form-control"
                  name="event"
                  value={(!isNew && eventCommandEntity.event) || 'ProspectSecured'}
                >
                  <option value="ProspectSecured">{translate('maxeventApp.MaxEvent.ProspectSecured')}</option>
                  <option value="TestScheduled">{translate('maxeventApp.MaxEvent.TestScheduled')}</option>
                  <option value="TestPassed">{translate('maxeventApp.MaxEvent.TestPassed')}</option>
                  <option value="TestFailed">{translate('maxeventApp.MaxEvent.TestFailed')}</option>
                  <option value="CreditRated">{translate('maxeventApp.MaxEvent.CreditRated')}</option>
                  <option value="GuarantorReturned">{translate('maxeventApp.MaxEvent.GuarantorReturned')}</option>
                  <option value="Activated">{translate('maxeventApp.MaxEvent.Activated')}</option>
                  <option value="VehicleAssigned">{translate('maxeventApp.MaxEvent.VehicleAssigned')}</option>
                  <option value="ContractEntered">{translate('maxeventApp.MaxEvent.ContractEntered')}</option>
                  <option value="Churned">{translate('maxeventApp.MaxEvent.Churned')}</option>
                  <option value="Deactivated">{translate('maxeventApp.MaxEvent.Deactivated')}</option>
                  <option value="HPExited">{translate('maxeventApp.MaxEvent.HPExited')}</option>
                </AvInput>
              </AvGroup>
              <Button tag={Link} id="cancel-save" to="/event-command" replace color="info">
                <FontAwesomeIcon icon="arrow-left" />
                &nbsp;
                <span className="d-none d-md-inline">
                  <Translate contentKey="entity.action.back">Back</Translate>
                </span>
              </Button>
              &nbsp;
              <Button color="primary" id="save-entity" data-cy="entityCreateSaveButton" type="submit" disabled={updating}>
                <FontAwesomeIcon icon="save" />
                &nbsp;
                <Translate contentKey="entity.action.save">Save</Translate>
              </Button>
            </AvForm>
          )}
        </Col>
      </Row>
    </div>
  );
};

const mapStateToProps = (storeState: IRootState) => ({
  eventCommandEntity: storeState.eventCommand.entity,
  loading: storeState.eventCommand.loading,
  updating: storeState.eventCommand.updating,
  updateSuccess: storeState.eventCommand.updateSuccess,
});

const mapDispatchToProps = {
  getEntity,
  updateEntity,
  createEntity,
  reset,
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(EventCommandUpdate);

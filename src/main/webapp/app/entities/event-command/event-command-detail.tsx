import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { Translate } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './event-command.reducer';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IEventCommandDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const EventCommandDetail = (props: IEventCommandDetailProps) => {
  useEffect(() => {
    props.getEntity(props.match.params.id);
  }, []);

  const { eventCommandEntity } = props;
  return (
    <Row>
      <Col md="8">
        <h2 data-cy="eventCommandDetailsHeading">
          <Translate contentKey="maxeventApp.eventCommand.detail.title">EventCommand</Translate>
        </h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="id">
              <Translate contentKey="global.field.id">ID</Translate>
            </span>
          </dt>
          <dd>{eventCommandEntity.id}</dd>
          <dt>
            <span id="championID">
              <Translate contentKey="maxeventApp.eventCommand.championID">Champion ID</Translate>
            </span>
          </dt>
          <dd>{eventCommandEntity.championID}</dd>
          <dt>
            <span id="eventDateTime">
              <Translate contentKey="maxeventApp.eventCommand.eventDateTime">Event Date Time</Translate>
            </span>
          </dt>
          <dd>{eventCommandEntity.eventDateTime}</dd>
          <dt>
            <span id="eventPayload">
              <Translate contentKey="maxeventApp.eventCommand.eventPayload">Event Payload</Translate>
            </span>
          </dt>
          <dd>{eventCommandEntity.eventPayload}</dd>
          <dt>
            <span id="event">
              <Translate contentKey="maxeventApp.eventCommand.event">Event</Translate>
            </span>
          </dt>
          <dd>{eventCommandEntity.event}</dd>
        </dl>
        <Button tag={Link} to="/event-command" replace color="info" data-cy="entityDetailsBackButton">
          <FontAwesomeIcon icon="arrow-left" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.back">Back</Translate>
          </span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/event-command/${eventCommandEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.edit">Edit</Translate>
          </span>
        </Button>
      </Col>
    </Row>
  );
};

const mapStateToProps = ({ eventCommand }: IRootState) => ({
  eventCommandEntity: eventCommand.entity,
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(EventCommandDetail);

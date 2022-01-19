// removed th id primary key
import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Col, Row, Table } from 'reactstrap';
import { Translate } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntities } from './event-command.reducer';
import { IEventCommand } from 'app/shared/model/event-command.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IEventCommandProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}

export const EventCommand = (props: IEventCommandProps) => {
  useEffect(() => {
    props.getEntities();
  }, []);

  const handleSyncList = () => {
    props.getEntities();
  };

  const { eventCommandList, match, loading } = props;
  return (
    <div>
      <h2 id="event-command-heading" data-cy="EventCommandHeading">
        <Translate contentKey="maxeventApp.eventCommand.home.title">Event Commands</Translate>
        <div className="d-flex justify-content-end">
          <Button className="mr-2" color="info" onClick={handleSyncList} disabled={loading}>
            <FontAwesomeIcon icon="sync" spin={loading} />{' '}
            <Translate contentKey="maxeventApp.eventCommand.home.refreshListLabel">Refresh List</Translate>
          </Button>
          <Link to={`${match.url}/new`} className="btn btn-primary jh-create-entity" id="jh-create-entity" data-cy="entityCreateButton">
            <FontAwesomeIcon icon="plus" />
            &nbsp;
            <Translate contentKey="maxeventApp.eventCommand.home.createLabel">Create new Event Command</Translate>
          </Link>
        </div>
      </h2>
      <div className="table-responsive">
        {eventCommandList && eventCommandList.length > 0 ? (
          <Table responsive>
            <thead>
              <tr>
                <th>
                  <Translate contentKey="maxeventApp.eventCommand.id">ID</Translate>
                </th>
                <th>
                  <Translate contentKey="maxeventApp.eventCommand.championID">Champion ID</Translate>
                </th>
                <th>
                  <Translate contentKey="maxeventApp.eventCommand.eventDateTime">Event Date Time</Translate>
                </th>
                <th>
                  <Translate contentKey="maxeventApp.eventCommand.eventPayload">Event Payload</Translate>
                </th>
                <th>
                  <Translate contentKey="maxeventApp.eventCommand.event">Event</Translate>
                </th>
                <th />
              </tr>
            </thead>
            <tbody>
              {eventCommandList.map((eventCommand, i) => (
                <tr key={`entity-${i}`} data-cy="entityTable">
                  <td>
                    <Button tag={Link} to={`${match.url}/${eventCommand.id}`} color="link" size="sm">
                      {eventCommand.id}
                    </Button>
                  </td>
                  <td>{eventCommand.championID}</td>
                  <td>{eventCommand.eventDateTime}</td>
                  <td>{eventCommand.eventPayload}</td>
                  <td>
                    <Translate contentKey={`maxeventApp.MaxEvent.${eventCommand.event}`} />
                  </td>
                  <td className="text-right">
                    <div className="btn-group flex-btn-group-container">
                      <Button tag={Link} to={`${match.url}/${eventCommand.id}`} color="info" size="sm" data-cy="entityDetailsButton">
                        <FontAwesomeIcon icon="eye" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.view">View</Translate>
                        </span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${eventCommand.id}/edit`} color="primary" size="sm" data-cy="entityEditButton">
                        <FontAwesomeIcon icon="pencil-alt" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.edit">Edit</Translate>
                        </span>
                      </Button>
                      <Button
                        tag={Link}
                        to={`${match.url}/${eventCommand.id}/delete`}
                        color="danger"
                        size="sm"
                        data-cy="entityDeleteButton"
                      >
                        <FontAwesomeIcon icon="trash" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.delete">Delete</Translate>
                        </span>
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        ) : (
          !loading && (
            <div className="alert alert-warning">
              <Translate contentKey="maxeventApp.eventCommand.home.notFound">No Event Commands found</Translate>
            </div>
          )
        )}
      </div>
    </div>
  );
};

const mapStateToProps = ({ eventCommand }: IRootState) => ({
  eventCommandList: eventCommand.entities,
  loading: eventCommand.loading,
});

const mapDispatchToProps = {
  getEntities,
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(EventCommand);

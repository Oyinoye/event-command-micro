import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import EventCommand from './event-command';
import EventCommandDetail from './event-command-detail';
import EventCommandUpdate from './event-command-update';
import EventCommandDeleteDialog from './event-command-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={EventCommandUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={EventCommandUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={EventCommandDetail} />
      <ErrorBoundaryRoute path={match.url} component={EventCommand} />
    </Switch>
    <ErrorBoundaryRoute exact path={`${match.url}/:id/delete`} component={EventCommandDeleteDialog} />
  </>
);

export default Routes;

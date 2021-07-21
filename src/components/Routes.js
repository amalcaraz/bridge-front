import React from 'react'
import { Switch, Route } from 'react-router-dom'
import { routes } from '../core/routes'

export default function Routes() {
  return (
    <Switch>
      {routes.map(({ id, path, exact, Component }) => (
        <Route key={id} path={path} exact={exact}>
          <Component />
        </Route>
      ))}
    </Switch>
  )
}

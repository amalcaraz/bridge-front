import React from 'react'
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'
import { Link } from 'react-router-dom'
import Page from '../components/Page'
import Button from '@material-ui/core/Button'
import { routesMap, RouteId } from '../core/routes'

export default function NotFoundPage() {
  return (
    <Page>
      <Paper>
        <Typography align="center">404 / Not Found</Typography>
      </Paper>
      <Button to={routesMap[RouteId.ITEM_LIST].path} component={Link} variant="contained" color="white">Go Home</Button>
    </Page>
  )
}

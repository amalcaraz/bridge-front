
import React from 'react'
import Paper from '@material-ui/core/Paper'
import Grid from '@material-ui/core/Grid'
import CircularProgress from '@material-ui/core/CircularProgress'
import Typography from '@material-ui/core/Typography'
import { Link } from 'react-router-dom'
import { usePageItemDetail } from '../hooks'
import ItemDetail from '../components/ItemDetail'
import Page from '../components/Page'
import ManufacturerDetail from '../components/ManufacturerDetail'
import Button from '@material-ui/core/Button'
import { routesMap, RouteId } from '../core/routes'

export default function ItemDetailPage() {
  const { itemDetail, manufacturerDetail, classes } = usePageItemDetail()

  if (!itemDetail || !manufacturerDetail) {
    return <CircularProgress color="secondary" />
  }

  return (
    <Page>
      <Paper className={classes.paper}>
        <Grid container spacing={2} direction="column" alignItems="stretch" justifyContent="center">
          <Grid item><Typography className={classes.typo} align="left">Item</Typography></Grid>
          <Grid item><ItemDetail {...itemDetail} /></Grid>
          <Grid item><Typography className={classes.typo} align="left">Manufacturer</Typography></Grid>
          <Grid item><ManufacturerDetail {...manufacturerDetail} /></Grid>
        </Grid>
      </Paper>
      <Button to={routesMap[RouteId.ITEM_LIST].path} component={Link} variant="contained" color="default">Go Back</Button>
    </Page>
  )
}

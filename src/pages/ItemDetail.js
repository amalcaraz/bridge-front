
import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Paper from '@material-ui/core/Paper'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import { useParams, Link } from 'react-router-dom'
import { useApiItemDetail, useApiManufacturerDetail } from '../hooks'
import ItemDetail from '../components/ItemDetail'
import ManufacturerDetail from '../components/ManufacturerDetail'
import Button from '@material-ui/core/Button'
import { routesMap, RouteId } from '../core/routes'

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
  },
  paper: {
    width: '100%',
    marginBottom: theme.spacing(2),
    padding: 12
  },
  typo: {
    fontWeight: 'bold',
    textDecoration: 'underline'
  }
}))

export default function ItemDetailPage(props) {
  const classes = useStyles()
  const { id } = useParams();
  const itemDetail = useApiItemDetail(id)
  const manufacturerDetail = useApiManufacturerDetail(itemDetail?.manufacturer)

  if (!itemDetail || !manufacturerDetail) {
    return null
  }

  return (
    <>
      <div className={classes.root}>
        <Paper className={classes.paper}>
          <Grid container spacing={2} direction="column" alignItems="stretch" justifyContent="center">
            <Grid item><Typography className={classes.typo} align="left">Item</Typography></Grid>
            <Grid item><ItemDetail {...itemDetail} /></Grid>
            <Grid item><Typography className={classes.typo} align="left">Manufacturer</Typography></Grid>
            <Grid item><ManufacturerDetail {...manufacturerDetail} /></Grid>
          </Grid>
        </Paper>
        <Button to={routesMap[RouteId.ITEM_LIST].path} component={Link} variant="contained" color="white">Go Back</Button>
      </div>
    </>
  )
}

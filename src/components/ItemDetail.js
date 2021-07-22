
import React from 'react'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import ItemRelevance from './ItemRelevance'
import ItemPrice from './ItemPrice'

export default function ItemDetail({
  id,
  name,
  relevance,
  price,
}) {
  return (
    <Grid container spacing={0} direction="column" alignItems="flex-start" justifyContent="space-between">
      <Grid container spacing={2} direction="row">
        <Grid item xs={4}><Typography align="right">Name:</Typography></Grid>
        <Grid item xs={8}><Typography align="left">{name}</Typography></Grid>
      </Grid>
      <Grid container spacing={2} direction="row">
        <Grid item xs={4}><Typography align="right">Relevance:</Typography></Grid>
        <Grid item xs={8}><Typography align="left"><ItemRelevance id={id} relevance={relevance} /></Typography></Grid>
      </Grid>
      <Grid container spacing={2} direction="row">
        <Grid item xs={4}><Typography align="right">Price:</Typography></Grid>
        <Grid item xs={8}><Typography align="left"><ItemPrice price={price} /></Typography></Grid>
      </Grid>
    </Grid>
  )
}


import React from 'react'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import Address from './Address'

export default function ManufacturerDetail({
  name,
  cif,
  address,
}) {
  return (
    <Grid container spacing={0} direction="column" alignItems="flex-start" justifyContent="space-between">
      <Grid container spacing={2} direction="row">
        <Grid item xs={4}><Typography align="right">Name:</Typography></Grid>
        <Grid item xs={8}><Typography align="left">{name}</Typography></Grid>
      </Grid>
      <Grid container spacing={2} direction="row">
        <Grid item xs={4}><Typography align="right">Cif:</Typography></Grid>
        <Grid item xs={8}><Typography align="left">{cif}</Typography></Grid>
      </Grid>
      <Grid container spacing={2} direction="row">
        <Grid item xs={4}><Typography align="right">Address:</Typography></Grid>
        <Grid item xs={8}><Typography align="left"><Address address={address}/></Typography></Grid>
      </Grid>
    </Grid>
  )
}

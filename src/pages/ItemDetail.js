
import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Paper from '@material-ui/core/Paper'
import { useParams } from 'react-router-dom'

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
  },
  paper: {
    width: '100%',
    marginBottom: theme.spacing(2),
  },
}))

export default function ItemDetailPage(props) {
  const classes = useStyles()
  let { id } = useParams();

  return (
    <>
      <div className={classes.root}>
        <Paper className={classes.paper}>
          {id}
        </Paper>
      </div>
    </>
  )
}

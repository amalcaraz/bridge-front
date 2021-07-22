import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
  }
}))

export default function Page({ children }) {
  const classes = useStyles()

  return (
    <div className={classes.root}>
      {children}
    </div>
  )
}
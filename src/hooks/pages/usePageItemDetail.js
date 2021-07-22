import { makeStyles } from '@material-ui/core/styles'
import { useParams } from 'react-router-dom'
import { useApiItemDetail } from '../useApiItemDetail'
import { useApiManufacturerDetail } from '../useApiManufacturerDetail'

const useStyles = makeStyles((theme) => ({
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

export function usePageItemDetail() {
  const classes = useStyles()
  const { id } = useParams();
  const itemDetail = useApiItemDetail(id)
  const manufacturerDetail = useApiManufacturerDetail(itemDetail?.manufacturer)

  return {
    itemDetail,
    manufacturerDetail,
    classes,
  }
}

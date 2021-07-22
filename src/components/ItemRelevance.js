import Rating from '@material-ui/lab/Rating'

export default function ItemRelevance({
  id,
  relevance
}) {
  return (
    <Rating size="small" name={`rating-box-${id}`} value={(relevance / 100) * 5} precision={0.5} />
  )
}

export default function Address({
  address
}) {
  return (
    <a
      target="_blank"
      rel="noreferrer"
      href={`https://www.google.com/maps/?q=${address}`}
    >{address}</a>
  )
}

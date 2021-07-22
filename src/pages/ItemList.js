import React from 'react'
import CircularProgress  from '@material-ui/core/CircularProgress'
import ItemListTable from '../components/ItemListTable'
import Page from '../components/Page'
import { usePageItemList } from '../hooks'

function ItemListPage() {
  const pageItemList = usePageItemList()

  if (!pageItemList.items) {
    return <CircularProgress color="secondary" />
  }
console.log(pageItemList)
  return (
    <Page>
      <ItemListTable {...pageItemList} />
    </Page>
  )
}

export default ItemListPage

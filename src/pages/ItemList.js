import React from 'react'
import ItemListTable from '../components/ItemListTable'
import { useItemList } from '../hooks/useItemList'

function ItemListPage() {
  const itemList = useItemList()

  return (
    <>
      <ItemListTable {...itemList} />
    </>
  )
}

export default ItemListPage

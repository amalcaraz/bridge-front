import { useState, useCallback } from 'react'
import { useHistory, generatePath } from 'react-router-dom'
import { routesMap, RouteId } from '../../core/routes'
import { useApiItemList } from '../useApiItemList'

export function usePageItemList() {
  const history = useHistory()

  const [q, setQ] = useState(undefined)
  const [order, setOrder] = useState('desc')
  const [orderBy, setOrderBy] = useState('name')
  const [page, setPage] = useState(0)
  const [limit, setLimit] = useState(10)
  const limitOptions = [5, 10, 25, 50]

  const { data: items, pagination } = useApiItemList({
    q,
    page,
    orderBy,
    order,
    limit,
  })

  const onOrderChange = useCallback((property) => {
    const isAsc = orderBy === property && order === 'asc'
    setOrder(isAsc ? 'desc' : 'asc')
    setOrderBy(property)
  }, [orderBy, order, setOrder, setOrderBy])

  const onLimitChange = useCallback((limit) => {
    setLimit(limit)
    setPage(0)
  }, [setLimit, setPage])

  const onItemClick = useCallback((id) => {
    const path = generatePath(routesMap[RouteId.ITEM_DETAIL].path, { id })
    history.push(path)
  }, [history, routesMap])

  return {
    items,
    pagination,
    order,
    orderBy,
    limit,
    limitOptions,
    onOrderChange,
    onLimitChange,
    onItemClick,
    onPageChange: setPage,
    onSearchChange: setQ,
  }
}

import { useState, useEffect } from 'react'
import { capitalize } from '../core/common'

export function useApiItemList({
  q,
  page,
  orderBy,
  order,
  limit,
}) {
  const [{ data, pagination }, setData] = useState({})

  useEffect(() => {
    async function fetchData() {
      const filters = {}

      if (orderBy && order) {

        filters[`order${capitalize(orderBy)}`] = order
      }

      if (page) {
        filters.page = page
      }

      if (limit) {
        filters.limit = limit
      }

      if (q) {
        filters.q = q
      }

      const params = new URLSearchParams(filters).toString()
      const url = `http://localhost:3001/items${params.length ? `?${params}` : ''}`

      const response = await fetch(url)
      const data = await response.json()

      console.log(url, data)
      setData(data)
    }

    fetchData()
  }, [q, page, orderBy, order, limit, setData])

  return {
    data,
    pagination
  }
}
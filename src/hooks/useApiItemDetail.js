import { useState, useEffect } from 'react'

export function useApiItemDetail(id) {
  const [data, setData] = useState(undefined)

  useEffect(() => {
    if (!id) return

    async function fetchData() {
      const url = `http://localhost:3001/items/${id}`

      const response = await fetch(url)
      const data = await response.json()

      console.log(url, data)
      setData(data)
    }

    fetchData()
  }, [id, setData])

  return data
}
import ItemList from "../pages/ItemList"
import ItemDetail from "../pages/ItemDetail"
import NotFound from "../pages/NotFound"

export const RouteId = Object.freeze({
  ITEM_LIST: 'ITEM_LIST',
  ITEM_DETAIL: 'ITEM_DETAIL',
  NOT_FOUND: 'NOT_FOUND'
})

export const routesMap = {
  [RouteId.ITEM_LIST]: {
    id: RouteId.ITEM_LIST,
    title: "The Bridge | Item",
    path: "/",
    name: "Inicio",
    exact: true,
    Component: ItemList
  },
  [RouteId.ITEM_DETAIL]: {
    id: RouteId.ITEM_DETAIL,
    title: "The Bridge | Item Detail",
    path: "/item/:id",
    name: "Item Detail",
    exact: true,
    Component: ItemDetail,
  },
  [RouteId.NOT_FOUND]: {
    id: RouteId.NOT_FOUND,
    title: '404 - Not Found',
    path: "*",
    name: "Not Found",
    exact: true,
    Component: NotFound
  }
}

export const routes = Object.values(routesMap)

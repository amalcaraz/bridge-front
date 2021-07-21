import React, { useState, useCallback } from 'react'
import PropTypes from 'prop-types'
import { makeStyles } from '@material-ui/core/styles'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableContainer from '@material-ui/core/TableContainer'
import TableHead from '@material-ui/core/TableHead'
import TablePagination from '@material-ui/core/TablePagination'
import TableRow from '@material-ui/core/TableRow'
import TableSortLabel from '@material-ui/core/TableSortLabel'
import Toolbar from '@material-ui/core/Toolbar'
import Paper from '@material-ui/core/Paper'
import SearchIcon from '@material-ui/icons/Search'
import Rating from '@material-ui/lab/Rating'
import Grid from '@material-ui/core/Grid'
import TextField from '@material-ui/core/TextField'
import { useDebouncedCallback } from 'use-debounce/lib'
import { useHistory, generatePath } from 'react-router-dom'
import { routesMap, RouteId } from '../core/routes'
import { useItemApi } from '../hooks/useItemApi'

const headCells = [
  { id: 'name', numeric: false, disablePadding: false, label: 'Name' },
  { id: 'relevance', numeric: false, disablePadding: false, label: 'Relevance' },
  { id: 'price', numeric: true, disablePadding: false, label: 'Price' },
  { id: 'manufacturer', numeric: false, disablePadding: false, label: 'Manufacturer' },
]

function EnhancedTableHead(props) {
  const { classes, order, orderBy, onRequestSort } = props
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property)
  }

  return (
    <TableHead>
      <TableRow>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={headCell.numeric ? 'right' : 'left'}
            padding={headCell.disablePadding ? 'none' : 'normal'}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : 'asc'}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <span className={classes.visuallyHidden}>
                  {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                </span>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  )
}

EnhancedTableHead.propTypes = {
  classes: PropTypes.object.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  order: PropTypes.oneOf(['asc', 'desc']).isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired,
}

const EnhancedTableToolbar = ({ classes, onChange }) => {
  const handleChange = useDebouncedCallback(onChange, 250)

  return (
    <Toolbar>
      <Grid container spacing={1} alignItems="flex-end" justifyContent="flex-start">
        <Grid item>
          <SearchIcon />
        </Grid>
        <Grid item xs={11}>
          <TextField
            id="search-box"
            name="search-box"
            label="Search items or manufacturers"
            className={classes.input}
            onChange={handleChange} />
        </Grid>
      </Grid>
    </Toolbar>
  )
}

EnhancedTableToolbar.propTypes = {
  classes: PropTypes.object.isRequired,
  onChange: PropTypes.func.isRequired,
}

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
  },
  input: {
    width: '100%',
  },
  paper: {
    width: '100%',
    marginBottom: theme.spacing(2),
  },
  table: {
    minWidth: 800,
  },
  tContainer: {
    height: 620
  },
  visuallyHidden: {
    border: 0,
    clip: 'rect(0 0 0 0)',
    height: 1,
    margin: -1,
    overflow: 'hidden',
    padding: 0,
    position: 'absolute',
    top: 20,
    width: 1,
  },
}))

export default function EnhancedTable({


}) {
  const classes = useStyles()
  const history = useHistory()

  const [q, setQ] = useState(undefined)
  const [order, setOrder] = useState('desc')
  const [orderBy, setOrderBy] = useState('name')
  const [page, setPage] = useState(0)
  const [limit, setLimit] = useState(10)

  const { data: rows, pagination } = useItemApi({
    q,
    page,
    orderBy,
    order,
    limit,
  })

  const handleRequestSort = useCallback((event, property) => {
    const isAsc = orderBy === property && order === 'asc'
    setOrder(isAsc ? 'desc' : 'asc')
    setOrderBy(property)
  }, [orderBy, order, setOrder, setOrderBy])

  const handleChangePage = useCallback((event, newPage) => {
    setPage(newPage)
  }, [setPage])

  const handleChangeRowsPerPage = useCallback((event) => {
    const limit = parseInt(event.target.value, 10)
    setLimit(limit)
    setPage(0)
  }, [setLimit, setPage])

  const handleChangeSearch = useCallback((event) => {
    const q = String(event.target.value)
    setQ(q)
  }, [setQ])

  const handleRowClick = useCallback((id) => {
    const path = generatePath(routesMap[RouteId.ITEM_DETAIL].path, { id })
    history.push(path)
  }, [history, routesMap])

  if (!rows) return null

  return (
    <div className={classes.root}>
      <Paper className={classes.paper}>
        <EnhancedTableToolbar
          classes={classes}
          onChange={handleChangeSearch} />
        <TableContainer className={classes.tContainer}>
          <Table
            stickyHeader
            className={classes.table}
            aria-labelledby="tableTitle"
            size="medium"
            aria-label="enhanced table"
          >
            <EnhancedTableHead
              classes={classes}
              order={order}
              orderBy={orderBy}
              onRequestSort={handleRequestSort}
              rowCount={rows.length}
            />
            <TableBody>
              {rows
                .map((row) => {
                  return (
                    <TableRow
                      hover
                      tabIndex={-1}
                      key={row.id}
                      onClick={() => handleRowClick(row.id)}
                    >
                      <TableCell component="th" scope="row">
                        {row.name}
                      </TableCell>
                      <TableCell align="left">
                        <Rating size="small" name={`rating-box-${row.id}`} value={(row.relevance / 100) * 5} precision={0.5} />
                      </TableCell>
                      <TableCell align="right">{row.price} €</TableCell>
                      <TableCell align="left">{row.manufacturer}</TableCell>
                    </TableRow>
                  )
                })}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25, 50]}
          component="div"
          count={pagination.count}
          rowsPerPage={limit}
          page={pagination.current}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    </div>
  )
}

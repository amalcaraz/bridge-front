import React, { useCallback } from 'react'
import PropTypes from 'prop-types'
import { makeStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
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
import Grid from '@material-ui/core/Grid'
import TextField from '@material-ui/core/TextField'
import { useDebouncedCallback } from 'use-debounce/lib'
import ItemRelevance from './ItemRelevance'
import ItemPrice from './ItemPrice'

const headCells = [
  { id: 'name', numeric: false, disablePadding: false, label: 'Name', width: 40 },
  { id: 'manufacturerName', numeric: false, disablePadding: false, label: 'Manufacturer', width: 40 },
  { id: 'relevance', numeric: false, disablePadding: false, label: 'Relevance', width: 20 },
  { id: 'price', numeric: true, disablePadding: false, label: 'Price', width: 20 },
]

function ItemListTableHeadCell({
  classes,
  order,
  orderBy,
  onOrderChange,
  id,
  numeric,
  disablePadding,
  label,
  width
}) {
  const handleOnClick = useCallback(() => {
    onOrderChange(id)
  }, [id, onOrderChange])

  return (
    <TableCell
      key={id}
      width={`${width}%`}
      align={numeric ? 'right' : 'left'}
      padding={disablePadding ? 'none' : 'normal'}
      sortDirection={orderBy === id ? order : false}
    >
      <TableSortLabel
        active={orderBy === id}
        direction={orderBy === id ? order : 'asc'}
        onClick={handleOnClick}
      >
        <Typography>{label}</Typography>
        {orderBy === id ? (
          <span className={classes.visuallyHidden}>
            {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
          </span>
        ) : null}
      </TableSortLabel>
    </TableCell>
  )
}

function ItemListTableHead(props) {
  return (
    <TableHead>
      <TableRow>
        {headCells.map((headCell) => (
          <ItemListTableHeadCell {...{
            key: headCell.id,
            ...props,
            ...headCell
          }} />
        ))}
      </TableRow>
    </TableHead>
  )
}

ItemListTableHead.propTypes = {
  classes: PropTypes.object.isRequired,
  onOrderChange: PropTypes.func.isRequired,
  order: PropTypes.oneOf(['asc', 'desc']).isRequired,
  orderBy: PropTypes.string.isRequired,
}

const ItemListTableToolbar = ({ classes, onChange }) => {
  const handleChange = useDebouncedCallback((event) => {
    const q = String(event.target.value)
    onChange(q)
  }, 250)

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

ItemListTableToolbar.propTypes = {
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

function ItemListTableRow({
  id,
  name,
  relevance,
  price,
  manufacturerName,
  onClick
}) {
  const handleOnClick = useCallback(() => onClick(id), [id, onClick])

  return (
    <TableRow
      hover
      tabIndex={-1}
      key={id}
      onClick={handleOnClick}
    >
      <TableCell component="th" scope="row"><Typography>{name}</Typography></TableCell>
      <TableCell align="left"><Typography>{manufacturerName}</Typography></TableCell>
      <TableCell align="left"><ItemRelevance id={id} relevance={relevance} /></TableCell>
      <TableCell align="right"><ItemPrice price={price} /></TableCell>
    </TableRow>
  )
}

export default function ItemListTable({
  items,
  pagination,
  order,
  orderBy,
  limit,
  limitOptions,
  onOrderChange,
  onPageChange,
  onLimitChange,
  onSearchChange,
  onItemClick
}) {
  const classes = useStyles()

  const handleRowsPerPageChange = useCallback((event) => {
    const limit = parseInt(event.target.value, 10)
    onLimitChange(limit)
  }, [onLimitChange])

  const handlePageChange = useCallback((_, page) => {
    onPageChange(page)
  }, [onPageChange])

  return (
    <div className={classes.root}>
      <Paper className={classes.paper}>
        <ItemListTableToolbar
          classes={classes}
          onChange={onSearchChange} />
        <TableContainer className={classes.tContainer}>
          <Table
            stickyHeader
            className={classes.table}
            aria-labelledby="tableTitle"
            size="medium"
            aria-label="enhanced table"
          >
            <ItemListTableHead
              classes={classes}
              order={order}
              orderBy={orderBy}
              onOrderChange={onOrderChange}
            />
            <TableBody>
              {items
                .map(({ id, name, relevance, price, manufacturerName }) => {
                  return <ItemListTableRow
                    {...{
                      key: id,
                      id,
                      name,
                      relevance,
                      price,
                      manufacturerName,
                      onClick: onItemClick
                    }}
                  />
                })}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={limitOptions}
          component="div"
          count={pagination.count}
          rowsPerPage={limit}
          page={pagination.current}
          onPageChange={handlePageChange}
          onRowsPerPageChange={handleRowsPerPageChange}
        />
      </Paper>
    </div>
  )
}

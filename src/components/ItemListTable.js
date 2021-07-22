import React, { useCallback } from 'react'
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
import Grid from '@material-ui/core/Grid'
import TextField from '@material-ui/core/TextField'
import { useDebouncedCallback } from 'use-debounce/lib'
import ItemRelevance from './ItemRelevance'

const headCells = [
  { id: 'name', numeric: false, disablePadding: false, label: 'Name' },
  { id: 'relevance', numeric: false, disablePadding: false, label: 'Relevance' },
  { id: 'price', numeric: true, disablePadding: false, label: 'Price' },
  { id: 'manufacturer', numeric: false, disablePadding: false, label: 'Manufacturer' },
]

function EnhancedTableHeadCell({
  classes,
  order,
  orderBy,
  onOrderChange,
  id,
  numeric,
  disablePadding,
  label,
}) {
  const handleOnClick = useCallback(() => {
    onOrderChange(id)
  }, [id, onOrderChange])

  return (
    <TableCell
      key={id}
      align={numeric ? 'right' : 'left'}
      padding={disablePadding ? 'none' : 'normal'}
      sortDirection={orderBy === id ? order : false}
    >
      <TableSortLabel
        active={orderBy === id}
        direction={orderBy === id ? order : 'asc'}
        onClick={handleOnClick}
      >
        {label}
        {orderBy === id ? (
          <span className={classes.visuallyHidden}>
            {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
          </span>
        ) : null}
      </TableSortLabel>
    </TableCell>
  )
}

function EnhancedTableHead(props) {
  return (
    <TableHead>
      <TableRow>
        {headCells.map((headCell) => (
          <EnhancedTableHeadCell {...{
            key: headCell.id,
            ...props,
            ...headCell
          }} />
        ))}
      </TableRow>
    </TableHead>
  )
}

EnhancedTableHead.propTypes = {
  classes: PropTypes.object.isRequired,
  onOrderChange: PropTypes.func.isRequired,
  order: PropTypes.oneOf(['asc', 'desc']).isRequired,
  orderBy: PropTypes.string.isRequired,
}

const EnhancedTableToolbar = ({ classes, onChange }) => {
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

function EnhancedTableRow({
  id,
  name,
  relevance,
  price,
  manufacturer,
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
      <TableCell component="th" scope="row">
        {name}
      </TableCell>
      <TableCell align="left">
        <ItemRelevance id={id} relevance={relevance} />
      </TableCell>
      <TableCell align="right">{price} €</TableCell>
      <TableCell align="left">{manufacturer}</TableCell>
    </TableRow>
  )
}

export default function EnhancedTable({
  rows,
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

  if (!rows) return null

  return (
    <div className={classes.root}>
      <Paper className={classes.paper}>
        <EnhancedTableToolbar
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
            <EnhancedTableHead
              classes={classes}
              order={order}
              orderBy={orderBy}
              onOrderChange={onOrderChange}
            />
            <TableBody>
              {rows
                .map(({ id, name, relevance, price, manufacturer }) => {
                  return <EnhancedTableRow
                    {...{
                      key: id,
                      id,
                      name,
                      relevance,
                      price,
                      manufacturer,
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

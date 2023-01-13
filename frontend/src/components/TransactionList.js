import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Typography } from '@mui/material';
import EditSharpIcon from '@mui/icons-material/EditSharp';
import DeleteSharpIcon from '@mui/icons-material/DeleteSharp';
import IconButton from '@mui/material/IconButton';

import { useAuthContext } from '../hooks/useAuthContext';

import dayjs from 'dayjs';

import { useTransactionContext } from '../hooks/useTransactionContext';

export default function TransactionList({ setEditTransaction, setToggleUpdate }) {
  
  const { transactions, dispatch } = useTransactionContext();
  const { user } = useAuthContext();
  
  const remove = async _id => {

    if(!user) {
      return
    }

    if(!window.confirm('Are you sure')) return;

    const response = await fetch(`${process.env.REACT_APP_API_URL}/transactions/` + _id, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${user.token}`
      }
    })
    const json = await response.json();
    if(response.ok) {
      window.alert('Deleted Succesfully')
      dispatch({
        type: 'DELETE_TRANSACTION',
        payload: json
      })
    }
  }

  const formatDate = (date) => {
    return dayjs(date).format('MMM DD, YYYY')
  };  
  
  return (
    <>
      <Typography sx={{ marginTop: 10 }} variant='h6'>List of Transactions</Typography>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell align="center">Amount</TableCell>
              <TableCell align="center">Description</TableCell>
              <TableCell align="center">Date</TableCell>
              <TableCell align="center">Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {transactions && transactions.map((row) => (
              <TableRow
                key={row._id}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell align="center" component="th" scope="row">
                  {new Intl.NumberFormat('en-US', {
                    style: 'currency',
                    currency: 'PHP'
                  }).format(row.amount)}
                </TableCell>
                <TableCell align="center">{row.description}</TableCell>
                <TableCell align="center">{formatDate(row.date)}</TableCell>
                <TableCell align="center">
                  <IconButton color="primary" aria-label="upload picture" component="label"
                    onClick={() => {
                      setEditTransaction(row)
                      setToggleUpdate(true)
                    }}
                  >
                    <EditSharpIcon />
                  </IconButton>
                  <IconButton color="warning" aria-label="upload picture" component="label"
                    onClick={() => remove(row._id)}
                  >
                    <DeleteSharpIcon 
                      sx={{marginLeft: 2}}
                    />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}
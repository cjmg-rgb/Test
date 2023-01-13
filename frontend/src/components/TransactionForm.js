import { useState, useEffect } from 'react';
import { useAuthContext } from '../hooks/useAuthContext';

import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';


//  Date Picker 
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';

import { useTransactionContext } from '../hooks/useTransactionContext';


// Options
import Autocomplete from '@mui/material/Autocomplete';
import { Box } from '@mui/system';

const initialForm = {
  amount: '',
  description: '',
  date: new Date(),
  category: '',

};

export default function TransactionForm({ editTransaction, setToggleUpdate, toggleUpdate }) {

  const { user } = useAuthContext();
  const { dispatch } = useTransactionContext();
  const [form, setForm] = useState(initialForm)

  useEffect(() => {
    if(editTransaction.amount !== undefined) {
      setForm(editTransaction)
    }
  }, [editTransaction]);

  const handleChange = (e) => {
    setForm({...form, [e.target.name]: e.target.value})

  }

  const handleDate = (newVal) => {
    setForm({...form, date: newVal })
  };

  const create = async () => {
    const response = await fetch(`${process.env.REACT_APP_API_URL}/transactions`, {
      method: 'POST',
      body: JSON.stringify(form),
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${user.token}`
      }
    })
    const json = await response.json();
    if(response.ok) {
      setForm(initialForm)
      dispatch({
        type: 'CREATE_TRANSACTION',
        payload: json
      })
    }
  }
  
  const update = async () => {
    
    const response = await fetch(`${process.env.REACT_APP_API_URL}/transactions/` + editTransaction._id, {
      method: 'PATCH',
      body: JSON.stringify(form),
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${user.token}`
      }
    })
    if(response.ok) {
      setForm(initialForm)
      
      const response = await fetch(`${process.env.REACT_APP_API_URL}/transactions`, {
        headers: {
          'Authorization': `Bearer ${user.token}`
        }
      })
      const json = await response.json();
      if(response.ok) {
        editTransaction = undefined;
        dispatch({
          type: 'SET_TRANSACTIONS',
          payload: json
        })
        setToggleUpdate(false)
      }
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    if(!user) {
      return
    }

    editTransaction.amount === undefined ? 
    (create())
    :
    (update())
  };

  return (
    <>
      <Typography variant="h6" sx={{marginTop: 10 }}>
         Add new transaction
      </Typography>
    <Card sx={{ minWidth: 275}}>
      <CardContent>
        <Box
          component='form'
          onSubmit={handleSubmit}
          sx={{display: 'flex'}}
        >
          <TextField 
            size='small' 
            sx={{marginRight: 5}} 
            id="outlined-basic" label="Amount" 
            variant="outlined"
            name='amount'
            type='number'
            value={form.amount}
            onChange={handleChange}
          />
          <TextField 
            size='small' 
            sx={{marginRight: 5}} 
            id="outlined-basic" 
            label="Description"
            name='description'
            variant="outlined" 
            value={form.description}
            onChange={handleChange}
          />
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DesktopDatePicker
              label="Transaction Date"
              inputFormat="MM/DD/YYYY"
              onChange={handleDate}
              renderInput={(params) => <TextField sx={{marginRight: 5}} size='small' {...params} />}
              value={form.date}

            />
          </LocalizationProvider>
          {!toggleUpdate === false ? 
          (<Button type='submit' variant="secondary">Update</Button>)
            : 
          (<Button type='submit' variant="contained" disabled={
            !form.amount || !form.description || !form.date ? true : false
          }>Submit</Button>)}
        </Box>      
     </CardContent>
    </Card>
  </>
  );
}
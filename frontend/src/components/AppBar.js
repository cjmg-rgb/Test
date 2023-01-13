import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';

import { useNavigate } from 'react-router-dom';
import { useLogout } from '../hooks/useLogout';
import { useAuthContext } from '../hooks/useAuthContext';
import Cookies from 'js-cookie';

export default function ButtonAppBar() {

  const { logout } = useLogout();
  const { user } = useAuthContext();
  const navigate = useNavigate();

  const handleClick = (e) => {
    e.preventDefault()
    Cookies.remove('token');

    logout();
    navigate('login')
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              <Link to='/' className='text-white'>
                CJMG-Expenses
                </Link>
            </Typography>
            {!user && <div>
              <Link to='login' className='text-white'>
                <Button color="inherit">Login</Button>
              </Link>
            <Link to='register' className='text-white'>
              <Button color="inherit">Register</Button>
            </Link>
            </div>}
            {user && <div>
              {user.email}
              <Link to='register' className='text-white'>
                <Button color="inherit"
                  onClick={handleClick}
                >Logout</Button>
              </Link>
            </div>}
        </Toolbar>
      </AppBar>
    </Box>
  );
}
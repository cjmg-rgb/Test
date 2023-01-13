import { useState } from "react";
import { useAuthContext } from './useAuthContext';
import Cookies from 'js-cookie';
import { useDispatch } from 'react-redux';
import { getUser } from '../features/authentication/authSlice';

export const useLogin = () => {

  const userDispatch = useDispatch();
  const { dispatch } = useAuthContext();
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const login =  async (email, password) => {
    setError(null);
    setIsLoading(true);

    const response = await fetch(`${process.env.REACT_APP_API_URL}/auth/login`, {
      method: 'POST',
      body: JSON.stringify({email, password}),
      headers: {
        'Content-Type': 'application/json'
      }
    });
    const json = await response.json();

    if(response.ok) {
      localStorage.setItem('user', JSON.stringify(json))
      Cookies.set('token', json.token)
      dispatch({
        type: 'LOGIN',
        payload: json
      })
      setIsLoading(false);
      setError(null)
    };

    if(!response.ok) {
      setError(json.error);
      setIsLoading(false)
    }
  };

  return { login, error, isLoading }
};
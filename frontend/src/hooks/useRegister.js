import { useState } from "react";
import { useAuthContext } from './useAuthContext';
import Cookies from "js-cookie";

export const useRegister = () => {

  const { dispatch } = useAuthContext();
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const register =  async (firstName, lastName, email, password) => {
    setError(null);
    setIsLoading(true);

    const response = await fetch(`${process.env.REACT_APP_API_URL}/auth/register`, {
      method: 'POST',
      body: JSON.stringify({firstName, lastName, email, password}),
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

  return { register, error, isLoading }
};
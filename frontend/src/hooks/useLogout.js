import { useAuthContext } from "./useAuthContext";
import { useTransactionContext } from './useTransactionContext';
import Cookies from "js-cookie";

export const useLogout = () => {
  const { dispatch: transactionDispatch } = useTransactionContext();
  const { dispatch } = useAuthContext();
  const logout = () => {
    localStorage.removeItem('user');
    Cookies.remove('token');
    dispatch({
      type: 'LOGOUT'
    })
    transactionDispatch({
      type: 'SET_TRANSACTIONS',
      payload: null
    })
  };

  return { logout }
};
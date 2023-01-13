import { createContext, useReducer } from 'react';

export const TransactionContext = createContext();

export const transactionReducer = (state, action) => {
  switch(action.type) {
    case 'SET_TRANSACTIONS':
      return {
        transactions: action.payload
      }
    case 'CREATE_TRANSACTION':
      return {
        transactions: [action.payload, ...state.transactions]
      }
      case 'DELETE_TRANSACTION':
        return {
          transactions: state.transactions.filter(transaction => transaction._id !== action.payload._id)
        }
      case 'PATCH_TRANSACTION':
        return {
          transactions: state.transactions.map(transaction => transaction._id === action.payload._id ? [...state.transactions, action.payload] : transaction )
        }
    default:
      return state
  }
};

export const TransactionContextProvider = ({ children }) => {
  
  const [state, dispatch] = useReducer(transactionReducer, {
    transactions: null
  })

  return (
    <TransactionContext.Provider value={{...state, dispatch}}>
      { children }
    </TransactionContext.Provider>
  )
};
import { useContext } from "react";
import { TransactionContext } from "../contexts/TransactionContext";

export const useTransactionContext = () => {
  const context = useContext(TransactionContext);
  if(!context) {
    throw Error('Out of bounds')
  }

  return context;
}
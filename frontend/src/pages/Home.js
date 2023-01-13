import { Container } from "@mui/system";
import TransactionForm from "../components/TransactionForm";
import TransactionList from "../components/TransactionList";
import { useEffect, useState } from "react";
import { useTransactionContext } from '../hooks/useTransactionContext';
import { useAuthContext } from "../hooks/useAuthContext";
import TransactionChart from "../components/TransactionChart";

const Home = () => {

  const { user } = useAuthContext();
  const { dispatch } = useTransactionContext();
  const [editTransaction, setEditTransaction] = useState({});
  const [toggleUpdate, setToggleUpdate] = useState(false);

  useEffect(() => {
    const fetchTransactions = async () => {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/transactions`, {
        headers: {
          'Authorization': `Bearer ${user.token}`
        }
      })
      const json = await response.json();
      if(response.ok) {
        dispatch({
          type: 'SET_TRANSACTIONS',
          payload: json
        })
      }
    };

    if(user) {
      fetchTransactions();
    }
  }, [dispatch, user]);

  return (  
    <div className="home">
      <Container>
        <TransactionChart />
        <TransactionForm 
          editTransaction={editTransaction}
          setToggleUpdate={setToggleUpdate}
          toggleUpdate={toggleUpdate}
        />
        <TransactionList 
          setEditTransaction={setEditTransaction}
          setToggleUpdate={setToggleUpdate}
        />
      </Container>
    </div>
  );
}
 
export default Home;
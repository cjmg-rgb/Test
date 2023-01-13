import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';

import { TransactionContextProvider } from './contexts/TransactionContext';
import { AuthContextProvider } from './contexts/AuthContext';
import { Provider } from 'react-redux';
import { store } from './app/store';

import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <Provider store={store}>
      <AuthContextProvider>
        <TransactionContextProvider>
          <App />
        </TransactionContextProvider>
      </AuthContextProvider>
    </Provider>
);


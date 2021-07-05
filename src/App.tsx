import React from 'react';
import Header from './components/Header';
import DataTable from './components/DataTable';
import './App.css';
import styles from './App.css';

const App = () => {
  return (
    <div className={styles.ladingPage}>
      <Header />
      <DataTable />
    </div>
  );
};

export default App;

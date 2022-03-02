import React from 'react';
import Header from './components/Header/Header';
import Form from './components/Form/Form';
import Table from './components/Table/Table';
import Chart from './components/Chart/Chart';

import './App.scss';


const App: React.FC = () => {
  return (
    <React.Fragment>
      <header className='container'>
        <Header />
      </header>
      <main className='container'>
        <Table />
        <Chart />
      </main>
    </React.Fragment>
  );
}

export default App;

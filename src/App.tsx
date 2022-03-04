import React, { useEffect } from 'react';
import Header from './components/Header/Header';
import TabView from './components/TabView/TabView';
import { useAppDispatch, useAppSelector } from './state/hooks';
import { loadTableData } from './state/thunks';
import { selectDateParams } from './state/Entities/Table/table';

import './App.scss';


const App: React.FC = () => {
  const dispatch = useAppDispatch()
  const dateParams = useAppSelector(selectDateParams)

  useEffect(() => {
    dispatch(loadTableData(dateParams))
  }, [])

  return (
    <React.Fragment>
      <header className='container'>
        <Header />
      </header>
      <main className='container'>
        <TabView />
      </main>
    </React.Fragment>
  );
}

export default App;

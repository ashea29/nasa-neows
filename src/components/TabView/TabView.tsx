import React from 'react'
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import DateForm from '../Form/DateForm';
import Table from '../Table/Table';
import Chart from '../Chart/Chart';

import 'react-tabs/style/react-tabs.scss';
import styles from './TabView.module.scss'



const TabView: React.FC = () => {
  return (
    <section className="centered-section">
      <div className={`${styles["table-group"]}`}>
        <article className={styles["form-container"]}>
          <DateForm />
        </article>
        <article>
          <Tabs>
            <TabList className={styles.tablist}>
              <Tab>Data Grid</Tab>
              <Tab>NEOs By Date</Tab>
            </TabList>

            <TabPanel className={styles["table-panel"]}>
              <Table />
            </TabPanel>
            <TabPanel className={styles["chart-panel"]}>
              <Chart />
            </TabPanel>
          </Tabs>
        </article>
      </div>
    </section>
  )
}

export default TabView
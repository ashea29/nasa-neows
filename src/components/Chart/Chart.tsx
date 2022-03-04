import React, { useState, useEffect } from 'react'
import { AgChartsReact } from 'ag-charts-react'
import { selectChartData, selectChartDataLoading } from '../../state/Entities/Chart/chart'
import { options } from './Chart.utilities'
import { useAppSelector } from '../../state/hooks'

import styles from './Chart.module.scss'
import Spinner from '../Spinner/Spinner'


const Chart: React.FC = () => {
  const chartData = useAppSelector(selectChartData)
  const isLoading = useAppSelector(selectChartDataLoading)
  const [chartOptions, setChartOptions] = useState(options)

  useEffect(() => {
    if (chartData.length) {
      setChartOptions((prevOptions) => {
        return {...prevOptions, data: chartData}
      })
    }
  }, [chartData])

  return (
    isLoading ? (
      <Spinner />
    ) : (
      <article className={styles.chart}>
        <AgChartsReact options={chartOptions} />
      </article>
    )
  )
}

export default Chart
import React, { useState } from 'react'
import { AgChartsReact } from 'ag-charts-react'
import { selectChartData } from '../../state/Entities/Table/table'
import { useAppSelector } from '../../state/hooks'


const Chart = () => {
  const chartData = useAppSelector(selectChartData)

  const [chartOptions] = useState({
    autoSize: true,
    theme: 'ag-default-dark',
    title: {
      text: 'Near Earth Objects (by date)',
    },
    data: chartData,
    series: [
      {

        xKey: 'date',
        yKey: 'numberOfObjects',
        yName: 'Number of NEOs',
        stroke: '#0067b4',
        marker: {
          fill: '#0067b4',
          stroke: '#0067b4' 
        }
      },
    ],
    legend: {
      position: 'bottom',
    },
  })

  console.log(chartData)
  return (
    <section className="centered-section">
      <AgChartsReact options={chartOptions} />
    </section>
  )
}

export default Chart
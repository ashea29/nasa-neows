import { createAsyncThunk } from '@reduxjs/toolkit'
import { AppDispatch } from './store'
import { SET_TABLEDATA } from './Entities/Table/table'
import { SET_CHARTDATA } from './Entities/Chart/chart'
import axios from 'axios'
import dayjs from 'dayjs'

import dayOfYear from 'dayjs/plugin/dayOfYear'
dayjs.extend(dayOfYear)

interface apiThunkProps {
  defaultStartDate: string
  defaultEndDate: string
  userStartDate?: string | null
  userEndDate?: string | null
}

interface ThunkAPI {
  dispatch: AppDispatch
  getState: Function
  extra?: any
  requestId: string
  signal: AbortSignal
}

export const loadTableData = createAsyncThunk(
  'app/loadTableData',
  async (props: apiThunkProps, api) => {
    const dispatch = api.dispatch
    try {
      const {
        defaultStartDate,
        defaultEndDate,
        userStartDate,
        userEndDate
      } = props

      const url = "https://api.nasa.gov/neo/rest/v1/feed"
      const response = await axios.get(url, {
        params: {
          api_key: process.env.REACT_APP_NEOW_KEY,
          start_date: `${!userStartDate ? defaultStartDate : userStartDate}`,
          end_date: `${!userEndDate ? defaultEndDate : userEndDate}`
        }
      })
      const tableData: object[] = []
      const chartData: object[] = []
      let sortedChartData: object[]
      const modifiedResults: any[] = []
      const resultsArray = Object.entries(response.data["near_earth_objects"])
  
      resultsArray.forEach((result: Array<any>) => {
        chartData.push({
          date: result[0],
          numberOfObjects: result[1].length
        })
        modifiedResults.push(...result[1])
      })
  
      modifiedResults.forEach((result) => {
        tableData.push({
          id: result.id,
          name: result.name,
          estimated_diameter: `${result.estimated_diameter.meters.estimated_diameter_min} - ${result.estimated_diameter.meters.estimated_diameter_max}`,
          is_potentially_hazardous: JSON.stringify(result.is_potentially_hazardous_asteroid),
          is_sentry_object: JSON.stringify(result.is_sentry_object),
          velocity: result.close_approach_data[0].relative_velocity.kilometers_per_hour,
          miss_distance: result.close_approach_data[0].miss_distance.kilometers,
          visual_magnitude: result.absolute_magnitude_h,
          close_approach_date: result.close_approach_data[0].close_approach_date_full
        })
      })
      dispatch(SET_TABLEDATA(tableData))

      sortedChartData = chartData.sort((a: any, b: any) => {
        const date1 = dayjs(a.date).get('date')
        const date2 = dayjs(b.date).get('date')
        return date1 - date2
      } )
      dispatch(SET_CHARTDATA(sortedChartData))
    } catch (error) {
      throw error
    }
  }
)
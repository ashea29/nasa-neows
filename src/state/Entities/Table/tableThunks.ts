import { createAsyncThunk } from '@reduxjs/toolkit'
import { AppDispatch } from '../../store'
import { SET_CHARTDATA, SET_DATA } from './table'
import axios from 'axios'


interface tableThunkProps {
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
  'table/loadTableData',
  async (thunkProps: tableThunkProps, thunkAPI: ThunkAPI) => {
    const dispatch = thunkAPI.dispatch
    try {
      const {
        defaultStartDate,
        defaultEndDate,
        userStartDate,
        userEndDate
      } = thunkProps

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
      const modifiedResults: any[] = []
      // const resultsKeysArray = Object.keys(response.data[""])
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
          is_potentially_hazardous: result.is_potentially_hazardous_asteroid,
          is_sentry_object: result.is_sentry_object,
          velocity: result.close_approach_data[0].relative_velocity.kilometers_per_hour,
          miss_distance: result.close_approach_data[0].miss_distance.kilometers,
          visual_magnitude: result.absolute_magnitude_h,
          close_approach_date: result.close_approach_data[0].close_approach_date_full
        })
      })
      dispatch(SET_DATA(tableData))
      dispatch(SET_CHARTDATA(chartData))
    } catch (error) {
      throw error
    }
  }
)
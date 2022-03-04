import { createSlice } from '@reduxjs/toolkit'
import { RootState } from '../../store'
import { createSelector } from 'reselect'
import { loadTableData } from '../../thunks'


interface InitialTableState {
  isLoading: Boolean
  data: object[] | null
}

const initialState: InitialTableState = {
  isLoading: false,
  data: []
}

const chartDataSlice = createSlice({
  name: 'chartData',
  initialState,
  reducers: {
    SET_CHARTDATA: (state, { payload }) => {
      state.data = payload
    },
    SET_LOADING: (state, { payload }) => {
      state.isLoading = payload
    }
  },
  extraReducers: (builder) => {
    builder.addCase(loadTableData.pending, (state, action) => {
      state.isLoading = true
    })
    builder.addCase(loadTableData.fulfilled, (state, action) => {
      state.isLoading = false
    })
    builder.addCase(loadTableData.rejected, (state, action) => {
      state.isLoading = false
    })
  }
})

export const { SET_CHARTDATA, SET_LOADING } = chartDataSlice.actions

export const selectChartData = createSelector(
  (state: RootState) => state.entities.chartData.data, 
  (data) => data
)

export const selectChartDataLoading = createSelector(
  (state: RootState) => state.entities.chartData.isLoading,
  (isLoading) => isLoading
)

export default chartDataSlice.reducer
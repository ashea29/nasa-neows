import { createSlice } from '@reduxjs/toolkit'
import { RootState } from '../../store'
import { createSelector } from 'reselect'
import { loadTableData } from './tableThunks'
import dayjs from 'dayjs'


interface InitialTableState {
  isLoading: Boolean
  dateParams: {
    defaultStartDate: string
    defaultEndDate: string
    userStartDate?: string | null
    userEndDate?: string | null
  }
  data: Object[] | null
}

const initialState: InitialTableState = {
  isLoading: false,
  dateParams: {
    defaultStartDate: dayjs().format('YYYY-MM-DD'),
    defaultEndDate: dayjs().add(3, 'day').format('YYYY-MM-DD'),
    userStartDate: null,
    userEndDate: null
  },
  data: [1,2,3]
}

const tableDataSlice = createSlice({
  name: 'tableData',
  initialState,
  reducers: {
    SET_USD: (state, { payload }) => {
      state.dateParams.userStartDate = payload
    },
    SET_UED: (state, { payload }) => {
      state.dateParams.userEndDate = payload
    },
    SET_DATA: (state, { payload }) => {
      state.data = payload
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

export const { SET_DATA, SET_USD, SET_UED } = tableDataSlice.actions

export const selectTableData = createSelector(
  (state: RootState) => state.entities.tableData.data, 
  (data) => data
)

export const selectTableDataLoading = createSelector(
  (state: RootState) => state.entities.tableData.isLoading,
  (isLoading) => isLoading
)

export const selectDateParams = createSelector(
  (state: RootState) => state.entities.tableData.dateParams,
  (dateParams) => dateParams
)

export const selectUserStartDate = createSelector(
  (state: RootState) => state.entities.tableData.dateParams,
  (dateParams) => dateParams.userStartDate
)

export const selectDefaultStartDate = createSelector(
  (state: RootState) => state.entities.tableData.dateParams,
  (dateParams) => dateParams.defaultStartDate
)

export const selectUserEndDate = createSelector(
  (state: RootState) => state.entities.tableData.dateParams,
  (dateParams) => dateParams.userEndDate
)

export const selectDefaultEndDate = createSelector(
  (state: RootState) => state.entities.tableData.dateParams,
  (dateParams) => dateParams.defaultEndDate
)

export default tableDataSlice.reducer
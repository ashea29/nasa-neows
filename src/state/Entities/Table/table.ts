import { createSlice } from '@reduxjs/toolkit'
import { RootState } from '../../store'
import { createSelector } from 'reselect'
import { loadTableData } from './tableThunks'


interface InitialTableState {
  isLoading: Boolean
  data: Object[] | null
}

const initialState: InitialTableState = {
  isLoading: false,
  data: null
}

const tableDataSlice = createSlice({
  name: 'tableData',
  initialState,
  reducers: {
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

export const { SET_DATA } = tableDataSlice.actions

export const selectTableData = createSelector(
  (state: RootState) => state.entities.tableData.data, 
  (tableData) => tableData
)

export const selectTableDataLoading = createSelector(
  (state: RootState) => state.entities.tableData.isLoading,
  (isLoading) => isLoading
)

export default tableDataSlice.reducer
import { combineReducers } from '@reduxjs/toolkit'
import tableDataReducer from './Entities/Table/table'
import chartDataReducer from './Entities/Chart/chart'



export default combineReducers({
	tableData: tableDataReducer,
	chartData: chartDataReducer
})
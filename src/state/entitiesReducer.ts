import { combineReducers } from '@reduxjs/toolkit'
import tableDataReducer from './Entities/Table/table'



export default combineReducers({
	tableData: tableDataReducer,

})
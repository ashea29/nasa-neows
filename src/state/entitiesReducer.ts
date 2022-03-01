import { combineReducers } from '@reduxjs/toolkit'
import tableReducer from './Entities/Table/table'



export default combineReducers({
	table: tableReducer,

})
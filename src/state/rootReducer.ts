import { combineReducers } from '@reduxjs/toolkit'
import entitiesReducer from './entitiesReducer'


interface RootReducerTypes {
  entities: any
}

export default combineReducers<RootReducerTypes>({
  entities: entitiesReducer
})
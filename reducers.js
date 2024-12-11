import { combineReducers } from '@reduxjs/toolkit'

import atmReducer from '@/redux/reducer'

const combinedReducer = combineReducers({
  atm: atmReducer,
})

const rootReducer = (state, action) => {
  return combinedReducer(state, action)
}

export default rootReducer

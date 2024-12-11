import { createLogger } from 'redux-logger'
import { configureStore } from '@reduxjs/toolkit'

import rootReducer from '@/reducers'

export const makeStore = () => {
  const logger = createLogger({
    collapsed: true,
  })

  return configureStore({
    devTools: true,
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
  })
}

export const store = makeStore()

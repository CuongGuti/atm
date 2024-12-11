import initialState from './initialState'
import { reducer as truyCapDSATMReducer } from './truyCapDSATM'

const reducers = [truyCapDSATMReducer]

const reducer = (state = initialState, action) => {
  let newState

  switch (action.type) {
    default:
      newState = state
      break
  }

  return reducers.reduce((s, r) => r(s, action), newState)
}

export default reducer

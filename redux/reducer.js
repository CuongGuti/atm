import initialState from './initialState'
import { reducer as truyCapDSATMReducer } from './truyCapDSATM'
import { reducer as truyCapDSNganHangReducer } from './truyCapDSNganHang'

const reducers = [truyCapDSATMReducer, truyCapDSNganHangReducer]

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

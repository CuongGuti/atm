import initialState from './initialState'
import { reducer as capNhatStateReducer } from './capNhatState'
import { reducer as truyCapDSATMReducer } from './truyCapDSATM'
import { reducer as truyCapChiDuongReducer } from './truyCapChiDuong'
import { reducer as truyCapDSNganHangReducer } from './truyCapDSNganHang'

const reducers = [capNhatStateReducer, truyCapDSATMReducer, truyCapChiDuongReducer, truyCapDSNganHangReducer]

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

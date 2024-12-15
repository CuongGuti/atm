import * as R from 'ramda'

import { CAP_NHAT_STATE } from './constants'

export function capNhatState({ prefix = '', stateMoi, ghiDe = false } = {}) {
  return {
    ghiDe,
    prefix,
    stateMoi,
    type: CAP_NHAT_STATE,
  }
}

export function reducer(state, action) {
  switch (action.type) {
    case CAP_NHAT_STATE:
      return {
        ...state,
        [action.prefix]: action.ghiDe
          ? action.stateMoi
          : R.is(Array, action.stateMoi)
            ? [...R.pathOr([], [action.prefix])(state), ...R.pathOr([], ['stateMoi'])(action)]
            : R.is(Object, action.stateMoi)
              ? {
                  ...R.pathOr({}, [action.prefix])(state),
                  ...R.pathOr({}, ['stateMoi'])(action),
                }
              : action.stateMoi,
      }

    default:
      return state
  }
}

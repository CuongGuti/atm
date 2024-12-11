// API

import axios from 'axios'
import * as R from 'ramda'

import { TRUY_CAP_DS_ATM_BAT_DAU, TRUY_CAP_DS_ATM_THANH_CONG, TRUY_CAP_DS_ATM_THAT_BAI } from './constants'

import { API_ATM } from '@/services/config'
import { goiAPIThatBai, goiAPIThanhCong, chuyenClassThanhObjLoi } from '@/utils/common'

export const truyCapDSATM = () => (dispatch) => {
  dispatch({
    type: TRUY_CAP_DS_ATM_BAT_DAU,
  })

  const promise = new Promise((resolve, reject) => {
    const params = {
      limit: 10,
      select: '*',
    }
    const doRequest = axios.get('/v1/atm', {
      ...API_ATM,
      params,
    })

    doRequest.then(
      (ketQua) => {
        const duLieu = R.pathOr(null, ['data'])(ketQua)

        dispatch({
          duLieu,
          type: TRUY_CAP_DS_ATM_THANH_CONG,
        })
        goiAPIThanhCong(duLieu)
        resolve(duLieu)
      },
      (loi) => {
        goiAPIThatBai({ loi })
        reject(loi)
      }
    )
  })

  return promise.catch((loi) => {
    dispatch({
      loi: chuyenClassThanhObjLoi(loi),
      type: TRUY_CAP_DS_ATM_THAT_BAI,
    })
    return loi
  })
}

export const reducer = (state, action) => {
  switch (action.type) {
    case TRUY_CAP_DS_ATM_BAT_DAU:
      return {
        ...state,
        dsATM: {
          ...state.dsATM,
          loi: null,
          dangXuLy: true,
        },
      }

    case TRUY_CAP_DS_ATM_THANH_CONG:
      return {
        ...state,
        dsATM: {
          duLieu: action.duLieu,
          loi: null,
          dangXuLy: false,
        },
      }

    case TRUY_CAP_DS_ATM_THAT_BAI:
      return {
        ...state,
        dsATM: {
          duLieu: [],
          loi: action.loi,
          dangXuLy: false,
        },
      }

    default:
      return state
  }
}

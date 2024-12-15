// API

import axios from 'axios'
import * as R from 'ramda'

import { TRUY_CAP_CHI_DUONG_BAT_DAU, TRUY_CAP_CHI_DUONG_THANH_CONG, TRUY_CAP_CHI_DUONG_THAT_BAI } from './constants'

import { CONFIG } from '@/services/config'
import { goiAPIThatBai, goiAPIThanhCong, chuyenClassThanhObjLoi } from '@/utils/common'

export const truyCapChiDuong =
  ({ viTriBatDau, viTriKetThuc }) =>
  (dispatch) => {
    dispatch({
      type: TRUY_CAP_CHI_DUONG_BAT_DAU,
    })

    const promise = new Promise((resolve, reject) => {
      const doRequest = axios.get(
        `https://maps.googleapis.com/maps/api/directions/json?origin=${viTriBatDau?.latitude},${viTriBatDau?.longitude}&destination=${viTriKetThuc?.latitude},${viTriKetThuc?.longitude}&key=${CONFIG.googleMapKey}`
      )

      doRequest.then(
        (ketQua) => {
          const duLieu = R.pathOr(null, ['data'])(ketQua)

          dispatch({
            duLieu,
            type: TRUY_CAP_CHI_DUONG_THANH_CONG,
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
        type: TRUY_CAP_CHI_DUONG_THAT_BAI,
      })
      return loi
    })
  }

export const reducer = (state, action) => {
  switch (action.type) {
    case TRUY_CAP_CHI_DUONG_BAT_DAU:
      return {
        ...state,
        chiDuong: {
          ...state.chiDuong,
          loi: null,
          dangXuLy: true,
        },
      }

    case TRUY_CAP_CHI_DUONG_THANH_CONG:
      return {
        ...state,
        chiDuong: {
          duLieu: action.duLieu,
          loi: null,
          dangXuLy: false,
        },
      }

    case TRUY_CAP_CHI_DUONG_THAT_BAI:
      return {
        ...state,
        chiDuong: {
          duLieu: [],
          loi: action.loi,
          dangXuLy: false,
        },
      }

    default:
      return state
  }
}

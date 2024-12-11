import 'moment/locale/vi'
import * as R from 'ramda'

const moment = require('moment')
moment().locale('vi')

const coDocument = typeof document !== 'undefined'
const coWindow = typeof window !== 'undefined'

export const ktChuoi = (chuoi) => {
  return R.is(Array, chuoi) && !ktRong(chuoi)
}

export const ktRong = (giaTri) => {
  return R.isNil(giaTri) || R.isEmpty(giaTri)
}

export const truongLoi = (loi) => (loi ? 'truong-co-loi' : '')

export const goiAPIThanhCong = (ketQua) => {}

export const goiAPIThatBai = ({ loi = {}, callback = () => {}, thongSoXuLy }) => {
  if (coDocument && coWindow) {
    const noiDungTuyChinh = loi?.message
    const chiTietLoi = R.pathOr(null, ['response'])(loi) || noiDungTuyChinh

    const trangThai = R.pathOr('', ['status'])(chiTietLoi)
    // const duLieuLoi = R.pathOr('', ['data'])(chiTietLoi)

    // const noiDungHeThong = R.pathOr('', ['data', 'message'])(duLieuLoi)
    // const code = R.pathOr('', ['code'])(duLieuLoi)
    // const tieuDe = R.pathOr(trangThai, ['title'])(duLieuLoi)
    // const moTa = R.pathOr(trangThai, ['description'])(duLieuLoi)
    // const noiDung = R.pathOr(noiDungHeThong, ['message'])(duLieuLoi)

    if (ktRong(chiTietLoi) || trangThai === 500) {
      // Lỗi 500
    }

    if (trangThai === 400) {
      // Lỗi 400
    } else if (trangThai === 401) {
      // Lỗi 401
    } else {
      // Lỗi khác
    }
  }
}

export const truyCapCookie = (name = '') => {
  if (coDocument && name) {
    const value = '; ' + document.cookie
    const parts = value.split('; ' + name + '=')

    if (R.equals(parts.length, 2)) {
      return parts.pop().split(';').shift()
    }
  }

  return ''
}

export const chuyenClassThanhObjLoi = (_class) => {
  return {
    message: _class?.message,
    response: {
      data: _class?.response?.data,
      status: _class?.response?.status,
    },
  }
}

export const ttStore = (store) => {
  // Thuộc tính Store
  const dispatch = store?.dispatch
  const state = store?.getState()
  const atm = state?.atm

  return {
    ...atm,
    dispatch,
  }
}

import React, { useEffect } from 'react'
import * as R from 'ramda'
import { Link } from 'expo-router'
import { useSelector } from 'react-redux'
import { StyleSheet, Text, View, Image } from 'react-native'

import { store } from '@/store'
import { truyCapDSNganHang } from '@/actions'

const TrangChu = () => {
  const atm = useSelector((state) => state?.atm)
  const { dispatch } = store
  const { dsNganHang } = atm

  const duLieuDSNganHang = R.pathOr([], ['duLieu'])(dsNganHang)

  useEffect(() => {}, [])

  useEffect(() => {
    dispatch(truyCapDSNganHang())
  }, [dispatch])

  return (
    <View style={styles.trang}>
      <Text style={styles.tieuDe}>Chọn ngân hàng</Text>
      {duLieuDSNganHang.map((ngan_hang, i) => {
        const { logo, ma } = ngan_hang || {}

        return (
          <Link
            href={{
              pathname: '/ds-atm',
              params: { id: ma },
            }}
            key={i}
            style={styles.lienKet}
          >
            <Image resizeMode="contain" source={{ uri: logo }} style={styles.hinh} />
          </Link>
        )
      })}
    </View>
  )
}

const styles = StyleSheet.create({
  trang: {
    flex: 1,
    backgroundColor: '#25292e',
    alignItems: 'center',
    justifyContent: 'center',
  },
  tieuDe: {
    color: '#fff',
    fontSize: 20,
    marginBottom: 20,
    fontWeight: 600,
  },
  nut: {
    padding: 10,
    fontSize: 20,
    color: '#000',
    borderRadius: 15,
    backgroundColor: '#FFF',
    marginBottom: 10,
  },
  hinh: {
    paddingTop: 10,
    paddingRight: 20,
    paddingBottom: 10,
    paddingLeft: 20,
    borderRadius: 10,
    width: 200,
    height: 100,
    backgroundColor: '#FFF',
  },
  lienKet: {
    marginBottom: 20,
  },
})

export default TrangChu

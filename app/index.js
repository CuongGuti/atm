import React, { useEffect } from 'react'
import * as R from 'ramda'
import { Link } from 'expo-router'
import { Provider } from 'react-redux'
import { StatusBar } from 'expo-status-bar'
import { StyleSheet, Text, View, Image } from 'react-native'

import { store } from '@/store'
import { truyCapDSNganHang } from '@/actions'
import { ttStore } from '@/utils/common'

const App = () => {
  const { dispatch, dsNganHang } = ttStore(store)

  const duLieuDSNganHang = R.pathOr([], ['duLieu'])(dsNganHang)

  useEffect(() => {
    dispatch(truyCapDSNganHang())
  }, [dispatch])

  return (
    <Provider store={store}>
      <View style={styles.trang}>
        <Text style={styles.tieuDe}>Chọn ngân hàng</Text>
        {duLieuDSNganHang.map((ngan_hang, i) => {
          const { ten_goi, logo } = ngan_hang || {}

          return (
            <View key={i}>
              <Image resizeMode="contain" source={{ uri: logo }} style={styles.hinh} />
              <Text style={styles.tieuDe}>{ten_goi}</Text>
            </View>
          )
        })}
        <Link href="/huong-dan" style={styles.nut}>
          Xem hướng dẫn
        </Link>
        <Link href="/huong" style={styles.nut}>
          Not Found
        </Link>
        <StatusBar style="auto" />
      </View>
    </Provider>
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
    marginBottom: 10,
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
    width: 200,
    height: 100,
  },
})

export default App

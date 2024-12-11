import React, { useEffect } from 'react'
import * as R from 'ramda'
import { Link } from 'expo-router'
import { Provider } from 'react-redux'
import { StatusBar } from 'expo-status-bar'
import { StyleSheet, Text, View } from 'react-native'

import { store } from '@/store'
import { truyCapDSATM } from '@/actions'
import { ttStore } from '@/utils/common'

const App = () => {
  const { dispatch, dsATM } = ttStore(store)

  const duLieuDSATM = R.pathOr([], ['duLieu'])(dsATM)

  useEffect(() => {
    dispatch(truyCapDSATM())
  }, [dispatch])

  return (
    <Provider store={store}>
      <View style={styles.app}>
        <Text style={styles.tieuDe}>Chọn ngân hàng</Text>
        {duLieuDSATM.map((atm, i) => {
          const { ten } = atm || {}

          return (
            <Text key={i} style={styles.tieuDe}>
              {ten}
            </Text>
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
  app: {
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
})

export default App

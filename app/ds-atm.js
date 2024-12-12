import React, { useEffect } from 'react'
import * as R from 'ramda'
import { StatusBar } from 'expo-status-bar'
import { StyleSheet, Text, View } from 'react-native'

import { store } from '@/store'
import { truyCapDSATM } from '@/actions'
import { ttStore } from '@/utils/common'

const DSATM = () => {
  const { dispatch, dsATM } = ttStore(store)

  const duLieuDSATM = R.pathOr([], ['duLieu'])(dsATM)

  useEffect(() => {
    dispatch(truyCapDSATM())
  }, [dispatch])

  return (
    <View style={styles.trang}>
      <Text style={styles.tieuDe}>Chọn ATM</Text>
      {duLieuDSATM.map((atm, i) => {
        const { ten } = atm || {}

        return (
          <Text key={i} style={styles.tieuDe}>
            {ten}
          </Text>
        )
      })}
      <StatusBar style="auto" />
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

export default DSATM

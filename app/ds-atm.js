import { useEffect, useState, useRef } from 'react'
import * as R from 'ramda'
import MapView, { Marker, Polyline, PROVIDER_GOOGLE } from 'react-native-maps'
import { useSelector } from 'react-redux'
import { useLocalSearchParams } from 'expo-router'
import { StyleSheet, View, Text } from 'react-native'
import Geolocation from '@react-native-community/geolocation'
import { decode } from '@mapbox/polyline'

import { ktRong } from '@/utils/common'
import { store } from '@/store'
import { truyCapDSATM, truyCapChiDuong } from '@/actions'

const DSATM = () => {
  const [viTriHienTai, capNhatViTriHienTai] = useState(null)
  const [viTriATM, capNhatViTriATM] = useState(null)
  const [ttATM, capNhatTTATM] = useState(null)
  const [duongDi, capNhatDuongDi] = useState(null)

  const mapRef = useRef(null)
  const { id } = useLocalSearchParams()
  const atm = useSelector((state) => state?.atm)
  const { dispatch } = store
  const { dsATM, chiDuong } = atm

  const duLieuDSATM = R.pathOr([], ['duLieu'])(dsATM)

  useEffect(() => {
    dispatch(truyCapDSATM({ ma_ngan_hang: id }))
  }, [id, dispatch])

  useEffect(() => {
    Geolocation.getCurrentPosition((duLieu) => {
      // capNhatViTriHienTai(duLieu.coords)
      capNhatViTriHienTai({
        latitude: 10.730612,
        longitude: 106.734933,
        latitudeDelta: 0.02,
        longitudeDelta: 0.02,
      })
    })
  }, [])

  useEffect(() => {
    if (!ktRong(viTriHienTai) && !ktRong(viTriATM)) {
      dispatch(
        truyCapChiDuong({
          viTriBatDau: viTriHienTai,
          viTriKetThuc: viTriATM,
        })
      )
    }
  }, [dispatch, viTriHienTai, viTriATM])

  const duLieuChiDuong = R.pathOr({}, ['duLieu'])(chiDuong)
  const duongDiDauTien = R.pathOr({}, ['routes', 0])(duLieuChiDuong)
  const { overview_polyline, legs, bounds } = duongDiDauTien || {}
  const thongTinChiDuong = R.pathOr({}, [0])(legs)
  const { distance, duration } = thongTinChiDuong || {}

  useEffect(() => {
    if (!ktRong(overview_polyline)) {
      const dsDiem = decode(R.pathOr([], ['points'])(overview_polyline))
      const dsToaDo = dsDiem.map((diem, index) => {
        return {
          latitude: diem[0],
          longitude: diem[1],
        }
      })

      capNhatDuongDi(dsToaDo)
    }
  }, [overview_polyline])

  useEffect(() => {
    if (!ktRong(bounds)) {
      const southwest = bounds?.southwest
      const northeast = bounds?.northeast
      const dsToaDo = [
        { latitude: southwest?.lat, longitude: southwest?.lng },
        { latitude: northeast?.lat, longitude: northeast?.lng },
      ]

      if (mapRef.current) {
        mapRef.current.fitToCoordinates(dsToaDo, {
          edgePadding: { top: 120, right: 100, bottom: 150, left: 100 },
          animated: true,
        })
      }
    }
  }, [bounds])

  const khoiTaoBanDo = !ktRong(duLieuDSATM)

  return (
    <View style={styles.trang}>
      {khoiTaoBanDo && (
        <MapView
          ref={mapRef}
          style={styles.banDo}
          provider={PROVIDER_GOOGLE}
          initialRegion={viTriHienTai}
          zoomControlEnabled={false}
          showsMyLocationButton={false}
        >
          {duLieuDSATM.map((atm, i) => {
            const { ten, vi_do, kinh_do, dia_chi, may_nop_tien } = atm || {}

            return (
              <Marker
                key={i}
                // title={ten}
                // description={diaChi}
                style={styles.viTriATM}
                coordinate={{ latitude: vi_do, longitude: kinh_do }}
                icon={{
                  uri: 'https://i.ibb.co/cLP3PYz/Techcombank-Mini.png',
                }}
                onPress={(e) => {
                  capNhatTTATM({
                    ten,
                    dia_chi,
                    may_nop_tien,
                  })
                  capNhatViTriATM(e.nativeEvent.coordinate)
                }}
              />
            )
          })}
          {viTriHienTai && (
            <Marker
              style={styles.viTriHienTai}
              coordinate={viTriHienTai}
              icon={{
                uri: 'https://i.ibb.co/GJK7PMT/walking.png',
              }}
            />
          )}
          {duongDi && <Polyline coordinates={duongDi} strokeWidth={4} />}
        </MapView>
      )}
      {viTriATM && (
        <View style={styles.thongTinATM}>
          <Text style={styles.vanBan2}>{ttATM?.ten}</Text>

          <Text style={styles.vanBan3}>{ttATM?.dia_chi}</Text>
          <Text style={styles.vanBan1}>
            {ttATM?.may_nop_tien ? '💵 Có nộp tiền' : ''}&nbsp;&nbsp;&nbsp;🚙 {distance?.text || '-'}
            &nbsp;&nbsp;&nbsp;🕒 {Math.round(duration?.value / 60) || '-'} phút
          </Text>
        </View>
      )}
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
  banDo: {
    width: '100%',
    height: '100%',
  },
  viTriATM: {
    borderRadius: 10,
    backgroundColor: '#FFF',
  },
  viTriHienTai: {
    borderRadius: 10,
    backgroundColor: '#FF0000',
  },
  thongTinATM: {
    padding: 10,
    left: 10,
    right: 10,
    bottom: 10,
    color: '#000',
    borderRadius: 10,
    position: 'absolute',
    backgroundColor: '#FFF',
    zIndex: 10,
    opacity: 0.85,
  },
  vanBan1: {
    fontSize: 16,
    textAlign: 'center',
  },
  vanBan2: {
    fontSize: 16,
    fontWeight: 600,
    textAlign: 'center',
  },
  vanBan3: {
    fontSize: 15,
    textAlign: 'center',
    borderBottomWidth: 1,
    borderBottomColor: 'lightgrey',
    paddingBottom: 5,
    marginBottom: 5,
  },
})

export default DSATM

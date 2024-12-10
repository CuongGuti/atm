import { Link } from 'expo-router'
import { StatusBar } from 'expo-status-bar'
import { StyleSheet, Text, View } from 'react-native'

const App = () => {
  return (
    <View style={styles.app}>
      <Text style={styles.tieuDe}>Chọn ngân hàng</Text>
      <Link href="/huong-dan" style={styles.nut}>
        Xem hướng dẫn
      </Link>
      <Link href="/huong" style={styles.nut}>
        Not Found
      </Link>
      <StatusBar style="auto" />
    </View>
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

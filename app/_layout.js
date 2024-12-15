import 'react-native-reanimated'

import { useEffect } from 'react'
import { Stack } from 'expo-router'
import { useFonts } from 'expo-font'
import { Provider } from 'react-redux'
import { useColorScheme } from 'react-native'
import * as SplashScreen from 'expo-splash-screen'
import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native'

import { store } from '@/store'

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync()

const RootLayout = () => {
  const colorScheme = useColorScheme()
  const [loaded] = useFonts({
    SpaceMono: require('@/assets/fonts/SpaceMono-Regular.ttf'),
  })

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync()
    }
  }, [loaded])

  if (!loaded) {
    return null
  }

  return (
    <Provider store={store}>
      <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
        <Stack>
          <Stack.Screen name="(tabs)" options={{ headerShown: false, title: 'Đổi ngân hàng' }} />
          <Stack.Screen name="ds-atm" options={{ title: 'ATM' }} />
          <Stack.Screen name="+not-found" options={{ title: 'Lỗi' }} />
        </Stack>
      </ThemeProvider>
    </Provider>
  )
}

export default RootLayout

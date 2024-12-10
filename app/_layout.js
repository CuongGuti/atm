import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native'
import { Stack } from 'expo-router'
import { useFonts } from 'expo-font'
import { StatusBar } from 'expo-status-bar'
import { useColorScheme } from 'react-native'
import * as SplashScreen from 'expo-splash-screen'
import { useEffect } from 'react'
import 'react-native-reanimated'

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync()

export default function RootLayout() {
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
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <Stack>
        <Stack.Screen name="index" options={{ headerShown: false, title: 'ATM' }} />
        <Stack.Screen name="huong-dan" options={{ title: 'Hướng dẫn' }} />
        <Stack.Screen name="+not-found" />
      </Stack>
      <StatusBar style="auto" />
    </ThemeProvider>
  )
}

import { Tabs } from 'expo-router'
import { useColorScheme, Platform } from 'react-native'
import MaterialIcons from '@expo/vector-icons/MaterialIcons'

import { Colors } from '@/constants'
import { HapticTab } from '@/components/HapticTab'
import TabBarBackground from '@/components/TabBarBackground'

const TabLayout = () => {
  const colorScheme = useColorScheme()

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
        headerShown: false,
        tabBarButton: HapticTab,
        tabBarBackground: TabBarBackground,
        tabBarStyle: Platform.select({
          ios: {
            // Use a transparent background on iOS to show the blur effect
            position: 'absolute',
          },
          default: {},
        }),
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'ATM',
          tabBarIcon: ({ color }) => <MaterialIcons name="local-atm" size={28} color={color} />,
        }}
      />
      <Tabs.Screen
        name="huong-dan"
        options={{
          title: 'Hướng dẫn',
          tabBarIcon: ({ color }) => <MaterialIcons name="question-answer" size={28} color={color} />,
        }}
      />
    </Tabs>
  )
}

export default TabLayout

import { View } from 'react-native'

import { useThemeColor } from '@/hooks/useThemeColor'

const ThemedView = ({ style, lightColor, darkColor, ...otherProps }) => {
  const backgroundColor = useThemeColor({ props: { light: lightColor, dark: darkColor }, colorName: 'background' })

  return <View style={[{ backgroundColor }, style]} {...otherProps} />
}

export default ThemedView

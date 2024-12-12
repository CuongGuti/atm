import { StyleSheet, Image } from 'react-native'

import IconSymbol from '@/components/IconSymbol'
import ThemedText from '@/components/ThemedText'
import ThemedView from '@/components/ThemedView'
import Collapsible from '@/components/Collapsible'
import ExternalLink from '@/components/ExternalLink'
import ParallaxScrollView from '@/components/ParallaxScrollView'

const TrangHuongDan = () => {
  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#D0D0D0', dark: '#353636' }}
      headerImage={
        <IconSymbol
          size={310}
          color="#808080"
          name="chevron.left.forwardslash.chevron.right"
          style={styles.headerImage}
        />
      }
    >
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">Hướng dẫn sử dụng</ThemedText>
      </ThemedView>
      <ThemedText>Lorem ipsum</ThemedText>
      <Collapsible title="Lorem ipsum 1">
        <ThemedText>
          Lorem ipsum: <ThemedText type="defaultSemiBold">Lorem ipsum</ThemedText> Lorem ipsum&nbsp;
          <ThemedText type="defaultSemiBold">Lorem ipsum</ThemedText>
        </ThemedText>
        <ThemedText>Lorem ipsum</ThemedText>
        <ExternalLink href="https://docs.expo.dev/router/introduction">
          <ThemedText type="link">Learn more</ThemedText>
        </ExternalLink>
      </Collapsible>
      <Collapsible title="Lorem ipsum 2">
        <ThemedText>Lorem ipsum</ThemedText>
      </Collapsible>
      <Collapsible title="Lorem ipsum 3">
        <ThemedText>
          Lorem ipsum <ThemedText type="defaultSemiBold">@2x</ThemedText> and&nbsp;
          <ThemedText type="defaultSemiBold">@3x</ThemedText> Lorem ipsum
        </ThemedText>
        <Image source={require('@/assets/images/react-logo.png')} style={{ alignSelf: 'center' }} />
        <ExternalLink href="https://reactnative.dev/docs/images">
          <ThemedText type="link">Learn more</ThemedText>
        </ExternalLink>
      </Collapsible>
      <Collapsible title="Lorem ipsum">
        <ThemedText>
          Lorem ipsum <ThemedText type="defaultSemiBold">Lorem ipsum</ThemedText> Lorem ipsum&nbsp;
          <ThemedText style={{ fontFamily: 'SpaceMono' }}>Lorem ipsum</ThemedText>
        </ThemedText>
        <ExternalLink href="https://docs.expo.dev/versions/latest/sdk/font">
          <ThemedText type="link">Learn more</ThemedText>
        </ExternalLink>
      </Collapsible>
    </ParallaxScrollView>
  )
}

const styles = StyleSheet.create({
  headerImage: {
    color: '#808080',
    bottom: -90,
    left: -35,
    position: 'absolute',
  },
  titleContainer: {
    flexDirection: 'row',
    gap: 8,
  },
})

export default TrangHuongDan

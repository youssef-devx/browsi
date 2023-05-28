import { useMemo, useContext } from "react"
import { useWindowDimensions, StyleSheet, TouchableOpacity, View, Text } from 'react-native'
import Animated, {
  useSharedValue,
  withTiming,
  useAnimatedStyle,
  Easing,
} from 'react-native-reanimated'
import Constants from 'expo-constants'
import { Feather } from '@expo/vector-icons'
import { MainContext } from "../MainContext"

export default function Screen({
    component,
    title,
    iconName,
    iconSize,
    iconOnPress,
    screenVisible,
    onHideScreenPress
  }) {
  const { isDark, tabs, setTabs } = useContext(MainContext)
  const { width, height } = useWindowDimensions()
  const lAnim = useSharedValue(screenVisible ? 0 : width)

  const extraStyles = useMemo(() => ({
    backgroundColor: isDark ? '#0b0b0c' : '#ffffff',
    width, height
  }), [isDark, width, height])

  const animStyle = useAnimatedStyle(() => {
    return {
      left: withTiming(screenVisible ? 0 : lAnim.value, { duration: 150 }),
    }
  })

  lAnim.value = screenVisible ? 0 : width

  return <Animated.View style={[extraStyles, styles.container, animStyle]}>
    <View style={styles.flexLogoAndIcon}>
        <View style={{flexDirection: "row", alignItems: "center"}}>
          <TouchableOpacity onPress={onHideScreenPress}>
            <Feather
              name="arrow-left"
              size={28}
              color={isDark ? "white" : "#0b0b0c"}
            />
          </TouchableOpacity>
          <Text style={[{ color: isDark ? '#ffffff' : '#0b0b0c', marginLeft: 12 }, styles.title]}>
            {title}
          </Text>
        </View>
        <Feather
          name={iconName} size={iconSize} color={isDark ? "grey" : "#0b0b0c"}
          onPress={iconOnPress}
        />
      </View>
      {component}
  </Animated.View>
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: "absolute",
    paddingTop: Constants.statusBarHeight + 12,
    paddingHorizontal: 20,
  },
  flexLogoAndIcon: {
    marginBottom: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: {
    fontWeight: 'bold',
    fontSize: 24,
  }
})
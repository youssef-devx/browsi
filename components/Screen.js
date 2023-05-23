import { useMemo } from "react"
import { useWindowDimensions, Platform, BackHandler, StyleSheet, TouchableOpacity, View, Text } from 'react-native'
import Animated, {
  useSharedValue,
  withTiming,
  useAnimatedStyle,
  Easing,
} from 'react-native-reanimated'
import Constants from 'expo-constants'
import { MainContext } from '../MainContext'
import { Feather } from '@expo/vector-icons'

export default function Screen({ isDark, component, title, iconName, iconOnPress }) {
  const { width, height } = useWindowDimensions()
  // const slideOutAnim = useSharedValue(showScreens.tabs ? width : 0)
  // const slideBackAnim = useSharedValue(showScreens.tabs ? 0 : width)

  /* function slideOut() {
  //   // Will change slideAnim value to 1 in 5 seconds
  //   Animated.timing(slideInAnim, {
  //     toValue: width,
  //     duration: 1500,
  //     useNativeDriver: true,
  //   }).start()
  // }*/

  /* function slideBack() {
  //   // Will change slideAnim value to 0 in 3 seconds
  //   Animated.timing(slideBackAnim, {
  //     toValue: 0,
  //     duration: 1500,
  //     useNativeDriver: true,
  //   }).start()
  // }*/
  const extraStyles = useMemo(() => ({
    // flex: showScreens.tabs ? 1 : 0,
    // display: showScreens.tabs ? "flex" : "none",
    backgroundColor: isDark ? '#0b0b0c' : '#ffffff',
    width,height
    // zIndex: showScreens.tabs ? 10 : -1,
  }), [])

  const animStyle = useAnimatedStyle(() => {
    return {
      // left: withTiming(showScreens.tabs ? slideBackAnim.value : slideOutAnim.value, { duration: 150 }),
    }
  })

  function backToPreviousScreen() {}

  return <Animated.View style={[extraStyles, styles.container, animStyle]}>
    <View style={styles.flexLogoAndIcon}>
        <View style={{flexDirection: "row", alignItems: "center"}}>
          <TouchableOpacity onPress={backToPreviousScreen}>
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
          name={iconName} size={32} color={isDark ? "grey" : "#0b0b0c"}
          onPress={iconOnPress}
        />
      </View>
      {component}
  </Animated.View>
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: "relative",
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
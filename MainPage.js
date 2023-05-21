import { useRef, useContext, useState, useEffect, useMemo } from 'react';
import { Platform, BackHandler, Text, TextInput, TouchableOpacity, View, StyleSheet, useWindowDimensions } from 'react-native'
import Animated, {
  useSharedValue,
  withTiming,
  useAnimatedStyle,
  Easing,
} from 'react-native-reanimated'
import Constants from 'expo-constants'
import PinnedSites from './components/PinnedSites'
import BottomPanel from './components/BottomPanel'
import { Feather } from '@expo/vector-icons'
import { MainContext } from "./MainContext"


export default function MainPage() {
  const {
    isDark,
    showScreens,
    setShowScreens,
    prevRoutes,
    setPrevRoutes,
    route,
    setRoute,
    tabs,
    setTabs
  } = useContext(MainContext)
  const { width, height } = useWindowDimensions();
  const slideOutAnim = useSharedValue(0)
  const slideBackAnim = useSharedValue(width)

  // function slideIn() {
  //   // Will change slideAnim value to 1 in 5 seconds
  //   Animated.timing(slideInAnim, {
  //     toValue: width,
  //     duration: 1500,
  //     useNativeDriver: true,
  //   }).start();
  // };

  // function slideBack() {
  //   // Will change slideAnim value to 0 in 3 seconds
  //   Animated.timing(slideBackAnim, {
  //     toValue: 0,
  //     duration: 1500,
  //     useNativeDriver: true,
  //   }).start();
  // };
  const extraStyles = useMemo(() => ({
    // flex: showScreens.mainPage ? 1 : 0,
    // display: showScreens.mainPage ? "flex" : "none",
    backgroundColor: isDark ? '#0b0b0c' : '#ffffff',
    zIndex: showScreens.mainPage ? 10 : -10,
    width,
    height,
  }), [showScreens])

  const animStyle = useAnimatedStyle(() => {
    return {
      left: withTiming(showScreens.tabs ? slideBackAnim.value : slideOutAnim.value, { duration: 150 }),
    };
  })

  useEffect(() => {
    if (Platform.OS === 'android') {
      BackHandler.addEventListener('hardwareBackPress', () => {
        slideOutAnim.value = width
        slideBackAnim.value = 0
        return true
      });
      return () => {
        BackHandler.removeEventListener('hardwareBackPress', () => {
          slideOutAnim.value = width
          slideBackAnim.value = 0
          return true
        });
      };
    }
  }, []);

  return (
    <Animated.View style={[extraStyles, styles.container, animStyle]}>
      <Text style={[{color: isDark ? "#ffffff" : "#0b0b0c"}, styles.logo]}>Browsi</Text>
      {/* <PinnedSites isDark={isDark}/> */}
      <View style={styles.searchContainer}>
        <Feather
          name="search"
          size={24}
          color={isDark ? "grey" : "#ffffff"}
          style={styles.searchIcon}
        />
        <TextInput
          style={[{backgroundColor: isDark ? "#171717" : "#ffffff", color: isDark ? "grey" : "#0b0b0c"}, styles.searchInput]}
          placeholder="Search any thing"
          placeholderTextColor={isDark ? "grey" : "#ffffff"}
        />
      </View>
      <BottomPanel isDark={isDark} setRoute={setRoute} tabs={tabs} setTabs={setTabs}/>
    </Animated.View>
  )
}

export function Button({ style, children }) {
  const [opacity, setOpacity] = useState(1)
  function onPress() {
    const timer = setInterval(() => {
      setOpacity(currOpacity => {
        if(currOpacity === 1) clearInterval(timer)
        return currOpacity = currOpacity + .10
      })
    }, 10)
  }

  return <View style={[styles.button, {opacity},style]} onPress={onPress} >
    {children}
  </View>
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: "absolute",
    alignItems: 'center',
    padding: 32,
    paddingTop: Constants.statusBarHeight,
  },
  logo: {
    margin: 24,
    fontSize: 40,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  searchContainer: {
    position: "relative",
    flexDirection: "row",
    alignItems: "center",
    alignSelf: "center",
    marginTop: 64,
  },
  searchInput: {
    borderRadius: 12,
    paddingVertical: 12,
    paddingRight: 12,
    paddingLeft: 48,
    width: "100%"
  },
  searchIcon: {
    position: "absolute",
    zIndex: 1,
    left: 12,
  }
})
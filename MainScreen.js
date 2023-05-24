import { useRef, useContext, useState, useEffect, useMemo } from 'react'
import { Platform, BackHandler, Text, TextInput, TouchableOpacity, View, StyleSheet, useWindowDimensions } from 'react-native'
import Constants from 'expo-constants'
import PinnedSites from './components/PinnedSites'
import BottomPanel from './components/BottomPanel'
import { Feather } from '@expo/vector-icons'
import { MainContext } from "./MainContext"


export default function MainScreen() {
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
  const { width, height } = useWindowDimensions()

  const extraStyles = useMemo(() => ({
    backgroundColor: isDark ? '#0b0b0c' : '#ffffff',
    width,
    height,
  }), [isDark])

  useEffect(() => {
    if (Platform.OS === 'android') {
      BackHandler.addEventListener('hardwareBackPress', () => {
        return true
      })
      return () => {
        BackHandler.removeEventListener('hardwareBackPress', () => {
          return true
        })
      }
    }
  }, [])

  return (
    <View style={[extraStyles, styles.container]}>
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
      <BottomPanel isDark={isDark} webViewProps={{}} onAndroidBackPress={() => console.log('From main screen')}/>
    </View>
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
    elevation: 1,
    left: 12,
  }
})
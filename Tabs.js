import { useContext, useState, useEffect, useMemo, memo } from 'react'
import Constants from 'expo-constants'
import { FlatList, Platform, BackHandler, ScrollView, TouchableOpacity, View, Text, StyleSheet, useWindowDimensions } from 'react-native'
import Animated, {
  useSharedValue,
  withTiming,
  useAnimatedStyle,
  Easing,
} from 'react-native-reanimated'
import { MainContext } from './MainContext'
import { Feather } from '@expo/vector-icons'
import Tab from './components/Tab'
import Screen from './components/Screen'

export default function Tabs() {
  const {
    isDark,
    showScreens,
    setShowScreens,
    prevRoute,
    setPrevRoute,
    prevRoutes,
    setPrevRoutes,
    route,
    setRoute,
    tabs,
    setTabs,
    setUrl,
  } = useContext(MainContext)
  const { width, height } = useWindowDimensions()
  const slideOutAnim = useSharedValue(showScreens.tabs ? width : 0)
  const slideBackAnim = useSharedValue(showScreens.tabs ? 0 : width)

  // function slideOut() {
  //   // Will change slideAnim value to 1 in 5 seconds
  //   Animated.timing(slideInAnim, {
  //     toValue: width,
  //     duration: 1500,
  //     useNativeDriver: true,
  //   }).start()
  // }

  // function slideBack() {
  //   // Will change slideAnim value to 0 in 3 seconds
  //   Animated.timing(slideBackAnim, {
  //     toValue: 0,
  //     duration: 1500,
  //     useNativeDriver: true,
  //   }).start()
  // }
  const extraStyles = useMemo(() => ({
    // flex: showScreens.tabs ? 1 : 0,
    // display: showScreens.tabs ? "flex" : "none",
    backgroundColor: isDark ? '#0b0b0c' : '#ffffff',
    zIndex: showScreens.tabs ? 10 : -1,
    width,
    height,
  }), [showScreens])

  const animStyle = useAnimatedStyle(() => {
    return {
      left: withTiming(showScreens.tabs ? slideBackAnim.value : slideOutAnim.value, { duration: 150 }),
    }
  })

  function backToPreviousScreen() {
    slideOutAnim.value = width
    slideBackAnim.value = 0
    // prevRoute = prevRoute ? prevRoute : "mainPage"
    // console.log("$$$$$$$$$$$$$$$$$$$$$$$$$")
    // console.log("Going from:", route)
    // console.log("Arriving at:", prevRoutes.tabs)
    // console.log("$$$$$$$$$$$$$$$$$$$$$$$$$")
    setShowScreens(currValue => ({
      ...currValue,
      [prevRoutes[route]]: true,
      tabs: false,
    }))
    setPrevRoutes(currVlaue => ({
      ...currVlaue,
      tabs: prevRoutes.tabs,
      [prevRoutes.tabs]: "tabs"
    }))
    setRoute(prevRoutes.tabs)

    return true
  }
  
  function addTab() {
    setTabs((currTabs) => [
      ...currTabs,
      { tabName: 'Default Search Engine', tabUrl: 'https://wiki.com/' },
    ])
    // setShowScreens(currValue => ({...currValue, mainPage: true, tabs: false}))
    // setRoute("mainPage")
    // setPrevRoute("tabs")
  }
  
  
  return <Screen
            isDark={isDark}
            component={<Component tabs={tabs} setTabs={setTabs} />}
            title={`Tabs ${tabs.length}`}
            iconName="plus"
            iconOnPress={addTab}
          />
}

export function Component({ tabs }) {
  return <ScrollView contentContainerStyle={{ flexDirection: "row", flexWrap: "wrap"}} >
    {tabs.map(({ tabName }, idx) => (
      <Tab
        key={idx}
        marginRight={idx % 2 === 0 ? 12 : 0}
        // marginBottom={idx % 2 === 0 ? 12 : 0}
        tabName={tabName}
        idx={idx}
      />
    ))}
  </ScrollView>
}
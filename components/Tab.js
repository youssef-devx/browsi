import { useContext, useState, useEffect, useRef, useMemo, memo } from 'react'
import Constants from 'expo-constants'
import { TouchableOpacity, View, Text, StyleSheet, useWindowDimensions } from 'react-native'
import Animated, {
  useSharedValue,
  withTiming,
  useAnimatedStyle,
  Easing,
  FadeInRight, FadeInLeft
} from 'react-native-reanimated'
import { Feather } from '@expo/vector-icons'
import WebView from 'react-native-webview'
// import ViewWithoutOverflow  from './ViewWithoutOverflow'

export default memo(function Tab({ isDark, marginRight, idx, width, tabName, tabUrl, setTabs, setUrl, setShowScreens, setPrevRoute, setRoute, moreStyles }) {
  const [show, setShow] = useState(false)
  const [displayWebView, setDisplayWebView] = useState(false)
  const tabRef = useRef(null)
  const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = useWindowDimensions()
  const TAB_WIDTH = (width / 2) - (marginRight) - 20

  const scaleUpAnim = useSharedValue(displayWebView ? 0.5 : 1)
  const scaleDownAnim = useSharedValue(displayWebView ? 1 : 0.5)
  // console.log(marginRight, idx,  (width / 2) - 12 - 20)

  const showOrHideStyles = {
    bottom: show ? 56 : -100,
    right: show ? 12 : -100,
  }

  const animStyle = useAnimatedStyle(() => {
    return {
      scale: withTiming(displayWebView ? scaleUpAnim.value : scaleDownAnim.value, { duration: 150 }),
      opacity: withTiming(displayWebView ? scaleUpAnim.value : scaleDownAnim.value, { duration: 150 }),
    }
  })

  function deleteTab() {
    // setTabs((currTabs) => [...currTabs.filter((_, idx) => idx !== tabIdx)])
  }

  function navigateToTab() {
    const isWebView = tabUrl !== "mainPage"

    if(!isWebView) {
      setRoute("mainPage")
      // setTabs(currTabs => {
      //   const theRoute = currTabs.find(tab => tab.tabIdx === tabIdx)
      //   return [...currTabs.filter(tab => tab.tabIdx !== tabIdx), theRoute]
      // })
      // ///////////////
      setShowScreens(currValue => ({...currValue, mainPage: true, tabs: false}))
      setPrevRoute("tabs")
    } else {
      setUrl(tabUrl)
      // /////////////
      setShowScreens(currValue => ({...currValue, webPagesRouter: true, tabs: false}))
      setRoute("webPagesRouter")
      setPrevRoute("tabs")
    }
  }
console.log(displayWebView)
  return <><TouchableOpacity
      ref={tabRef}
      style={[{
        overflow:"visible",
        backgroundColor: isDark ? '#171717' : '#f7f7f7',
        width: TAB_WIDTH, marginRight }, styles.tab, moreStyles]}
      onPress={() => setDisplayWebView(!displayWebView)}
    >
    <View
      style={{
        flex: 1,
        borderTopLeftRadius: 12,
        borderTopRightRadius: 12,
      }}
      >
      <Feather name="globe" size={40} color={isDark ? "grey" : "#0b0b0c"}
          style={{top: "50%", left: "50%", transform: [{translateY: -(40 / 2)}, {translateX: -(40 / 2)}]}}
        />
    </View>
    
  {/* <Animated.View
        entering={FadeInRight}
        style={[{
          flex: 1,
          position: "absolute",
          // scale: 1,
          width: SCREEN_WIDTH,
          height: SCREEN_HEIGHT,
          top: -100,
          left: 0,
          // zIndex: 100,

          }]}>
        <WebView
          androidLayerType={'hardware'}
          // startInLoadingState={true}
          scalesPageToFit={true}
          style={[styles.webView, {
            // pointerEvents: "none",
            width: displayWebView ? SCREEN_WIDTH : TAB_WIDTH,
            height: displayWebView ? SCREEN_HEIGHT : 100,
            borderRadius: 12,
            backgroundColor: "yellow",
            padding: 10,
            position: "absolute",
            // top: "-100%",
            scale: 1,
            borderWidth: 10,
            borderColor: "red",
            // opacity: 0,
          }]}
          source={{uri: "https://wiki.com/"}}
        />
      </Animated.View> */}
      <Text numberOfLines={1} style={[{ color: isDark ? 'grey' : '#0b0b0c' }, styles.tabName]}>
      {tabName} youssef
    </Text>
  </TouchableOpacity>
  </>
})

const styles = StyleSheet.create({
  tab: {
    height: 128,
    marginBottom: 12,
    // padding: 16,
    borderRadius: 12,
    // position: "relative"
  },
  webView: {
    flex: 1,
  },
  tabName: {
    width: "100%",
    fontSize: 12,
    padding: 12,
    borderBottomLeftRadius: 12,
    borderBottomRightRadius: 12,
    backgroundColor: "#292929"
  },
  more: { position: 'relative' },
  menu: {
    flex: 1,
    gap: 12,
    padding: 12,
    borderRadius: 12,
    position: 'absolute',
  },
  menuItem: { flex: 1, flexDirection: 'row', alignItems: 'center', gap: 8 }
})
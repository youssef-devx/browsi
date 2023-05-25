import { useContext, useState, useRef, useEffect, memo } from "react"
/*import { TouchableWithoutFeedback, Keyboard, View, StyleSheet, BackHandler, Platform, useWindowDimensions } from "react-native"
import Constants from 'expo-constants'
import SearchBar from "./SearchBar"
import BottomPanel from "./components/BottomPanel"
import WebView from "react-native-webview"
import { MainContext } from "./MainContext"
import Animated, {
  useSharedValue,
  withTiming,
  withDelay,
  useAnimatedStyle,
  Easing,
} from "react-native-reanimated"
import { Feather } from "@expo/vector-icons"
import { SERP_API_KEY } from "@env"

export default memo(function WebViewScreen({ idx }) {
  const {
    isDark,
    tabs,
    setTabs,
    setTabsVisible,
    setSheetArr
  } = useContext(MainContext)
  const [url, setUrl] = useState(tabs[idx].tabUrl)
  const [title, setTitle] = useState("")
  const [message, setMessage] = useState("")
  const [webViewProps, setWebViewProps] = useState({
    canGoBack: false,
    canGoForward: false,
    loading: true,
  })
  const [searchQuery, setSearchQuery] = useState("")
  const [showSuggestions, setShowSuggestions] = useState(false)
  const [suggestions, setSuggestions] = useState([
    {value: "Start typing to show suggestions."}
  ])
  const {width, height} = useWindowDimensions()
  const TAB_WIDTH = (width - 40 - 12) / 2
  const DEFAULT_TOP = 100 * idx
  const DEFAULT_LEFT = idx % 2 === 0 ? 20 : 20 + TAB_WIDTH + 12
  const oAnim = useSharedValue(0)
  const xAnim = useSharedValue(DEFAULT_LEFT)
  const yAnim = useSharedValue(DEFAULT_TOP)
  const wAnim = useSharedValue(TAB_WIDTH)
  const hAnim = useSharedValue(128)
  const brAnim = useSharedValue(12)
  const dropDownYAnim = useSharedValue(webViewProps.loading ? 40 : Constants.statusBarHeight + 12)
  const webViewRef = useRef(null)
  const jsCode = `
  window.ReactNativeWebView.postMessage(window.document.querySelector('head link[rel="shortcut icon"]').href)
  true // note: this is required, or you'll sometimes get silent failures
`

  const animStyle = useAnimatedStyle(() => {
    return {
      opacity: withDelay(150, withTiming(oAnim.value, { duration: 150 })),
      top: withTiming(yAnim.value, { duration: 150 }),
      left: withTiming(xAnim.value, { duration: 150 }),
      width: withTiming(wAnim.value, { duration: 150 }),
      height: withTiming(hAnim.value, { duration: 150 }),
      borderRadius: withTiming(brAnim.value, { duration: 150 }),
    }
  })

  const onAndroidBackPress = () => {
    if (webViewRef.current) {
      webViewRef.current.goBack()
      return true // prevent default behavior (exit app)
    }
    return false
  }

  oAnim.value = tabs[idx].visible ? 1 : 0
  xAnim.value = tabs[idx].visible ? 0 : DEFAULT_LEFT
  yAnim.value = tabs[idx].visible ? 0 : DEFAULT_TOP
  wAnim.value = tabs[idx].visible ? width : TAB_WIDTH
  hAnim.value = tabs[idx].visible ? height : 128
  brAnim.value = tabs[idx].visible ? 0 : 12
  dropDownYAnim.value = webViewProps.loading ? -40 : Constants.statusBarHeight

  useEffect(() => {
    // setSheetArr(currVal => ([
    //   ...currVal,
    //   { label: `${webViewProps.loading ? "Hide" : "Show"} SearchBar`,
    //     icon: <Feather name="search" size={24} color={isDark ? "white" : "#0b0b0c"}/>,
    //     onPress: () => {setShowStatusBar(true);setShowBottomSheet(false)},
    //     showOption: () => tabs.find(tab => tab.visible === true).length > 0
    //   }
    // ]))

    if (Platform.OS === 'android') {
      BackHandler.addEventListener('hardwareBackPress', onAndroidBackPress)
      return () => {
        BackHandler.removeEventListener('hardwareBackPress', onAndroidBackPress)
      }
    }
  }, [])
  
  function onWebViewNavigationStateChange(navState) {
    setWebViewProps(currProps => ({
      ...currProps,
      ...navState  
    }))
  }

  function onLoadStart(e) {
    const { nativeEvent } = e
    setWebViewProps(currProps => ({
      ...currProps,
      title: nativeEvent.title,
      canGoBack: nativeEvent.canGoBack,
      canGoForward: nativeEvent.canGoForward,
      loading: nativeEvent.loading
    }))
  }

  function onLoadProgress(e) {
    const { nativeEvent } = e
    setWebViewProps(currProps => ({
      ...currProps,
      progress: nativeEvent.progress
    }))
  }

  function onLoadEnd(e) {
    const { nativeEvent } = e
    setWebViewProps(currProps => ({
      ...currProps,
      title: nativeEvent.title,
      canGoBack: nativeEvent.canGoBack,
      canGoForward: nativeEvent.canGoForward,
      loading: nativeEvent.loading
    }))
  }

  function onMessage(e) {
    setMessage(e.nativeEvent.data)
    // console.log(e.nativeEvent.data, 'this one')
  }

  async function getSuggestions(str) {
    const data = await fetch(`https://serpapi.com/search.json?engine=google_autocomplete&q=${str}&api_key=${SERP_API_KEY}`)
                        .then(res => res.json())
                        .catch(err => console.log(err))
    setSuggestions(data["suggestions"].slice(10))
  }

  function onChangeText(str) {
    setShowSuggestions(true)
    setTimeout(() => {setSearchQuery(str);getSuggestions(str)}, 250)
  }

  function onSuggestionPress(query) {
    setTabsVisible(true)
    setTabs(currVal => ([
      ...currVal,
      { tabName: `${query} - Google Search`, tabUrl: `https://google.com/search?q=${query}`, visible: true },
    ]))
    Keyboard.dismiss()
    setShowSuggestions(false)
  }

  return <Animated.View
    onPress={() => {}}
    pointerEvents={tabs[idx].visible ? "auto" : "none"}
    style={[{
      position: "absolute", overflow: "hidden", 
      backgroundColor: isDark ? "#171717" : "white"},
      animStyle
    ]}
  >
    <SearchBar
      isDark={isDark}
      title={title}
      url={url}
      setUrl={setUrl}
      webViewRef={webViewRef}
      webViewProps={webViewProps}
      setWebViewProps={setWebViewProps}
      message={message}
    />
    <WebView
      source={{ uri: url }}
      style={{
        flex: 1,
        marginTop: Constants.statusBarHeight,
      }}
      ref={webViewRef}
      onNavigationStateChange={onWebViewNavigationStateChange}
      onLoadEnd={e => onLoadEnd(e)}
      onLoadProgress={e => onLoadProgress(e)}
      onLoadStart={e => onLoadStart(e)}
      injectedJavaScript={jsCode}
      onError={() => {}}
      // onMessage={e => {console.log(e, 'ee');onMessage(e)}}
    />
    <BottomPanel isDark={isDark} webViewProps={webViewProps} onAndroidBackPress={onAndroidBackPress}/>
  </Animated.View>
})

const styles = StyleSheet.create({})*/
import { useContext, useState, useRef, useEffect, memo, useMemo } from "react"
import { TouchableWithoutFeedback, Keyboard, View, StyleSheet, BackHandler, Platform, useWindowDimensions } from "react-native"
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
    bookMarks,
    setBookMarks,
    pinnedWebsites,
    setPinnedWebsites,
    setSheetArr,
    setShowBottomSheet,
    setShowSearchBar
  } = useContext(MainContext)
  const [url, setUrl] = useState(tabs[idx].tabUrl)
  const [title, setTitle] = useState("")
  const [webViewProps, setWebViewProps] = useState({
    canGoBack: false,
    canGoForward: false,
    loading: true,
  })
  const [searchQuery, setSearchQuery] = useState("")
  const [showSuggestions, setShowSuggestions] = useState(false)
  const [suggestions, setSuggestions] = useState([])
  const {width, height} = useWindowDimensions()
  const TAB_WIDTH = useMemo(() => (width - 40 - 12) / 2, [width])
  const DEFAULT_TOP = useMemo(() => 100 * idx, [idx])
  const DEFAULT_LEFT = useMemo(() => idx % 2 === 0 ? 20 : 20 + TAB_WIDTH + 12, [idx, TAB_WIDTH])
  const oAnim = useSharedValue(0)
  const xAnim = useSharedValue(DEFAULT_LEFT)
  const yAnim = useSharedValue(DEFAULT_TOP)
  const wAnim = useSharedValue(TAB_WIDTH)
  const hAnim = useSharedValue(128)
  const brAnim = useSharedValue(12)
  const dropDownYAnim = useSharedValue(webViewProps.loading ? 40 : Constants.statusBarHeight + 12)
  const webViewRef = useRef(null)

  const jsCode = `
  const selector = 'head link[rel="shortcut icon"], head link[rel="icon"], head link[rel="apple-touch-icon"]'
  const imagesTypes = [".ico", ".png", ".gif", ".svg"]
  let favIcon = ""

  const res = [...document.querySelectorAll(selector)].map(l => {
    return imagesTypes.map(t => l.href && l.href.endsWith(t) ? l.href : null)
  }).flat().filter(l => l && l)
  
  favIcon = res.length > 0 ? res[0] : ""
  window.ReactNativeWebView.postMessage(favIcon)
  true // note: this is required, or you'll sometimes get silent failures
`
  const animStyle = useAnimatedStyle(() => {
    return {
      opacity: withDelay(75, withTiming(oAnim.value, { duration: 75 })),
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

  // oAnim.value = tabs[idx].visible ? 1 : 0
  // xAnim.value = tabs[idx].visible ? 0 : DEFAULT_LEFT
  // yAnim.value = tabs[idx].visible ? 0 : DEFAULT_TOP
  // wAnim.value = tabs[idx].visible ? width : TAB_WIDTH
  // hAnim.value = tabs[idx].visible ? height : 128
  // brAnim.value = tabs[idx].visible ? 0 : 12
  // dropDownYAnim.value = webViewProps.loading ? -40 : Constants.statusBarHeight

  oAnim.value = useMemo(() => tabs[idx].visible ? 1 : 0, [tabs[idx].visible, ])
  xAnim.value = useMemo(() => tabs[idx].visible ? 0 : DEFAULT_LEFT, [tabs[idx].visible, DEFAULT_LEFT])
  yAnim.value = useMemo(() => tabs[idx].visible ? 0 : DEFAULT_TOP, [tabs[idx].visible, DEFAULT_TOP])
  wAnim.value = useMemo(() => tabs[idx].visible ? width : TAB_WIDTH, [tabs[idx].visible, width, TAB_WIDTH])
  hAnim.value = useMemo(() => tabs[idx].visible ? height : 128, [tabs[idx].visible, height])
  brAnim.value = useMemo(() => tabs[idx].visible ? 0 : 12, [tabs[idx].visible, ])
  dropDownYAnim.value = useMemo(() => webViewProps.loading ? -40 : Constants.statusBarHeight, [webViewProps.loading, Constants.statusBarHeight])

  useEffect(() => {
    console.log(url, bookMarks.map((b, i) => {console.log(i === idx && b.pageUrl);return b.pageUrl}).includes(url))
    tabs[idx].visible && setSheetArr([
      { label: "Toogle SearchBar",
        icon: <Feather name="search" size={24} color={isDark ? "white" : "#0b0b0c"}/>,
        onPress: () => {setShowSearchBar(currVal => !currVal);setShowBottomSheet(false)},
      },
      { label: bookMarks.map(b => b.pageUrl).includes(url) ? "Unbookmark" : "Bookmark",
        icon: <Feather name="bookmark" size={24} color={isDark ? "white" : "#0b0b0c"}/>,
        onPress: () => {toggleToBookMarks();setShowBottomSheet(false)}
      },
      { label: pinnedWebsites.map(p => p.pageUrl).includes(url) ? "Unpin" : "Pin",
        icon: <Feather name={`${pinnedWebsites.map(p => p.pageUrl).includes(url) ? "minus" : "plus"}-circle`} size={24} color={isDark ? "white" : "#0b0b0c"}/>,
        onPress: () => {toggleToPinnedWebsites();setShowBottomSheet(false)}
      }
    ])

    if (Platform.OS === 'android') {
      BackHandler.addEventListener('hardwareBackPress', onAndroidBackPress)
      return () => {
        BackHandler.removeEventListener('hardwareBackPress', onAndroidBackPress)
      }
    }
  }, [tabs[idx].visible, bookMarks, pinnedWebsites])
  
  function onWebViewNavigationStateChange(navState) {
    setWebViewProps(currProps => ({
      ...currProps,
      ...navState  
    }))
  }
console.log(bookMarks[idx].pageUrl, url, tabs[idx].tabUrl)

  function toggleToBookMarks() {
    setBookMarks(currVal => {
      if(bookMarks.map(b => b.pageUrl).includes(url)) {
        return [...currVal.filter(bookMark => bookMark.pageUrl !== url)]
      } else {
        return [
          { pageTitle: webViewProps.title, pageUrl: url },
          ...currVal
        ]
      }
    })
  }

  function toggleToPinnedWebsites() {
    setPinnedWebsites(currVal => {
      if(pinnedWebsites.length < 6) {
        if(pinnedWebsites.map(p => p.pageUrl).includes(url)) {
          return [...currVal.filter(pinnedWebsite => pinnedWebsite.pageUrl !== url)]
        } else {
          return [
            { pageTitle: webViewProps.title, pageUrl: url },
            ...currVal
          ]
        }
      } else {
        setBookMarks(currVal => ([
          { pageTitle: webViewProps.title, pageUrl: url },
          ...currVal
        ]))
        console.log('Saved to bookmarks')
      }
    })
  }

  function onLoadStart(e) {
    const { nativeEvent } = e
    setUrl(nativeEvent.url)
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
    setUrl(nativeEvent.url)
    setWebViewProps(currProps => ({
      ...currProps,
      title: nativeEvent.title,
      canGoBack: nativeEvent.canGoBack,
      canGoForward: nativeEvent.canGoForward,
      loading: nativeEvent.loading
    }))
  }

  function onMessage(e) {
    setWebViewProps(currVal => ({
      ...currVal,
      favIcon: e.nativeEvent.data
    }))

    setTabs(currVal => ([
      ...currVal.map((tab, tIdx) => tIdx === idx ? { ...tab, favIcon: e.nativeEvent.data } : tab)
    ]))
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
      onMessage={onMessage}
    />
    <BottomPanel isDark={isDark} webViewProps={webViewProps} onAndroidBackPress={onAndroidBackPress}/>
  </Animated.View>
})

const styles = StyleSheet.create({})
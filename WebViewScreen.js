import { useContext, useState, useRef, useEffect, memo } from "react";
import { View, StyleSheet, BackHandler, Platform, useWindowDimensions } from "react-native"
import Constants from 'expo-constants';
import SearchBar from "./SearchBar"
import BottomPanel from "./components/BottomPanel"
import WebView from "react-native-webview"
import { MainContext } from "./MainContext";
import Animated, {
  useSharedValue,
  withTiming,
  useAnimatedStyle,
  Easing,
} from "react-native-reanimated";

export default memo(function WebViewScreen({ idx }) {
  const {
    isDark,
    tabs
  } = useContext(MainContext)
  const [url, setUrl] = useState(tabs[idx].tabUrl)
  const [title, setTitle] = useState("")
  const [message, setMessage] = useState("")
  const [webViewProps, setWebViewProps] = useState({
    canGoBack: false,
    canGoForward: false,
    loading: true,
    loaded: false
  })
  const {width, height} = useWindowDimensions()
  const TAB_WIDTH = (width - 40 - 12) / 2
  // const TOP = tabProps.visible ? parseInt(height / 2) : 0
  // const LEFT = tabProps.visible ? parseInt(width / 2) : 0
  const DEFAULT_TOP = 100 * idx
  const DEFAULT_LEFT = idx % 2 === 0 ? 20 : 20 + TAB_WIDTH + 12
  const oAnim = useSharedValue(0)
  const xAnim = useSharedValue(DEFAULT_LEFT)
  const yAnim = useSharedValue(DEFAULT_TOP)
  const wAnim = useSharedValue(TAB_WIDTH)
  const hAnim = useSharedValue(128)
  const brAnim = useSharedValue(12)
  const webViewRef = useRef(null);
  const vRef = useRef(null);
  const jsCode = `
  window.ReactNativeWebView.postMessage(window.document.querySelector('head link[rel="shortcut icon"]').href)
  true; // note: this is required, or you'll sometimes get silent failures
`;

  const animStyle = useAnimatedStyle(() => {
    return {
      opacity: withTiming(oAnim.value, { duration: 150 }),
      top: withTiming(yAnim.value, { duration: 150 }),
      left: withTiming(xAnim.value, { duration: 150 }),
      width: withTiming(wAnim.value, { duration: 150 }),
      height: withTiming(hAnim.value, { duration: 150 }),
      borderRadius: withTiming(brAnim.value, { duration: 150 }),
    }
  })

  const onAndroidBackPress = () => {
    if (webViewRef.current) {
      webViewRef.current.goBack();
      return true; // prevent default behavior (exit app)
    }
    return false;
  };

  oAnim.value = tabs[idx].visible ? 1 : 0
  xAnim.value = tabs[idx].visible ? 0 : DEFAULT_LEFT
  yAnim.value = tabs[idx].visible ? 0 : DEFAULT_TOP
  wAnim.value = tabs[idx].visible ? width : TAB_WIDTH
  hAnim.value = tabs[idx].visible ? height : 128
  brAnim.value = tabs[idx].visible ? 0 : 12

  useEffect(() => {
    if (Platform.OS === 'android') {
      BackHandler.addEventListener('hardwareBackPress', onAndroidBackPress);
      return () => {
        BackHandler.removeEventListener('hardwareBackPress', onAndroidBackPress);
      };
    }
  }, []);
  
  function onWebViewNavigationStateChange(navState) {
    setWebViewProps(currProps => ({
      ...currProps,
      title: navState.title,
      canGoBack: navState.canGoBack,
      canGoForward: navState.canGoForward,
      loading: navState.loading
    }))
  }

  function onLoadEnd(navState) {
    setWebViewProps(currProps => ({
      ...currProps,
      title: navState.title,
      canGoBack: navState.canGoBack,
      canGoForward: navState.canGoForward,
      loading: navState.loading
    }))
  }
  function onLoadStart(navState) {
    setWebViewProps(currProps => ({
      ...currProps,
      title: navState.title,
      canGoBack: navState.canGoBack,
      canGoForward: navState.canGoForward,
      loading: navState.loading
    }))
  }

  function onMessage(e) {
    setMessage(e.nativeEvent.data)
    // console.log(e.nativeEvent.data, 'this one')
  }
  // top: TOP, left: LEFT,transform: [{translateX: animate ? -50 : 0},{translateY: animate ? -50 : 0}],width: 100, height: 100,
// console.log(tabs[idx].visible, idx)
// console.log(tabs.find((x,i)=>`${x.visible}, ${i}`))
// console.log(tabs.map(x=>x.visible))
  return <Animated.View
    onPress={() => {}}
    pointerEvents={tabs[idx].visible ? "auto" : "none"}
    style={[{
      // elevation: (Platform.OS === 'android') && tabs[idx].visible ? 1 : 0,
      // zIndex: (Platform.OS === 'android') && tabs[idx].visible ? 1 : 0,
      position: "absolute", overflow: "hidden", 
      backgroundColor: isDark ? "#171717" : "white"},
      animStyle
    ]}
  >
      <View ref={vRef}/>
    <SearchBar isDark={isDark} title={title} url={url} setUrl={setUrl} webViewRef={webViewRef} webViewProps={webViewProps} setWebViewProps={setWebViewProps} message={message}/>
    <WebView
      source={{ uri: url }}
      style={{
        flex: 1,
        marginTop: Constants.statusBarHeight,
      }}
      ref={webViewRef}
      onNavigationStateChange={onWebViewNavigationStateChange}
      onLoadEnd={(navState) => onLoadEnd(navState)}
      onLoadStart={(navState) => onLoadStart(navState)}
      injectedJavaScript={jsCode}
      onError={() => {}}
      // onMessage={e => {console.log(e, 'ee');onMessage(e)}}
      // onLoadEnd={(syntheticEvent) => setWebViewProps(currValue => ({...currValue, loaded: true}))}
    />
    <BottomPanel isDark={isDark} webViewProps={webViewProps} onAndroidBackPress={onAndroidBackPress}/>
  </Animated.View>
})

const styles = StyleSheet.create({
})
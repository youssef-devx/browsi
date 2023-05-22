import { useContext, useState, useRef, useEffect, memo } from "react";
import {View, Text, StyleSheet, BackHandler, Platform, useWindowDimensions } from "react-native"
import Constants from 'expo-constants';
import SearchBar from "./SearchBar"
import BottomPanel from "./components/BottomPanel"
import WebView from "react-native-webview"
import { MainContext } from "./MainContext";

export default memo(function WebViewScreen() {
  const {
    isDark,
    tabs,
  } = useContext(MainContext)
  const [url, setUrl] = useState('https://wiki.com/')
  const [title, setTitle] = useState("")
  const [message, setMessage] = useState("")
  const [canGoBack, setCanGoBack] = useState(false)
  const [canGoForward, setCanGoForward] = useState(false)
  const [loading, setLoading] = useState(true)
  const [webViewProps, setWebViewProps] = useState({
    canGoBack: false,
    canGoForward: false,
    loading: true,
    loaded: false
  })
  const {width, height} = useWindowDimensions()
  const webViewRef = useRef(null);
  const jsCode = `
  window.ReactNativeWebView.postMessage(window.document.querySelector('head link[rel="shortcut icon"]').href)
  true; // note: this is required, or you'll sometimes get silent failures
`;

  const onAndroidBackPress = () => {
    if (webViewRef.current) {
      webViewRef.current.goBack();
      return true; // prevent default behavior (exit app)
    }
    return false;
  };

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
    console.log(e.nativeEvent.data, 'this one')
  }

  return <View style={[{ width, height, backgroundColor: isDark ? "#171717" : "white"}]}>
    <SearchBar isDark={isDark} title={title} url={url} setUrl={setUrl} webViewRef={webViewRef} webViewProps={webViewProps} setWebViewProps={setWebViewProps} message={message}/>
    <WebView
      source={{ uri: url }}
      style={{
        // flex: showScreens.webPage ? 1 : 0,
        // display: showScreens.webPage ? "flex" : "none",
        flex: 1,
        marginTop: Constants.statusBarHeight,
        // backgroundColor: "red",
      }}
      ref={webViewRef}
      onNavigationStateChange={onWebViewNavigationStateChange}
      onLoadEnd={(navState) => onLoadEnd(navState)}
      onLoadStart={(navState) => onLoadStart(navState)}
      injectedJavaScript={jsCode}
      onMessage={e => {console.log(e, 'ee');onMessage(e)}}
      // onLoadEnd={(syntheticEvent) => setWebViewProps(currValue => ({...currValue, loaded: true}))}
    />
    <BottomPanel isDark={isDark} canGoBack={webViewProps.canGoBack} canGoForward={webViewProps.canGoForward} onAndroidBackPress={onAndroidBackPress}/>
  </View>
})

const styles = StyleSheet.create({
})
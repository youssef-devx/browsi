import { useContext, useState, useRef, useEffect } from "react";
import {View, StyleSheet, BackHandler, Platform, useWindowDimensions } from "react-native"
import Constants from 'expo-constants';
import SearchBar from "./SearchBar"
import BottomPanel from "./components/BottomPanel"
import WebView from "react-native-webview"
import { MainContext } from "./MainContext";

export default function WebPagesRouter() {
  const { 
    isDark,
    showScreens,
    tabs,
    setTabs,
  } = useContext(MainContext)
  const webPages = tabs.filter(tab => tab.tabUrl !== "mainPage")


  return <View style={[{display: showScreens.webPagesRouter ? "flex" : "none"}, styles.container]}>
    {webPages.map((webPage, idx) => (
      <WebPage
        key={idx}
        isDark={isDark}
        url={webPage.tabUrl}
      />
    ))}
  </View>
}

export function WebPage({ isDark, url: uri }) {
  const [title, setTitle] = useState("")
  const [url, setUrl] = useState(uri)
  const [canGoBack, setCanGoBack] = useState(false)
  const [canGoForward, setCanGoForward] = useState(false)
  const {width, height} = useWindowDimensions()

  const webViewRef = useRef(null);
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
    // console.log(navState)
    setTitle(navState.title)
    setCanGoBack(navState.canGoBack)
    setCanGoForward(navState.canGoForsetCanGoForward)
  }

  return <View style={[{width, height}, styles.webPage]}>
  <SearchBar isDark={isDark} title={title} url={url} setUrl={setUrl}/>
  <WebView
    source={{ uri: url }}
    style={styles.webPageContainer}
    onNavigationStateChange={onWebViewNavigationStateChange}
    ref={webViewRef}
    // onLoadEnd={(syntheticEvent) => setWebViewProps(currValue => ({...currValue, loaded: true}))}
  />
  <BottomPanel isDark={isDark} onAndroidBackPress={onAndroidBackPress}/>
</View>
}

const styles = StyleSheet.create({
  continer: {
    flex: 1,
    marginTop: Constants.statusBarHeight,
  },
  webPageContainer: {
    flex: 1,
    marginTop: Constants.statusBarHeight,
  }
})
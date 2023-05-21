import { useContext, useState, useRef, useEffect } from "react";
import {View, Text, StyleSheet, BackHandler, Platform, useWindowDimensions } from "react-native"
import Constants from 'expo-constants';
import SearchBar from "./SearchBar"
import BottomPanel from "./components/BottomPanel"
import WebView from "react-native-webview"
import { MainContext } from "./MainContext";

export default function WebPage() {
  const {
    isDark,
    showScreens,
    url,
    setUrl,
    setRoute,
    tabs,
    setTabs
  } = useContext(MainContext)
  const [title, setTitle] = useState("")
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

  return <View style={[{ zIndex: routeIdx | tabIdx , width, height}, styles.webPage]}>
    <SearchBar isDark={isDark} title={title} url={url} setUrl={setUrl}/>
    <WebView
      source={{ uri: url }}
      style={{
        flex: showScreens.webPage ? 1 : 0,
        display: showScreens.webPage ? "flex" : "none",
        marginTop: Constants.statusBarHeight,
      }}
      onNavigationStateChange={onWebViewNavigationStateChange}
      ref={webViewRef}
      // onLoadEnd={(syntheticEvent) => setWebViewProps(currValue => ({...currValue, loaded: true}))}
    />
    <BottomPanel isDark={isDark} setRoute={setRoute} tabs={tabs} setTabs={setTabs} canGoBack={canGoBack} canGoForward={canGoForward} onAndroidBackPress={onAndroidBackPress}/>
  </View>
}

const styles = StyleSheet.create({
  webPage: {
    // flex: 1,
    position: "absolute",
    // top: 0,
    // left: 0,
    // bottom: 0,
    // right: 0,
  }
})
import { useState, useContext } from "react"
import {View, Text, Image, StyleSheet, TouchableOpacity} from "react-native"
import Constants from 'expo-constants';
import { Feather } from "@expo/vector-icons";
import Animated, {
  useSharedValue,
  withTiming,
  useAnimatedStyle,
  Easing,
} from 'react-native-reanimated'
import { MainContext } from "./MainContext";

export default function SearchBar({ isDark, url, setUrl, webViewRef, webViewProps, message }) {
  const { showSearchBar } = useContext(MainContext)
  const yAnim = useSharedValue(showSearchBar ? Constants.statusBarHeight + 12 : -56)
  const [favicon, setFavicon] = useState("")
  // console.log(message)

  const searchBarStyle = useAnimatedStyle(() => {
    return {
      top: withTiming(yAnim.value, { duration: 150 }),
    }
  })

  yAnim.value = showSearchBar ? Constants.statusBarHeight + 12 : -56

  function injectJS() {
    // webViewRef.current.injectJavaScript(`window.webkit.messageHandlers.ReactNativeWebView.postMessage("hello apple pay")`)
  }

  function onReloadOrStopReload (){
    webViewProps.loading ? webViewRef.current.stopLoading() : webViewRef.current.reload()
  }

  return <Animated.View style={[{ backgroundColor: isDark ? '#171717' : '#fdfdfd' } , styles.searchBar, searchBarStyle]}>
    <View style={{flexDirection: "row", alignItems: "center" }}>
      { message ? <Image source={{uri: message}}
       style={{width: 28, height: 28, borderRadius: 8}} /> : <Feather
        name="globe"
        size={28}
        color={isDark ? "grey" : "white"}
      />}
      <TouchableOpacity style={{marginLeft: 12}} onPress={() => {setUrl("https://wiki32.com")}}>
        <Text style={{color: isDark ? "grey" : "#0b0b0c"}} numberOfLines={1}>{webViewProps.title}</Text>
      </TouchableOpacity>
    </View>
    <TouchableOpacity style={{alignSelf: "center"}} onPress={onReloadOrStopReload}>
      <Feather name={webViewProps.loading ? "x" : "rotate-ccw"} size={24} color={isDark ? 'grey' : '#0b0b0c'}/>
    </TouchableOpacity>
  </Animated.View>
}

const styles = StyleSheet.create({
  searchBar: {
    position: "absolute",
    zIndex: 100,
    width: "85%",
    flexDirection: "row",
    alignSelf: "center",
    justifyContent: "space-between",
    padding: 12,
    borderRadius: 12
  },
  title: {
    backgroundColor: 'red',
  }
})
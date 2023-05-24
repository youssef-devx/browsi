import { useState } from "react"
import {View, Text, Image, StyleSheet, TouchableOpacity} from "react-native"
import Constants from 'expo-constants';
import { Feather } from "@expo/vector-icons";
import Animated, {
  useSharedValue,
  withTiming,
  useAnimatedStyle,
  Easing,
} from 'react-native-reanimated'

export default function SearchBar({ isDark, url, setUrl, webViewRef, webViewProps, setWebViewProps, message }) {
  // const slideUpVal = useSharedValue(webViewProps.loading ?  : 0)
  const [favicon, setFavicon] = useState("")
  // console.log(message)

  function injectJS() {
    // webViewRef.current.injectJavaScript(`window.webkit.messageHandlers.ReactNativeWebView.postMessage("hello apple pay")`)
  }

  return <View style={[{ backgroundColor: isDark ? '#171717' : '#fdfdfd' } , styles.searchBar]}>
    <View style={{flexDirection: "row", alignItems: "center" }}>
      { message ? <Image source={{uri: message}}
       style={{width: 28, height: 28, borderRadius: 8}} /> : <Feather
        name="globe"
        size={28}
        color={isDark ? "grey" : "white"}
      />}
      <TouchableOpacity style={{marginLeft: 12}} onPress={() => {setUrl("https://wiki32.com")}}>
        <Text style={{color: isDark ? "grey" : "#0b0b0c"}}>{webViewProps.title}</Text>
      </TouchableOpacity>
    </View>
    <TouchableOpacity style={{alignSelf: "center"}} onPress={() => webViewProps.loading ? webViewRef.current.stopLoading() : webViewRef.current.reload()}>
      <Feather name={webViewProps.loading ? "x" : "rotate-ccw"} size={24} color={isDark ? 'grey' : '#0b0b0c'}/>
    </TouchableOpacity>
  </View>
}

const styles = StyleSheet.create({
  searchBar: {
    position: "absolute",
    zIndex: 100,
    width: "85%",
    flexDirection: "row",
    alignSelf: "center",
    justifyContent: "space-between",
    top: Constants.statusBarHeight + 12,
    padding: 12,
    borderRadius: 12
  },
  title: {
    backgroundColor: 'red',
  }
})
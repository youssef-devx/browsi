import { useState, useContext } from "react"
import {View, Text, Image, StyleSheet, TouchableOpacity,useWindowDimensions} from "react-native"
import Constants from 'expo-constants';
import { Feather } from "@expo/vector-icons";
import Animated, {
  useSharedValue,
  withTiming,
  useAnimatedStyle,
  Easing,
} from 'react-native-reanimated'
import { MainContext } from "./MainContext";

export default function SearchBar({ isDark, url, setUrl, webViewRef, webViewProps }) {
  const { showSearchBar } = useContext(MainContext)
  const { width: SCREEN_WIDTH } = useWindowDimensions()
  const BAR_WIDTH = 85 * SCREEN_WIDTH / 100
  const yAnim = useSharedValue(showSearchBar ? Constants.statusBarHeight + 12 : -56)
  const wAnim = useSharedValue(webViewProps.progress ? (webViewProps.progress * 100) * BAR_WIDTH / 100 : 0)

  const searchBarStyle = useAnimatedStyle(() => {
    return {
      top: withTiming(yAnim.value, { duration: 150 }),
    }
  })
  const progressBarStyle = useAnimatedStyle(() => {
    return {
      width: withTiming(wAnim.value, { duration: 100 }),
    }
  })

  yAnim.value = showSearchBar ? Constants.statusBarHeight + 12 : -56
  wAnim.value = webViewProps.progress ? (webViewProps.progress * 100) * BAR_WIDTH / 100 : 0

  function onReloadOrStopReload (){
    wAnim.value = 0
    webViewProps.loading ? webViewRef.current.stopLoading() : webViewRef.current.reload()
  }

  return <Animated.View style={[{ width: BAR_WIDTH, backgroundColor: isDark ? '#171717' : '#fdfdfd' } , styles.searchBar, searchBarStyle]}>
    <View style={{flexDirection: "row", alignItems: "center" }}>
      { webViewProps.favIcon ? <Image source={{uri: webViewProps.favIcon}}
        style={{width: 28, height: 28, borderRadius: 8}} /> : <Feather
        name="globe"
        size={28}
        color={isDark ? "grey" : "white"}
      />}
      <TouchableOpacity style={{marginLeft: 12}} onPress={() => {setUrl("https://wiki32.com")}}>
        <Text style={{ width: BAR_WIDTH - 100, color: isDark ? "grey" : "#0b0b0c"}} numberOfLines={1}>{webViewProps.title}</Text>
      </TouchableOpacity>
    </View>
    <TouchableOpacity style={{alignSelf: "center"}} onPress={onReloadOrStopReload}>
      <Feather name={webViewProps.loading ? "x" : "rotate-ccw"} size={24} color={isDark ? 'grey' : '#0b0b0c'}/>
    </TouchableOpacity>
    { webViewProps.progress ? <Animated.View style={[styles.progressBar, progressBarStyle]}/> : null }
  </Animated.View>
}

const styles = StyleSheet.create({
  searchBar: {
    position: "absolute",
    zIndex: 100,
    flexDirection: "row",
    alignSelf: "center",
    justifyContent: "space-between",
    padding: 12,
    borderRadius: 12,
  },
  progressBar: {
    position: "absolute",
    bottom: 0,
    backgroundColor: 'yellow',
    height: 4,
    borderBottomLeftRadius: 6,
    borderBottomRightRadius: 6,
  }
})
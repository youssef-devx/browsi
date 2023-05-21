import { View, Text, StyleSheet, useWindowDimensions } from "react-native"
import { useState, } from "react"
import Animated, {
  Extrapolate,
  interpolate,
  useAnimatedProps,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
} from 'react-native-reanimated';


export default function BottomSheet({ isDark, sheetArr, show, setShow, showBottomSheet, setShowBottomSheet }) {
  const { height: SCREEN_HEIGHT } = useWindowDimensions()
  const extraStyles = {
    position: "absolute",
    // top: SCREEN_HEIGHT / 1.5,
    bottom: 64,
    backgroundColor: isDark ? "#171717" : "white",
    borderRadiusTop: 24,
    borderRadiusRight: 24
  }

  const containerAnimStyle = {}
  const sheetAnimStyle = {}
  const sheetItemAnimStyle = {}
  
  return <Animated.View style={[styles.container, containerAnimStyle]}>
    {/* <View stye={styles.overlay}/> */}
    <View style={styles.bar}/>
    <Animated.View style={[extraStyles, sheetAnimStyle]}>
      {sheetArr.map((sheetItem, idx) => (
        <Animated.View style={[styles.sheetItem, sheetItemAnimStyle]}>
          {sheetItem.icon}
          <Text style={{ marginLeft: 32 }}>{sheetItem.label}</Text>
        </Animated.View>
      ))}
    </Animated.View>
  </Animated.View>
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyItems: "center",
    alignItems: "center",
    position: "relative",
    backgroundColor: "#00000050"
  },
  // overlay: { flex: 1, position: "absolute" },
  bar: { width: 100, backgroundColor: "#333333" },
  sheet: {},
  sheetItem: { flexDirection: "row" }
})
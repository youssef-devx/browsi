import { TouchableOpacity, TouchableWithoutFeedback, View, Text, StyleSheet, useWindowDimensions } from "react-native"
import { useState, useContext } from "react"
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import { MainContext } from "../MainContext";


export default function BottomSheet() {
  const { isDark, sheetArr, showBottomSheet, setShowBottomSheet } = useContext(MainContext)
  const { height: SCREEN_HEIGHT } = useWindowDimensions()
  const tAnim = useSharedValue(SCREEN_HEIGHT)
  const extraStyles = {
    position: "absolute",
    bottom: 88,
    backgroundColor: isDark ? "#171717" : "white",
    borderRadiusTop: 24,
    borderRadiusRight: 24
  }

  const containerAnimStyle = useAnimatedStyle(() => {
    return {
      top: withTiming(showBottomSheet ? 0 : tAnim.value, { duration: 150 }),
    }
  })
  const sheetAnimStyle = {}
  const sheetItemAnimStyle = {}
  showBottomSheet ? 0 : SCREEN_HEIGHT
  
  function makeBottomSheetVisible() {
    setShowBottomSheet(currVal => !currVal)
  }

  return <TouchableWithoutFeedback onPress={makeBottomSheetVisible}>
    <Animated.View style={[styles.container, containerAnimStyle]}>
    <Animated.View stye={[styles.overlay]}/>
    <TouchableWithoutFeedback onPress={() => {}}>
      <Animated.View style={[extraStyles, sheetAnimStyle, styles.sheet]}>
        <View style={styles.bar}/>
        {sheetArr.map((sheetItem, idx) => (
          <TouchableOpacity
            key={idx}
            style={[styles.sheetItem, sheetItemAnimStyle, {marginTop: idx === 0 ? 0 : 16}]}
            onPress={sheetItem.onPress}
          >
            {sheetItem.icon}
            <Text style={{ marginLeft: 32, color: isDark ? "white" : "#0b0b0c" }}>{sheetItem.label}</Text>
          </TouchableOpacity>
        ))}
      </Animated.View>
    </TouchableWithoutFeedback>
    </Animated.View>
  </TouchableWithoutFeedback>
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    height: "100%",
    padding: 20,
    justifyItems: "center",
    alignItems: "center",
    position: "relative",
    backgroundColor: "#00000070",
  },
  overlay: {
    padding: 100,
    flex: 1,
    width: "100%",
    height: "100%",
    position: "absolute",
    top: 0,left:0,
    backgroundColor: "red"
  },
  sheet: {
    width: "100%",
    zIndex: 10,
    elevation: 10,
    paddingTop: 12,
    paddingBottom: 20,
    paddingHorizontal: 24,
    borderRadius: 20
  },
  bar: {
    width: 64,
    height: 6,
    backgroundColor: "#777777",
    borderRadius: 3,
    alignSelf: "center",
    marginBottom: 20
   },
  sheetItem: { flexDirection: "row", alignItems: "center" }
})
import { Feather } from "@expo/vector-icons";
import { Platform, BackHandler, TouchableOpacity, ScrollView, View, Text, StyleSheet, useWindowDimensions } from "react-native"
import Animated, {
  useSharedValue,
  withTiming,
  useAnimatedStyle,
  Easing,
} from 'react-native-reanimated'
import { useContext, useEffect, useMemo } from "react";
import { MainContext } from "./MainContext";
import Constants from "expo-constants";
import CheckBox from "./components/CheckBox";

export default function Settings() {
  const {
    isDark,
    showScreens,
    setShowScreens,
    prevRoutes,
    setPrevRoutes,
    route,
    setRoute,
    setUrl,
    setIsDark,
    settings,
    setSettings
  } = useContext(MainContext);
  const { width, height } = useWindowDimensions();
  const slideOutAnim = useSharedValue(0)
  const slideBackAnim = useSharedValue(width)

  const extraStyles = useMemo(() => ({
    // flex: showScreens.settings ? 1 : 0,
    // display: showScreens.settings ? "flex" : "none",
    backgroundColor: isDark ? "#0b0b0c" : "#ffffff",
    zIndex: showScreens.settings ? 10 : -1,
    width,
    height,
  }), [showScreens])

  const animStyle = useAnimatedStyle(() => {
    return {
      left: withTiming(showScreens.settings === true ? slideBackAnim.value : slideOutAnim.value, { duration: 150 }),
    };
  })

  // useEffect(() => {
  //   if (Platform.OS === 'android') {
  //     BackHandler.addEventListener('hardwareBackPress', backToPreviousScreen);
  //     return () => {
  //       BackHandler.removeEventListener('hardwareBackPress', backToPreviousScreen);
  //     };
  //   }
  // }, []);

  function changeIsDark() {
    setIsDark((currIsDark) => !currIsDark);
  }

  function backToPreviousScreen() {
    slideOutAnim.value = width
    slideBackAnim.value = 0
    setShowScreens((currValue) => ({
      ...currValue,
      [prevRoutes[route]]: true,
      settings: false,
    }));
    setPrevRoutes((currVlaue) => ({
      ...currVlaue,
      settings: prevRoutes.settings,
      [prevRoutes.settings]: "settings",
    }));
    setRoute(prevRoutes.settings);
  }

  return (
    <Animated.ScrollView style={[extraStyles, styles.container, animStyle]}>
      <View style={styles.flexLogoAndIcon}>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <TouchableOpacity onPress={backToPreviousScreen}>
            <Feather
              name="arrow-left"
              size={28}
              color={isDark ? "white" : "#0b0b0c"}
            />
          </TouchableOpacity>
          <Text
            style={[
              { color: isDark ? "#ffffff" : "#0b0b0c", marginLeft: 12 },
              styles.title,
            ]}
          >
            Settings
          </Text>
        </View>
      </View>
      <View>
        {settings.map((settings, idx) => (
          <Setting
            key={idx}
            isDark={isDark}
            setting={settings.setting}
            component={settings.component}
            value={settings.value}
          />
        ))}
      </View>
    </Animated.ScrollView>
  );
}

export function Setting({ isDark, setting, component, value }) {

  return <View style={styles.setting}>
    <Text style={[{ color: isDark ? "grey" : "white" }, styles.label]}>{setting}</Text>
    {component === "checkbox" ? <CheckBox isDark={isDark} value={value} /> : null}
  </View>
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: "absolute",
    paddingTop: Constants.statusBarHeight + 16,
    padding: 20,
  },
  flexLogoAndIcon: {
    marginBottom: 24,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  title: {
    fontWeight: "bold",
    fontSize: 24,
  },
  setting: {
    // marginBottom: 12,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 16,
    borderRadius: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#222222",
    borderTopWidth: 1,
    borderTopColor: "#222222",
  },
  label: { fontWeight: "bold", fontSize: 16 },
});

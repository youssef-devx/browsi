import { useState, useContext, useEffect, useMemo } from "react";
import Constants from "expo-constants";
import {
  Platform,
  BackHandler,
  TouchableOpacity,
  ScrollView,
  View,
  Text,
  StyleSheet,
  useWindowDimensions
} from "react-native";
import Animated, {
  useSharedValue,
  withTiming,
  useAnimatedStyle,
  Easing,
} from 'react-native-reanimated'
import { MainContext } from "./MainContext";
import { Feather } from "@expo/vector-icons";

export default function History() {
  const {
    isDark,
    showScreens,
    setShowScreens,
    prevRoutes,
    setPrevRoutes,
    route,
    setRoute,
    history,
    setHistory,
    setUrl,
  } = useContext(MainContext);
  const { width, height } = useWindowDimensions();
  const slideOutAnim = useSharedValue(0)
  const slideBackAnim = useSharedValue(width)

  const extraStyles = useMemo(() => ({
    // flex: showScreens.history ? 1 : 0,
    // display: showScreens.history ? "flex" : "none",
    backgroundColor: isDark ? "#0b0b0c" : "#ffffff",
    zIndex: showScreens.history ? 10 : -1,
    width,
    height,
  }), [showScreens])

  const animStyle = useAnimatedStyle(() => {
    return {
      left: withTiming(showScreens.history === true ? slideBackAnim.value : slideOutAnim.value, { duration: 150 }),
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

  function deleteAll() {}

  function backToPreviousScreen() {
    slideOutAnim.value = width
    slideBackAnim.value = 0
    setShowScreens((currValue) => ({
      ...currValue,
      [prevRoutes[route]]: true,
      history: false,
    }));
    setPrevRoutes((currVlaue) => ({
      ...currVlaue,
      history: prevRoutes.history,
      [prevRoutes.history]: "history",
    }));
    setRoute(prevRoutes.history);

    return true
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
            History
          </Text>
        </View>
        <Feather
          name="trash-2"
          size={24}
          color={isDark ? "grey" : "#0b0b0c"}
          onPress={deleteAll}
        />
      </View>
      <View>
        {history.map(({ pageTitle, pageUrl }, idx) => (
          <HistoryPage
            key={idx}
            isDark={isDark}
            pageTitle={pageTitle}
            pageUrl={pageUrl}
            pageIdx={idx}
            setHistory={setHistory}
            setUrl={setUrl}
            setRoute={setRoute}
          />
        ))}
      </View>
    </Animated.ScrollView>
  );
}

export function HistoryPage({
  isDark,
  pageTitle,
  pageUrl,
  pageIdx,
  setHistory,
  setRoute,
}) {
  const [show, setShow] = useState(false);

  const showOrHideStyles = {
    backgroundColor: isDark ? "#171717" : "#f7f7f7",
    opacity: show ? 1 : 0,
    bottom: show ? 56 : -100,
    right: show ? 12 : -100,
  };

  function deletePage() {
    setHistory((currHistory) => [
      ...currHistory.filter((_, idx) => idx !== pageIdx),
    ]);
  }

  function naviteToPage() {
    const isWebPage = pageUrl !== "mainPage";

    if (!isWebPage) setRoute("mainPage");
    setUrl(tabUrl);
    setRoute("webpage");
  }

  return (
    <View
      style={[{ backgroundColor: isDark ? "#171717" : "#f7f7f7" }, styles.page]}
      onPress={naviteToPage}
    >
      <Text style={[{ color: isDark ? "grey" : "#0b0b0c" }, styles.pageTitle]}>
        {pageTitle}
      </Text>
      <View style={styles.more}>
        <View
          style={styles.pageOptions}
          onPress={() => setShow((currShow) => !currShow)}
        >
          <Feather
            name="more-vertical"
            size={24}
            color={isDark ? "grey" : "#0b0b0c"}
          />
        </View>
        <View style={[showOrHideStyles, styles.menu]}>
          <View style={styles.menuItem} onPress={deletePage}>
            <Feather
              name="trash"
              size={24}
              color={isDark ? "#ffffff" : "#0b0b0c"}
            />
            <Text style={styles.listItem}>Trash</Text>
          </View>
          <View style={styles.menuItem}>
            <Feather
              name="copy"
              size={24}
              color={isDark ? "#ffffff" : "#0b0b0c"}
            />
            <Text style={styles.listItem}>Copy Link</Text>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: "absolute",
    paddingTop: Constants.statusBarHeight + 16,
    padding: 20,
  },
  flexLogoAndIcon: {
    marginBottom: 16,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  title: {
    fontWeight: "bold",
    fontSize: 24,
  },
  page: {
    marginBottom: 12,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 16,
    borderRadius: 12,
  },
  pageTitle: { fontWeight: "bold" },
  more: { position: "relative" },
  menu: {
    flex: 1,
    gap: 12,
    padding: 12,
    borderRadius: 12,
    position: "absolute",
  },
  menuItem: { flex: 1, flexDirection: "row", alignItems: "center", gap: 8 },
});

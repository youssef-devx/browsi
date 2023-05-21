import { Feather } from '@expo/vector-icons';
import { useContext, useState, useMemo } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Constants from 'expo-constants';
import { MainContext } from '../MainContext';
import BottomSheet from './BottomSheet';

const styles = StyleSheet.create({
  bottomPanel: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 20,
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
  },
  panelItem: {
    // TODO: padding: 12, turn this in to settings
    padding: 12,
    borderRadius: 12,
  },
  more: {
    position: 'relative',
  },
  menu: {
    padding: 12,
    borderRadius: 12,
    position: 'absolute',
  },
  menuItem: { width: "100%", flex: 1, flexDirection: 'row', alignItems: 'center', padding: 4 },
  listItem: {
    margin: 8
  },
  themIcon: {
    padding: 8,
    paddingTop: 10,
    paddingLeft: 10,
    position: "absolute",
    top: Constants.statusBarHeight + 12,
    right: 12,
    borderWidth: 1,
    borderRadius: 12
  }
});

export default function BottomPanel({ onAndroidBackPress }) {
  const {
    isDark,
    setPrevRoute,
    prevRoutes,
    setPrevRoutes,
    route,
    setRoute,
    tabs,
    setShowScreens,
    webViewProps
  } = useContext(MainContext)
  const { canGoBack, canGoForward } = webViewProps
  const [show, setShow] = useState(false);
  const iconColor = isDark ? "grey" : "#0b0b0c"
  const [sheetArr, setSheetArr] = useState([
    { label: "History", icon: <Feather name="clock" size={24} color={iconColor}/> },
    { label: "BookMarks", icon: <Feather name="bookmark" size={24} color={iconColor}/> },
    { label: "Settings", icon: <Feather name="settings" size={24} color={iconColor}/> },
  ])
  // const [showBottomSheet, setShowBottomSheet] = useState(true);

  const showOrHideStyles = useMemo(() => ({
    bottom: show ? 72 : -240,
    right: show ? 0 : -100,
  }), [show])

  function navigateToTabs() {
    setShowScreens(currValue => ({...currValue, [route]: false, tabs: true}))
    setPrevRoutes(currVlaue => ({
      ...currVlaue,
      [route]: "tabs",
      tabs: route
    }))
    setRoute("tabs")
  }

  function navigateToScreen(screenRoute) {
    setShowScreens(currValue => ({...currValue, [route]: false, [screenRoute]: true}))
    setPrevRoutes(currVlaue => ({
      ...currVlaue,
      [route]: screenRoute,
      [screenRoute]: route
    }))
    setRoute(screenRoute)
  }

  return (
    <View
      style={[
        { backgroundColor: isDark ? '#171717' : '#fdfdfd' },
        styles.bottomPanel,
      ]}>
      <TouchableOpacity style={styles.panelItem}>
        <Feather
          style={[{borderColor: isDark ? "#ffffff" : "#0b0b0c"}, styles.themeIcon]}
          name="chevron-left" size={24} color={isDark ? `${canGoBack ? "#ffffff" : "#ffffff50"}` : `${canGoBack ? "#0b0b0c" : "#0b0b0c05"}`}
          onPress={onAndroidBackPress}
        />
      </TouchableOpacity>
      <TouchableOpacity style={styles.panelItem}>
        <Feather
          style={[{borderColor: isDark ? "#ffffff" : "#0b0b0c"}, styles.themeIcon]}
          name="chevron-right" size={24} color={isDark ? `${canGoForward ? "#ffffff" : "#ffffff50"}` : `${canGoForward ? "#0b0b0c" : "#0b0b0c05"}`}
        />
      </TouchableOpacity>
      <TouchableOpacity onPress={navigateToTabs} style={[
        {
          paddingHorizontal: 16,
          borderWidth: 2,
          borderColor: isDark ? 'grey' : '#0b0b0c',
        },
        styles.panelItem,
      ]}>
        <Text
          style={{
              color: isDark ? 'grey' : '#0b0b0c',
              fontWeight: 'bold'
            }}>
          {tabs.length}
        </Text>
      </TouchableOpacity>
      <View style={styles.more}>
        <TouchableOpacity style={styles.panelItem} onPress={() => setShow(currShow => !currShow)}>
          <Feather
            style={[{borderColor: isDark ? "grey" : "#0b0b0c"}, styles.themeIcon]}
            name="list" size={24} color={isDark ? "grey" : "#0b0b0c"}
            onPress={() => setShow(currShow => !currShow)}
          />
        </TouchableOpacity>
        <BottomSheet
          isDark={isDark}
          sheetArr={sheetArr}
          setSheetArr={setSheetArr}
          show={show}
          setShow={setShow}
        />
        {/* <View style={[showOrHideStyles, {backgroundColor: isDark ? "#171717" : '#f7f7f7'}, styles.menu]}>
          <TouchableOpacity style={styles.menuItem} onPress={() => navigateToScreen("history")}>
            <Feather
              style={[{borderColor: isDark ? "#ffffff" : "#0b0b0c"}, styles.themeIcon]}
              name="clock" size={20} color={isDark ? "#ffffff" : "#0b0b0c"}
            />
            <Text
              style={[
                { width: 70, color: isDark ? '#ffffff' : '#0b0b0c' },
                styles.listItem,
              ]}>
              History
            </Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.menuItem} onPress={() => navigateToScreen("bookMarks")}>
            <Feather
              style={[{borderColor: isDark ? "#ffffff" : "#0b0b0c"}, styles.themeIcon]}
              name="book" size={20} color={isDark ? "#ffffff" : "#0b0b0c"}
            />
            <Text
              style={[
                { width: 70, color: isDark ? '#ffffff' : '#0b0b0c' },
                styles.listItem,
              ]}>
              BookMarks
            </Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.menuItem} onPress={() => navigateToScreen("settings")}>
            <Feather
              style={[{borderColor: isDark ? "#ffffff" : "#0b0b0c"}, styles.themeIcon]}
              name="settings" size={20} color={isDark ? "#ffffff" : "#0b0b0c"}
            />
            <Text
              style={[
                { width: 70, color: isDark ? '#ffffff' : '#0b0b0c' },
                styles.listItem,
              ]}>
              Settings
            </Text>
          </TouchableOpacity>
        </View> */}
      </View>
    </View>
  );
}

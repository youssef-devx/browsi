import { useContext, useState, useEffect, useMemo, memo } from 'react';
import Constants from 'expo-constants';
import { TouchableOpacity, View, Text, StyleSheet } from 'react-native';
import Animated, {
  useSharedValue,
  withTiming,
  useAnimatedStyle,
  Easing,
} from 'react-native-reanimated'
import { Feather } from '@expo/vector-icons';

export default memo(function Tab({ isDark, marginRight, idx, tabName, tabUrl, setTabs, setUrl, setShowScreens, setPrevRoute, setRoute }) {
  const [show, setShow] = useState(false);
  console.log(marginRight, idx)

  const showOrHideStyles = {
    bottom: show ? 56 : -100,
    right: show ? 12 : -100,
  };

  function deleteTab() {
    // setTabs((currTabs) => [...currTabs.filter((_, idx) => idx !== tabIdx)]);
  }

  function navigateToTab() {
    const isWebPage = tabUrl !== "mainPage"

    if(!isWebPage) {
      setRoute("mainPage")
      // setTabs(currTabs => {
      //   const theRoute = currTabs.find(tab => tab.tabIdx === tabIdx)
      //   return [...currTabs.filter(tab => tab.tabIdx !== tabIdx), theRoute]
      // })
      // ///////////////
      setShowScreens(currValue => ({...currValue, mainPage: true, tabs: false}))
      setPrevRoute("tabs")
    } else {
      setUrl(tabUrl)
      // /////////////
      setShowScreens(currValue => ({...currValue, webPagesRouter: true, tabs: false}))
      setRoute("webPagesRouter")
      setPrevRoute("tabs")
    }
  }
  
  return <TouchableOpacity
      style={[{ backgroundColor: isDark ? '#171717' : '#f7f7f7', marginRight }, styles.tab]}
      onPress={navigateToTab}
    >
    {/* <View style={styles.more} onPress={() => setShow(currShow => !currShow)}>
      <View style={styles.panelItem}>
        <Feather name="more-vertical" size={24} color={isDark ? "grey" : "#0b0b0c"} />
      </View>
      <View style={[showOrHideStyles, styles.menu]}>
        <View style={styles.menuItem} onPress={deleteTab}>
          <Feather name="trash" size={24} color={isDark ? "#ffffff" : "#0b0b0c"} />
          <Text style={styles.listItem}>Trash</Text>
        </View>
        <View style={styles.menuItem}>
          <Feather name="copy" size={24} color={isDark ? "#ffffff" : "#0b0b0c"} />
          <Text style={styles.listItem}>Copy Link</Text>
        </View>
      </View>
    </View> */}
    <Text style={[{ color: isDark ? 'grey' : '#0b0b0c' }, styles.tabName]}>
      {tabName}
    </Text>
  </TouchableOpacity>
})

const styles = StyleSheet.create({
  tab: {
    flex: 1,
    marginBottom: 12,
    marginHorizontal: 6,
    // flexDirection: '',
    alignItems: 'center',
    padding: 16,
    borderRadius: 12,
    backgroundColor: "red"
  },
  tabName: { fontWeight: 'noraml', fontSize: 12 },
  more: { position: 'relative' },
  menu: {
    flex: 1,
    gap: 12,
    padding: 12,
    borderRadius: 12,
    position: 'absolute',
  },
  menuItem: { flex: 1, flexDirection: 'row', alignItems: 'center', gap: 8 }
})
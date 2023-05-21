import { useContext, useState, useEffect, useMemo, memo } from 'react';
import Constants from 'expo-constants';
import { FlatList, Platform, BackHandler, ScrollView, TouchableOpacity, View, Text, StyleSheet, useWindowDimensions } from 'react-native';
import Animated, {
  useSharedValue,
  withTiming,
  useAnimatedStyle,
  Easing,
} from 'react-native-reanimated'
import { MainContext } from './MainContext';
import { Feather } from '@expo/vector-icons';
import Tab from './components/Tab';

export default function Tabs() {
  const {
    isDark,
    showScreens,
    setShowScreens,
    prevRoute,
    setPrevRoute,
    prevRoutes,
    setPrevRoutes,
    route,
    setRoute,
    tabs,
    setTabs,
    setUrl,
  } = useContext(MainContext)
  const { width, height } = useWindowDimensions();
  const slideOutAnim = useSharedValue(showScreens.tabs ? width : 0)
  const slideBackAnim = useSharedValue(showScreens.tabs ? 0 : width)

  // function slideOut() {
  //   // Will change slideAnim value to 1 in 5 seconds
  //   Animated.timing(slideInAnim, {
  //     toValue: width,
  //     duration: 1500,
  //     useNativeDriver: true,
  //   }).start();
  // };

  // function slideBack() {
  //   // Will change slideAnim value to 0 in 3 seconds
  //   Animated.timing(slideBackAnim, {
  //     toValue: 0,
  //     duration: 1500,
  //     useNativeDriver: true,
  //   }).start();
  // };
  const extraStyles = useMemo(() => ({
    // flex: showScreens.tabs ? 1 : 0,
    // display: showScreens.tabs ? "flex" : "none",
    backgroundColor: isDark ? '#0b0b0c' : '#ffffff',
    zIndex: showScreens.tabs ? 10 : -1,
    width,
    height,
  }), [showScreens])

  const animStyle = useAnimatedStyle(() => {
    return {
      left: withTiming(showScreens.tabs ? slideBackAnim.value : slideOutAnim.value, { duration: 150 }),
    };
  })

  // useEffect(() => {
  //   console.log(route)
  //   if (Platform.OS === 'android') {
  //     BackHandler.addEventListener('hardwareBackPress', backToPreviousScreen);
  //     return () => {
  //       BackHandler.removeEventListener('hardwareBackPress', backToPreviousScreen);
  //     };
  //   }
  // }, []);

  function backToPreviousScreen() {
    slideOutAnim.value = width
    slideBackAnim.value = 0
    // prevRoute = prevRoute ? prevRoute : "mainPage"
    // console.log("$$$$$$$$$$$$$$$$$$$$$$$$$")
    // console.log("Going from:", route)
    // console.log("Arriving at:", prevRoutes.tabs)
    // console.log("$$$$$$$$$$$$$$$$$$$$$$$$$")
    setShowScreens(currValue => ({
      ...currValue,
      [prevRoutes[route]]: true,
      tabs: false,
    }))
    setPrevRoutes(currVlaue => ({
      ...currVlaue,
      tabs: prevRoutes.tabs,
      [prevRoutes.tabs]: "tabs"
    }))
    setRoute(prevRoutes.tabs)

    return true
  }
  
  function addTab() {
    setTabs((currTabs) => [
      ...currTabs,
      { tabName: 'Starting Page', tabUrl: 'mainPage' },
    ])
    setShowScreens(currValue => ({...currValue, mainPage: true, tabs: false}))
    setRoute("mainPage")
    setPrevRoute("tabs")
  }
  // console.log(showScreens)

  return (
    <Animated.View style={[extraStyles, styles.container, animStyle]}>
      <View style={styles.flexLogoAndIcon}>
        <View style={{flexDirection: "row", alignItems: "center"}}>
          <TouchableOpacity onPress={backToPreviousScreen}>
            <Feather
              name="arrow-left"
              size={28}
              color={isDark ? "white" : "#0b0b0c"}
            />
          </TouchableOpacity>
          <Text style={[{ color: isDark ? '#ffffff' : '#0b0b0c', marginLeft: 12 }, styles.title]}>
            Tabs {tabs?.length}
          </Text>
        </View>
        <Feather
          name="plus" size={32} color={isDark ? "grey" : "#0b0b0c"}
          onPress={addTab}
        />
      </View>
      <View style={{display: "flex", gap: 12, justifyContent: "space-between", alignItems: "center", flexDirection: "row", flexWrap: "wrap"}}>
        {/* {tabs.map(({ tabName, tabUrl }, idx) => (
          <Tab
            key={idx}
            isDark={isDark}
            width
            tabName={tabName}
            tabUrl={tabUrl}
            tabIdx={idx}
            setTabs={setTabs}
            setUrl={setUrl}
            setShowScreens={setShowScreens}
            setPrevRoute={setPrevRoute}
            setRoute={setRoute}
          />
        ))} */}
         <FlatList
          data={tabs}
          renderItem={({ item }, idx) => (
            <Tab
              isDark={isDark}
              marginRight={idx % 2 === 0 ? 12 : 0}
              tabName={item.tabName}
              tabUrl={item.tabUrl}
              setTabs={setTabs}
              setUrl={setUrl}
              setShowScreens={setShowScreens}
              setPrevRoute={setPrevRoute}
              setRoute={setRoute}
            />
          )}
          //Setting the number of column
          numColumns={2}
          keyExtractor={(_, index) => index}
        />
      </View>
    </Animated.View>
  );
}

export function Tabo({ isDark, marginRight, tabName, tabUrl, tabIdx, setTabs, setUrl, setShowScreens, setPrevRoute, setRoute }) {
  const [show, setShow] = useState(false);

  const showOrHideStyles = {
    bottom: show ? 56 : -100,
    right: show ? 12 : -100,
  };

  function deleteTab() {
    setTabs((currTabs) => [...currTabs.filter((_, idx) => idx !== tabIdx)]);
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
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: {
    fontWeight: 'bold',
    fontSize: 24,
  },
  // tab: {
  //   flex: 1,
  //   marginBottom: 12,
  //   marginRight: 12,
  //   // flexDirection: '',
  //   alignItems: 'center',
  //   padding: 16,
  //   borderRadius: 12,
  //   backgroundColor: "red"
  // },
  // tabName: { fontWeight: 'noraml', fontSize: 12 },
  // more: { position: 'relative' },
  // menu: {
  //   flex: 1,
  //   gap: 12,
  //   padding: 12,
  //   borderRadius: 12,
  //   position: 'absolute',
  // },
  // menuItem: { flex: 1, flexDirection: 'row', alignItems: 'center', gap: 8 }
});
import { useContext, useState, useEffect, useMemo } from 'react'
import { Keyboard, TouchableWithoutFeedback, Platform, BackHandler, Text, TextInput, TouchableOpacity, View, StyleSheet, useWindowDimensions } from 'react-native'
import Constants from 'expo-constants'
import PinnedWebSites from './components/PinnedWebSites'
import BottomPanel from './components/BottomPanel'
import { Feather } from '@expo/vector-icons'
import { MainContext } from "./MainContext"

const SERP_API_KEY = "116884dbb870ccefa61e93febe4a5e76343adc5a8e73d38caff77fdced70e0bd"

export default function MainScreen() {
  const {
    isDark,
    setTabs,
    tabsVisible,
    setTabsVisible,
    setHistory,
    setSheetArr,
    setHistoryVisible,
    setBookMarksVisible,
    setSettingsVisible,
    setShowBottomSheet,
  } = useContext(MainContext)
  const [searchQuery, setSearchQuery] = useState("")
  const [showSuggestions, setShowSuggestions] = useState(false)
  const [suggestions, setSuggestions] = useState([])
  const { width, height } = useWindowDimensions()

  const extraStyles = useMemo(() => ({
    backgroundColor: isDark ? '#0b0b0c' : '#ffffff',
    width,
    height,
  }), [isDark])

  const suggestionsStyles = useMemo(() => ({
    backgroundColor: isDark ? "#171717" : "#ffffff",
    opacity: showSuggestions ? 1 : 0
  }) , [isDark, showSuggestions])

  useEffect(() => {
    !tabsVisible && setSheetArr([
      { label: "History",
        icon: <Feather name="clock" size={24} color={isDark ? "white" : "#0b0b0c"}/>,
        onPress: () => {setHistoryVisible(true);hideWebViews();setShowBottomSheet(false)}
      },
      { label: "BookMarks",
        icon: <Feather name="bookmark" size={24} color={isDark ? "white" : "#0b0b0c"}/>,
        onPress: () => {setBookMarksVisible(true);hideWebViews();setShowBottomSheet(false)}
      },
      { label: "Settings",
        icon: <Feather name="settings" size={24} color={isDark ? "white" : "#0b0b0c"}/>,
        onPress: () => {setSettingsVisible(true);hideWebViews();setShowBottomSheet(false)}
      }
    ])

    // if (Platform.OS === 'android') {
    //   BackHandler.addEventListener('webViewHardwareBackPress', () => true)
    //   return () => {
    //     BackHandler.removeEventListener('webViewHardwareBackPress', () => true)
    //   }
    // }
  }, [tabsVisible])

  function hideWebViews() {
    setTabs((currTabs) => [...currTabs.map(currTab => currTab.visible === true ? {
      ...currTab, visible: false
    } : currTab )])
  }

  async function getSuggestions(str) {
    const data = await fetch(`https://serpapi.com/search.json?engine=google_autocomplete&q=${str}&api_key=${SERP_API_KEY}`)
                        .then(res => res.json())
                        .catch(err => console.log(err))
    data["suggestions"] && setSuggestions(data["suggestions"].slice(10))
  }

  function onChangeText(str) {
    setShowSuggestions(true)
    setSearchQuery(str)
    setTimeout(() => getSuggestions(str), 250)
  }

  function goToSearchQuery(query) {
    setTabsVisible(true)
    setTabs(currVal => ([
      ...currVal,
      { tabName: `${query} - Google Search`, tabUrl: `https://google.com/search?q=${query}`, visible: true },
    ]))
    Keyboard.dismiss()
    setShowSuggestions(false)
    setHistory(currVal => ([
      { pageTitle: `${query} - Google Search`, pageUrl: `https://google.com/search?q=${query}` },
      ...currVal
    ]))
  }

  return (
    <TouchableWithoutFeedback onPress={() => {setShowSuggestions(false);Keyboard.dismiss()}}>
      <View style={[extraStyles, styles.container]}>
        <Text style={[{color: isDark ? "#ffffff" : "#0b0b0c"}, styles.logo]}>Browsi</Text>
        <View style={styles.searchContainer}>
          <Feather
            name="search"
            size={24}
            color={isDark ? "grey" : "#ffffff"}
            style={styles.searchIcon}
          />
          <TextInput
            style={[{backgroundColor: isDark ? "#171717" : "#ffffff", color: isDark ? "grey" : "#0b0b0c"}, styles.searchInput]}
            placeholder="Search any thing"
            placeholderTextColor={isDark ? "grey" : "#ffffff"}
            value={searchQuery}
            spellCheck={true}
            enterKeyHint="search"
            onChangeText={onChangeText}
            onFocus={() => setShowSuggestions(true)}
            onPressIn={() => setShowSuggestions(true)}
            onSubmitEditing={({ nativeEvent }) => goToSearchQuery(nativeEvent.text)}
          />
          {searchQuery && <Feather
            name="x"
            size={20}
            color={isDark ? "grey" : "#ffffff"}
            style={styles.clearIcon}
            onPress={() => setSearchQuery("")}
          />}
          <View pointerEvents={showSuggestions ? "auto" : "none" } style={[suggestionsStyles, styles.suggestions]}>
            {suggestions.length > 0 ? suggestions.map((suggestion, idx) => (
              <TouchableOpacity
                key={idx}
                style={{paddingTop: idx === 0 ? 16 : 0, paddingHorizontal: 16, paddingBottom: 16}}
                onPress={() => goToSearchQuery(suggestion.value)}>
                <Text style={{color: isDark ? "grey" : "#0b0b0c"}}>{suggestion.value}</Text>
              </TouchableOpacity>
            )) : <TouchableOpacity style={{ padding: 16 }}>
                  <Text style={{color: isDark ? "grey" : "#0b0b0c"}}>No suggestions were found!</Text>
                </TouchableOpacity>}
          </View>
        </View>
        {/* <PinnedWebSites /> */}
        <BottomPanel isDark={isDark} webViewProps={{}} onAndroidBackPress={() => {}}/>
      </View>
    </TouchableWithoutFeedback>
  )
}

export function Button({ style, children }) {
  const [opacity, setOpacity] = useState(1)
  function onPress() {
    const timer = setInterval(() => {
      setOpacity(currOpacity => {
        if(currOpacity === 1) clearInterval(timer)
        return currOpacity = currOpacity + .10
      })
    }, 10)
  }

  return <View style={[styles.button, {opacity},style]} onPress={onPress} >
    {children}
  </View>
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-between",
    position: "absolute",
    paddingTop: Constants.statusBarHeight,
    paddingHorizontal: 32,
    paddingVertical: 136,
  },
  logo: {
    marginTop: 96,
    fontSize: 40,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  searchContainer: {
    position: "relative",
    flexDirection: "row",
    alignItems: "center",
    alignSelf: "center",
  },
  searchInput: {
    borderRadius: 12,
    paddingVertical: 12,
    paddingRight: 12,
    paddingLeft: 48,
    width: "100%"
  },
  searchIcon: {
    position: "absolute",
    zIndex: 10,
    left: 12,
  },
  clearIcon: {
    position: "absolute",
    zIndex: 10,
    right: 12,
  },
  suggestions: {
    position: "absolute",
    zIndex: 1,
    top: "120%",
    width: "100%",
    borderBottomLeftRadius: 12,
    borderBottomRightRadius: 12,
  },
})
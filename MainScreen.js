import { useContext, useState, useEffect, useMemo } from 'react'
import { Keyboard, TouchableWithoutFeedback, Platform, BackHandler, Text, TextInput, TouchableOpacity, View, StyleSheet, useWindowDimensions } from 'react-native'
import Constants from 'expo-constants'
import PinnedSites from './components/PinnedSites'
import BottomPanel from './components/BottomPanel'
import { Feather } from '@expo/vector-icons'
import { MainContext } from "./MainContext"
import { SERP_API_KEY } from "@env"


export default function MainScreen() {
  const {
    isDark,
    tabs,
    setTabs,
    setTabsVisible
  } = useContext(MainContext)
  const [searchQuery, setSearchQuery] = useState("")
  const [showSuggestions, setShowSuggestions] = useState(false)
  const [suggestions, setSuggestions] = useState([
    {value: "Start typing to show suggestions."}
  ])
  const { width, height } = useWindowDimensions()

  const extraStyles = useMemo(() => ({
    backgroundColor: isDark ? '#0b0b0c' : '#ffffff',
    width,
    height,
  }), [isDark])

  const suggestionsStyles = {
    backgroundColor: isDark ? "#171717" : "#ffffff",
    opacity: showSuggestions ? 1 : 0
  }

  useEffect(() => {
    if (Platform.OS === 'android') {
      BackHandler.addEventListener('hardwareBackPress', () => {
        return true
      })
      return () => {
        BackHandler.removeEventListener('hardwareBackPress', () => {
          return true
        })
      }
    }
  }, [])

  async function getSuggestions(str) {
    const data = await fetch(`https://serpapi.com/search.json?engine=google_autocomplete&q=${str}&api_key=${SERP_API_KEY}`)
                        .then(res => res.json())
                        .catch(err => console.log(err))
    data["suggestions"].length > 0 && setSuggestions(data["suggestions"].slice(10))
  }

  function onChangeText(str) {
    setShowSuggestions(true)
    setTimeout(() => {setSearchQuery(str);getSuggestions(str)}, 250)
  }

  function onSuggestionPress(query) {
    setTabsVisible(true)
    setTabs(currVal => ([
      ...currVal,
      { tabName: `${query} - Google Search`, tabUrl: `https://google.com/search?q=${query}`, visible: true },
    ]))
    Keyboard.dismiss()
    setShowSuggestions(false)
  }

  return (
    <TouchableWithoutFeedback onPress={() => {setShowSuggestions(false);Keyboard.dismiss()}}>
      <View style={[extraStyles, styles.container]}>
        <Text style={[{color: isDark ? "#ffffff" : "#0b0b0c"}, styles.logo]}>Browsi</Text>
        {/* <PinnedSites isDark={isDark}/> */}
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
            onChangeText={onChangeText}
            spellCheck={true}
            onFocus={() => setShowSuggestions(true)}
            onPressIn={() => setShowSuggestions(true)}
          />
          {searchQuery && <Feather
            name="x"
            size={20}
            color={isDark ? "grey" : "#ffffff"}
            style={styles.clearIcon}
            onPress={() => setSearchQuery("")}
          />}
          <View pointerEvents={showSuggestions ? "auto" : "none" } style={[suggestionsStyles, styles.suggestions]}>
            {suggestions.map((suggestion, idx) => (
              <TouchableOpacity
                key={idx}
                style={{paddingTop: idx === 0 ? 16 : 0, paddingHorizontal: 16, paddingBottom: 16}}
                onPress={() => onSuggestionPress(suggestion.value)}>
                <Text style={{color: isDark ? "grey" : "#0b0b0c"}}>{suggestion.value}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
        <BottomPanel isDark={isDark} webViewProps={{}} onAndroidBackPress={() => console.log('From main screen')}/>
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
    position: "absolute",
    alignItems: 'center',
    padding: 32,
    paddingTop: Constants.statusBarHeight,
  },
  logo: {
    margin: 24,
    fontSize: 40,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  searchContainer: {
    position: "relative",
    flexDirection: "row",
    alignItems: "center",
    alignSelf: "center",
    marginTop: 64,
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
    top: "120%",
    width: "100%",
    borderBottomLeftRadius: 12,
    borderBottomRightRadius: 12,
  },
})
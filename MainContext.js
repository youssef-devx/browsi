import { Feather } from '@expo/vector-icons'
import { createContext, useState } from 'react'
export const MainContext = createContext({})

export default function MainContextProvider({ children }) {
  const [isDark, setIsDark] = useState(true)
  const [tabsVisible, setTabsVisible] = useState(false)
  const [historyVisible, setHistoryVisible] = useState(false)
  const [bookMarksVisible, setBookMarksVisible] = useState(false)
  const [settingsVisible, setSettingsVisible] = useState(false)
  const [pinnedWebsites, setPinnedWebsites] = useState([
    { siteTitle: 'Starting Page', siteUrl: 'mainPage' },
    { siteTitle: 'Google Search', siteUrl: 'https://google.com/' },
    { siteTitle: 'Youtube | Videos', siteUrl: 'https://youtube.com/' },
    { siteTitle: 'Amazon | Products', siteUrl: 'https://amazon.com/' },
  ])
  const [tabs, setTabs] = useState([
    { tabName: 'Google Search', tabUrl: 'https://alsdkfj.com/', visible: false },
    { tabName: 'Youtube | Videos', tabUrl: 'https://laskdf.co/', visible: false },
    { tabName: 'Amazon | Products', tabUrl: 'https://dsfa.com/', visible: false },
    { tabName: 'First | Products', tabUrl: 'https://asdfas.com/', visible: false },
  ])
  const [history, setHistory] = useState([
    { pageTitle: 'Starting Page', pageUrl: 'https://wiki.com/' },
    { pageTitle: 'Google Search', pageUrl: 'https://wiki.com/' },
    { pageTitle: 'Youtube | Videos', pageUrl: 'https://wiki.com/' },
    { pageTitle: 'Amazon | Products', pageUrl: 'https://wiki.com/' },
  ])
  const [bookMarks, setBookMarks] = useState([
    { pageTitle: 'Starting Page', pageUrl: 'https://wiki.com/' },
    { pageTitle: 'Google Search', pageUrl: 'https://wiki.com/' },
    { pageTitle: 'Youtube | Videos', pageUrl: 'https://wiki.com/' },
    { pageTitle: 'Amazon | Products', pageUrl: 'https://wiki.com/' },
  ])
  const [settings, setSettings] = useState([
    { setting: 'Dark Theme', component: "checkbox", value: true },
    { setting: 'Short Bottom Panel', component: "checkbox", value: false },
  ])
  const [showBottomSheet, setShowBottomSheet] = useState(false)
  const [showSearchBar, setShowSearchBar] = useState(true)
  const [sheetArr, setSheetArr] = useState([
    { label: "Toggle SearchBar",
      icon: <Feather name="search" size={24} color={isDark ? "white" : "#0b0b0c"}/>,
      onPress: () => {setShowSearchBar(currVal => !currVal);setShowBottomSheet(false)}
    },
    { label: "History",
      icon: <Feather name="clock" size={24} color={isDark ? "white" : "#0b0b0c"}/>,
      onPress: () => {setHistoryVisible(currVal => !currVal);hideWebViews();setShowBottomSheet(false)}
    },
    { label: "BookMarks",
      icon: <Feather name="bookmark" size={24} color={isDark ? "white" : "#0b0b0c"}/>,
      onPress: () => {setBookMarksVisible(currVal => !currVal);hideWebViews();setShowBottomSheet(false)}
    },
    { label: "Settings",
      icon: <Feather name="settings" size={24} color={isDark ? "white" : "#0b0b0c"}/>,
      onPress: () => {setSettingsVisible(currVal => !currVal);hideWebViews();setShowBottomSheet(false)}
    },
  ])
  const [searchHistory, setSearchHistory] = useState([
    {value: "history1"},
    {value: "history2"},
    {value: "history3"},
  ])

  const MainContextStates = {
    isDark,
    setIsDark,
    tabsVisible,
    setTabsVisible,
    historyVisible,
    setHistoryVisible,
    bookMarksVisible,
    setBookMarksVisible,
    settingsVisible,
    setSettingsVisible,
    showBottomSheet,
    setShowBottomSheet,
    sheetArr,
    setSheetArr,
    tabs,
    setTabs,
    history,
    setHistory,
    bookMarks,
    setBookMarks,
    settings,
    setSettings,
    pinnedWebsites,
    setPinnedWebsites,
    searchHistory,
    setSearchHistory,
    showSearchBar,
    setShowSearchBar,
  }

  function hideWebViews() {
    setTabs((currTabs) => [...currTabs.map(currTab => currTab.visible === true ? {
      ...currTab, visible: false
    } : currTab )])
  }

  return <MainContext.Provider value={MainContextStates}>{children}</MainContext.Provider>
}
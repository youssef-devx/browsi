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
    { pageTitle: 'Google', pageUrl: 'https://google.com/', favIcon: "" },
    { pageTitle: 'Youtube | Videos', pageUrl: 'https://youtube.com/', favIcon: "" },
    { pageTitle: 'Wiki', pageUrl: 'https://wiki.com/', favIcon: "" },
    { pageTitle: 'Wiki', pageUrl: 'https://wiki.com/', favIcon: "" },
    { pageTitle: 'Wiki', pageUrl: 'https://wiki.com/', favIcon: "" },
    { pageTitle: 'Wiki', pageUrl: 'https://wiki.com/', favIcon: "" },
  ])
  const [tabs, setTabs] = useState([
    // { tabName: 'Google', tabUrl: 'https://google.com/', visible: false },
    // { tabName: 'Facebook', tabUrl: 'https://facebook.com/', visible: false },
    // { tabName: 'twitter', tabUrl: 'https://twitter.com/', visible: false },
    // { tabName: 'Speedtest', tabUrl: 'https://speedtest.net/', visible: false },
  ])
  const [history, setHistory] = useState([
    { pageTitle: 'Google', pageUrl: 'https://google.com/' },
    { pageTitle: 'Facebook', pageUrl: 'https://facebook.com/' },
    { pageTitle: 'Youtube | Videos', pageUrl: 'https://youtube.com/' },
    { pageTitle: 'Wiki | Products', pageUrl: 'https://wiki.com/' },
  ])
  const [bookMarks, setBookMarks] = useState([
    { pageTitle: 'Google', pageUrl: 'https://google.com/' },
    { pageTitle: 'Fabeook', pageUrl: 'https://facebook.com/' },
    { pageTitle: 'Youtube | Videos', pageUrl: 'https://youtube.com/' },
    { pageTitle: 'Wiki', pageUrl: 'https://wiki.com/' },
  ])
  const [settings, setSettings] = useState([
    { setting: 'Dark Theme', component: "checkbox", value: true },
    { setting: 'Short Bottom Panel', component: "checkbox", value: false },
  ])
  const [showBottomSheet, setShowBottomSheet] = useState(false)
  const [showSearchBar, setShowSearchBar] = useState(true)
  const [sheetArr, setSheetArr] = useState([
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

  console.log("Tabs:", tabsVisible)
  console.log("History:", historyVisible)
  console.log("Bookmarks:", bookMarksVisible)
  console.log("Settings:", settingsVisible)
  console.log("Tabs arr:", tabs.map(t => t.visible))

  return <MainContext.Provider value={MainContextStates}>{children}</MainContext.Provider>
}
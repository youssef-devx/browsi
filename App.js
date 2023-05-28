import MainContextProvider, { MainContext } from './MainContext'
import { useContext, useEffect } from 'react'
import { StatusBar } from 'expo-status-bar'
import MainScreen from './MainScreen'
import TabsScreen from './TabsScreen'
import HistoryScreen from './HistoryScreen'
import BookMarksScreen from './BookMarksScreen'
import SettingsScreen from './SettingsScreen'
import WebViewScreen from "./WebViewScreen"
import BottomSheet from "./components/BottomSheet"
import { BackHandler, Platform } from 'react-native'

export default function App() {
  console.log('App launched')
  return <MainContextProvider>
    <AppContainer />
  </MainContextProvider>
}

export function AppContainer() {
  const {
    isDark,
    tabs,
    setTabs,
    setHistory,
    tabsVisible,
    historyVisible,
    bookMarksVisible,
    settingsVisible,
    setTabsVisible,
    setHistoryVisible,
    setBookMarksVisible,
    setSettingsVisible,
  } = useContext(MainContext)

  useEffect(() => {
    const hideScreen = () => {
      if(tabs.find(t => t.visible === true)) {
        setTabs(curr => [...curr.map(t => t.visible ? { ...t, visible: false } : t)])
      } else if(tabsVisible) {
        setTabsVisible(false)
      } else if(historyVisible) {
        setHistoryVisible(false)
      } else if(bookMarksVisible) {
        setBookMarksVisible(false)
      } else if(settingsVisible) {
        setSettingsVisible(false)
      }
      
      return true
    }

    if (Platform.OS === 'android') {
      BackHandler.addEventListener('hardwareBackPress', hideScreen)
      return () => {
        BackHandler.removeEventListener('hardwareBackPress', hideScreen)
      }
    }

    tabs.map(tab => setHistory(currVal => ([
        { pageTitle: tab.tabName, pageUrl: tab.tabUrl },
        ...currVal
      ])))
  }, [tabs, tabsVisible, historyVisible, bookMarksVisible, settingsVisible])

  return <>
    <StatusBar style={isDark ? "light" : "dark"}/>
    <MainScreen />
    <TabsScreen />
    <BookMarksScreen />
    <SettingsScreen />
    <HistoryScreen />
    {tabs.map((_, idx) => <WebViewScreen key={idx} idx={idx} />)}
    <BottomSheet />
  </>
}
// exp://hdap06u.youssef-devx.19000.exp.direct:80
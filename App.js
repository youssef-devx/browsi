import MainContextProvider, { MainContext } from './MainContext';
import { useContext, useEffect, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import MainScreen from './MainScreen';
import TabsScreen from './TabsScreen';
import HistoryScreen from './HistoryScreen';
import BookMarksScreen from './BookMarksScreen';
import SettingsScreen from './SettingsScreen';
// import WebViewScreen from "./WebViewScreen";
import BottomSheet from "./components/BottomSheet";

export default function App() {
  console.log('App launched')
  return <MainContextProvider>
    <AppContainer />
  </MainContextProvider>
}

export function AppContainer() {
  const {
    isDark,
    tabs
  } = useContext(MainContext)

  return <>
    <StatusBar style={isDark ? "light" : "dark"}/>
    <MainScreen />
    <TabsScreen />
    <BookMarksScreen />
    <SettingsScreen />
    <HistoryScreen />
    {/* {tabs.map((_, idx) => <WebViewScreen key={idx} idx={idx} />)} */}
    <BottomSheet />
  </>
}
// exp://hdap06u.youssef-devx.19000.exp.direct:80
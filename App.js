import { BackHandler, Platform } from "react-native"
import MainContextProvider, { MainContext } from './MainContext';
import { useContext, useEffect, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import MainScreen from './MainScreen';
import TabsScreen from './TabsScreen';
import HistoryScreen from './HistoryScreen';
import BookMarksScreen from './BookMarksScreen';
import SettingsScreen from './SettingsScreen';
import WebViewScreen from "./WebViewScreen";

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
    {/* <TouchableOpacity
      style={{padding: 50, backgroundColor: "green", borderRadius: 12}}
      onPress={scaleUp} ><View/></TouchableOpacity> */}
    <MainScreen />
    <TabsScreen />
    <BookMarksScreen />
    <SettingsScreen />
    <HistoryScreen />
    {tabs.map((_, idx) => <WebViewScreen key={idx} idx={idx} />)}
    {/* <WebViewScreen tabProps={tabProps} /> */}
  </>
}
// exp://hdap06u.youssef-devx.19000.exp.direct:80
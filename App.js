import { BackHandler, Platform } from "react-native"
import MainContextProvider, { MainContext } from './MainContext';
import { useContext, useEffect, useCallback } from 'react';
import Tabs from './Tabs';
import MainPage from './MainPage';
import History from './History';
import BookMarks from './BookMarks';
import { StatusBar } from 'expo-status-bar';
// import WebPage from './WebPage';
import Settings from './Settings';
// import WebPagesRouter from "./WebPagesRouter";

export default function App() {
  console.log('App launched')
  return <MainContextProvider>
    <AppContainer />
  </MainContextProvider>
}

export function AppContainer() {
  const {
    isDark,
    showScreens,
    setShowScreens,
    prevRoute,
    setPrevRoute,
    prevRoutes,
    setPrevRoutes,
    route,
    setRoute
  } = useContext(MainContext)

  /*const routes = {
    "mainPage": <MainPage />,
    // "settings": <Settings />,
    "tabs": <Tabs />
    ,
    "webPage": <WebPage />,
    // "history": (
    //   <History
    //     isDark={isDark}
    //     route={route}
    //     setRoute={setRoute}
    //     history={history}
    //     setHistory={setHistory}
    //     setUrl={setUrl}
    //   />
    // ),
    // "bookmarks": (
    //   <BookMarks
    //     isDark={isDark}
    //     route={route}
    //     setRoute={setRoute}
    //     bookmarks={bookmarks}
    //     setBookMarks={setBookMarks}
    //     setUrl={setUrl}
    //   />
    // )
  };*/

  return <>
    <StatusBar style={isDark ? "light" : "dark"}/>
    {/* <Settings />
    <History />
    <BookMarks /> */}
    <Tabs />
    {/* <MainPage /> */}
    {/* <WebPagesRouter /> */}
  </>
}
import { BackHandler, Platform, TouchableOpacity, View } from "react-native"
import MainContextProvider, { MainContext } from './MainContext';
import { useContext, useEffect, useState } from 'react';
import Tabs from './Tabs';
import MainPage from './MainPage';
import History from './History';
import BookMarks from './BookMarks';
import { StatusBar } from 'expo-status-bar';
import Settings from './Settings';
import WebViewScreen from "./WebViewScreen";
// import WebViewsRouter from "./WebViewsRouter";

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
    webViewIdx,
    showScreens,
    setShowScreens,
    prevRoute,
    setPrevRoute,
    prevRoutes,
    setPrevRoutes,
    route,
    setRoute,
  } = useContext(MainContext)
  const [tabProps, setTabProps] = useState({visible: false});

  function scaleUp() {
    setTabProps({visible: !tabProps.visible})
  }

  /*const routes = {
    "mainPage": <MainPage />,
    // "settings": <Settings />,
    "tabs": <Tabs />
    ,
    "webPage": <WebView />,
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
    {/* <TouchableOpacity
      style={{padding: 50, backgroundColor: "green", borderRadius: 12}}
      onPress={scaleUp} ><View/></TouchableOpacity> */}
    {/* <Settings />
    <History />
    <BookMarks /> */}
    <Tabs />
    {tabs.map((tab, idx) => <WebViewScreen key={idx} idx={idx} />)}
    {/* <WebViewScreen tabProps={tabProps} /> */}
  </>
}
// exp://hdap06u.youssef-devx.19000.exp.direct:80
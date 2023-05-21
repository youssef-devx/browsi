import { createContext, useState } from 'react';
export const MainContext = createContext({});

export default function MainContextProvider({ children }) {
  const [isDark, setIsDark] = useState(true)
  const [showScreens, setShowScreens] = useState({
    mainPage: false,
    tabs: true,
    history: false,
    bookMarks: false,
    settings: false,
    // webPage: false,
    // webPagesRouter: false,
  })
  const [prevRoute, setPrevRoute] = useState()
  const [prevRoutes, setPrevRoutes] = useState({
    mainPage: "",
    tabs: "",
    history: "",
    bookMarks: "",
    settings: "",
  })
  const [route, setRoute] = useState("tabs")
  // const [routeIdx, setRouteIdx] = useState(0)
  const [url, setUrl] = useState('https://google.com/')
  const [searchKeyWord, setSearchKeyWord] = useState('')
  const [pinnedWebsites, setPinnedWebsites] = useState([
    { siteTitle: 'Starting Page', siteUrl: 'mainPage' },
    { siteTitle: 'Google Search', siteUrl: 'https://google.com/' },
    { siteTitle: 'Youtube | Videos', siteUrl: 'https://youtube.com/' },
    { siteTitle: 'Amazon | Products', siteUrl: 'https://amazon.com/' },
  ]);
  const [tabs, setTabs] = useState([
    { tabName: 'Starting Page', tabUrl: 'mainPage' },
    { tabName: 'Google Search', tabUrl: 'https://google.com/' },
    { tabName: 'Youtube | Videos', tabUrl: 'https://youtube.com/' },
    { tabName: 'Amazon | Products', tabUrl: 'https://amazon.com/' },
  ]);
  const [history, setHistory] = useState([
    { pageTitle: 'Starting Page', pageUrl: 'mainPage' },
    { pageTitle: 'Google Search', pageUrl: 'https://google.com/' },
    { pageTitle: 'Youtube | Videos', pageUrl: 'https://youtube.com/' },
    { pageTitle: 'Amazon | Products', pageUrl: 'https://amazon.com/' },
  ])
  const [bookMarks, setBookMarks] = useState([
    { pageTitle: 'Starting Page', pageUrl: 'mainPage' },
    { pageTitle: 'Google Search', pageUrl: 'https://google.co/' },
    { pageTitle: 'Youtube | Videos', pageUrl: 'https://youtube.com/' },
    { pageTitle: 'Amazon | Products', pageUrl: 'https://amazon.com/' },
  ])
  const [settings, setSettings] = useState([
    { setting: 'Dark Theme', component: "checkbox", value: true },
    { setting: 'Short Bottom Panel', component: "checkbox", value: false },
  ])
  const [webViewProps, setWebViewProps] = useState({
    canGoBack: false,
    canGoForward: false,
  })

  const MainContextStates = {
    isDark,
    setIsDark,
    showScreens,
    setShowScreens,
    prevRoute,
    setPrevRoute,
    prevRoutes,
    setPrevRoutes,
    route,
    setRoute,
    searchKeyWord,
    setSearchKeyWord,
    url,
    setUrl,
    webViewProps,
    setWebViewProps,
    tabs,
    setTabs,
    history,
    setHistory,
    bookMarks,
    setBookMarks,
    settings,
    setSettings,
    pinnedWebsites,
    setPinnedWebsites
  };

  /*// console.log('Previous route', prevRoute, showScreens[prevRoute])
  // console.log('Current route', route, showScreens[route])
  console.log(Object.keys(prevRoutes).map(x => [x, showScreens[x]]))
  console.log('Previous routes', route, prevRoutes)*/
  console.log("##########################")
  // console.log("Going from:", prevRoutes[route])
  // console.log("Arriving at:", route)
  console.log(showScreens)
  console.log(prevRoutes)
  console.log(route)
  console.log("##########################")

  return <MainContext.Provider value={MainContextStates}>{children}</MainContext.Provider>
}
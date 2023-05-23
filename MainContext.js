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
  const [searchKeyWord, setSearchKeyWord] = useState('')
  const [pinnedWebsites, setPinnedWebsites] = useState([
    { siteTitle: 'Starting Page', siteUrl: 'mainPage' },
    { siteTitle: 'Google Search', siteUrl: 'https://google.com/' },
    { siteTitle: 'Youtube | Videos', siteUrl: 'https://youtube.com/' },
    { siteTitle: 'Amazon | Products', siteUrl: 'https://amazon.com/' },
  ]);
  const [tabs, setTabs] = useState([
    { tabName: 'Google Search', tabUrl: 'https://alsdkfj.com/', visible: false },
    { tabName: 'Youtube | Videos', tabUrl: 'https://laskdf.co/', visible: false },
    { tabName: 'Amazon | Products', tabUrl: 'https://dsfa.com/', visible: false },
    { tabName: 'First | Products', tabUrl: 'https://asdfas.com/', visible: false },
    { tabName: 'Second | Products', tabUrl: 'https://sadklf.com/', visible: false },
  ]);
  const [history, setHistory] = useState([
    { pageTitle: 'Starting Page', pageUrl: 'mainPage' },
    { pageTitle: 'Google Search', pageUrl: 'https://wiki.com/' },
    { pageTitle: 'Youtube | Videos', pageUrl: 'https://wiki.com/' },
    { pageTitle: 'Amazon | Products', pageUrl: 'https://wiki.com/' },
  ])
  const [bookMarks, setBookMarks] = useState([
    { pageTitle: 'Starting Page', pageUrl: 'mainPage' },
    { pageTitle: 'Google Search', pageUrl: 'https://wiki.com/' },
    { pageTitle: 'Youtube | Videos', pageUrl: 'https://wiki.com/' },
    { pageTitle: 'Amazon | Products', pageUrl: 'https://wiki.com/' },
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
  // console.log("##########################")
  // console.log("Going from:", prevRoutes[route])
  // console.log("Arriving at:", route)
  // console.log(showScreens)
  // console.log(prevRoutes)
  // console.log(route)
  // console.log("##########################")

  return <MainContext.Provider value={MainContextStates}>{children}</MainContext.Provider>
}
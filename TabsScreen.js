import { useContext } from 'react'
import { ScrollView } from 'react-native'
import { MainContext } from './MainContext'
import Tab from './components/Tab'
import Screen from './components/Screen'

export default function TabsScreen() {
  const {
    isDark,
    tabsVisible,
    setTabsVisible,
    tabs,
    setTabs,
  } = useContext(MainContext)
  
  function addTab() {
    setTabs((currTabs) => [
      ...currTabs,
      { tabName: 'Default Search Engine', tabUrl: 'https://wiki.com/' },
    ])
    // setShowScreens(currValue => ({...currValue, mainPage: true, tabs: false}))
    // setRoute("mainPage")
    // setPrevRoute("tabs")
  }
  
  
  return <Screen
            isDark={isDark}
            component={<Component tabs={tabs} setTabs={setTabs} />}
            title={`Tabs ${tabs.length}`}
            iconName="plus"
            iconOnPress={addTab}
            screenVisible={tabsVisible}
            setScreenVisible={setTabsVisible}
          />
}

export function Component({ tabs }) {
  return <ScrollView contentContainerStyle={{ flexDirection: "row", flexWrap: "wrap"}} >
    {tabs.map(({ tabName }, idx) => (
      <Tab
        key={idx}
        marginRight={idx % 2 === 0 ? 12 : 0}
        tabName={tabName}
        idx={idx}
      />
    ))}
  </ScrollView>
}
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
    setHistory
  } = useContext(MainContext)
  
  function addTab() {
    setTabs((currTabs) => [
      ...currTabs,
      { tabName: 'Google', tabUrl: 'https://google.com/', visible: true },
    ])
    setHistory(currVal => ([{ pageTitle: 'Google', pageUrl: 'https://google.com/' }, ...currVal]))
  }
  
  return <Screen
            isDark={isDark}
            component={<Component tabs={tabs} setTabs={setTabs} />}
            title={`Tabs ${tabs.length}`}
            iconName="plus"
            iconSize={28}
            iconOnPress={addTab}
            screenVisible={tabsVisible}
            onHideScreenPress={() => setTabsVisible(false)}
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
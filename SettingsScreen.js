import { ScrollView } from "react-native"
import { useContext, useMemo } from "react"
import { MainContext } from "./MainContext"
import SettingItem from "./components/SettingItem"
import Screen from './components/Screen'

export default function SettingsScreen() {
  const {
    isDark,
    settingsVisible,
    setSettingsVisible,
    settings,
    setSettings
  } = useContext(MainContext)

  return <Screen
    isDark={isDark}
    component={<Component settings={settings} />}
    title="Settings"
    setSettings={setSettings}
    screenVisible={settingsVisible}
    setScreenVisible={setSettingsVisible}
  />
}

export function Component({ isDark, settings }) {
  // function changeIsDark() {
  //   setIsDark((currIsDark) => !currIsDark)
  // }

  return (
    <ScrollView style={{}}>
      {settings.map((settings, idx) => (
        <SettingItem
          key={idx}
          isDark={isDark}
          setting={settings.setting}
          component={settings.component}
          value={settings.value}
        />
      ))}
    </ScrollView>
  )
}
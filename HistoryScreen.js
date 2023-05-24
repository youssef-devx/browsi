import { useContext } from 'react'
import { ScrollView } from 'react-native'
import { MainContext } from './MainContext'
import HistoryItem from './components/HistoryItem'
import Screen from './components/Screen'

export default function HistoryScreen() {
  const {
    isDark,
    history,
    setHistory,
    historyVisible,
    setHistoryVisible,
  } = useContext(MainContext)

  function deleteAll() {}

  return <Screen
          isDark={isDark}
          component={<Component history={history} />}
          title="History"
          iconName="trash"
          iconOnPress={deleteAll}
          setHistory={setHistory}
          screenVisible={historyVisible}
          setScreenVisible={setHistoryVisible}
        />
}

export function Component({ history }) {
  return (
    <ScrollView contentContainerStyle={{}}>
      {history.map(({ pageTitle, pageUrl }, idx) => (
        <HistoryItem
          key={idx}
          pageTitle={pageTitle}
          pageUrl={pageUrl}
          pageIdx={idx}
        />
      ))}
    </ScrollView>
  )
}

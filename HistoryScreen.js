import { useContext } from 'react'
import { ScrollView } from 'react-native'
import { MainContext } from './MainContext'
import HistoryItem from './components/HistoryItem'
import Screen from './components/Screen'

export default function HistoryScreen() {
  const {
    history,
    setHistory,
    historyVisible,
    setHistoryVisible,
  } = useContext(MainContext)

  function deleteAll() {}

  // onHideScreenPress = () => setHistoryVisible(false)

  return <Screen
          component={<Component history={history} />}
          title="History"
          iconName="trash-2"
          iconSize={24}
          iconOnPress={deleteAll}
          setHistory={setHistory}
          screenVisible={historyVisible}
          onHideScreenPress={() => setHistoryVisible(false)}
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

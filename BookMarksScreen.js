import { useContext } from 'react'
import { ScrollView } from 'react-native'
import { MainContext } from './MainContext'
import BookMarksItem from './components/BookMarksItem'
import Screen from './components/Screen'

export default function BookMarksScreen() {
  const {
    isDark,
    bookMarks,
    setBookMarks,
    bookMarksVisible,
    setBookMarksVisible,
  } = useContext(MainContext)

  function deleteAll() {}

  return <Screen
          isDark={isDark}
          component={<Component bookMarks={bookMarks} setBookMarks={setBookMarks} />}
          title="BookMarks"
          iconName="trash"
          iconOnPress={deleteAll}
          screenVisible={bookMarksVisible}
          setScreenVisible={setBookMarksVisible}
        />
}

export function Component({ bookMarks }) {
  return (
    <ScrollView contentContainerStyle={{}}>
      {bookMarks.map(({ pageTitle, pageUrl }, idx) => (
        <BookMarksItem
          key={idx}
          pageTitle={pageTitle}
          pageUrl={pageUrl}
          pageIdx={idx}
        />
      ))}
    </ScrollView>
  )
}

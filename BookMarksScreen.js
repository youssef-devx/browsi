import { useContext } from 'react'
import { ScrollView } from 'react-native'
import { MainContext } from './MainContext'
import BookMarksItem from './components/BookMarksItem'
import Screen from './components/Screen'

export default function BookMarksScreen() {
  const {
    bookMarks,
    setBookMarks,
    bookMarksVisible,
    setBookMarksVisible,
  } = useContext(MainContext)

  function deleteAll() {}

  return <Screen
          component={<Component bookMarks={bookMarks} setBookMarks={setBookMarks} />}
          title="BookMarks"
          iconName="trash-2"
          iconSize={24}
          iconOnPress={deleteAll}
          screenVisible={bookMarksVisible}
          onHideScreenPress={() => setBookMarksVisible(false)}
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

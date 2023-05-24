import { useContext, useState, useMemo, memo } from 'react'
import { TouchableOpacity, View, Text, StyleSheet } from 'react-native'
import { Feather } from '@expo/vector-icons'
import { MainContext } from '../MainContext'
import Constants from 'expo-constants'

export default memo(function HistoryItem({
  isDark,
  pageTitle,
  pageUrl,
  pageIdx,
}) {
  const { setTabs, setHistory } = useContext(MainContext)
  const [show, setShow] = useState(false);

  const showOrHideStyles = useMemo(() => ({
    backgroundColor: isDark ? "#171717" : "#f7f7f7",
    opacity: show ? 1 : 0,
    bottom: show ? 56 : -100,
    right: show ? 12 : -100,
  }), [isDark])

  function deletePage() {
    setHistory((currHistory) => [
      ...currHistory.filter((_, idx) => idx !== pageIdx),
    ]);
  }

  function naviteToPage() {
    // if (!isWebView) setRoute("mainPage");
    // setUrl(tabUrl);
    // setRoute("webpage");
    /* setTabs(currVals => ({
      ...currVals,
      { tabName: pageTitle, tabUrl: pageUrl, visible: true }
    }))*/
  }

  return (
    <TouchableOpacity
      style={[{ backgroundColor: isDark ? "#171717" : "#f7f7f7" }, styles.page]}
      onPress={naviteToPage}
    >
      <Text style={[{ color: isDark ? "grey" : "#0b0b0c" }, styles.pageTitle]}>
        {pageTitle}
      </Text>
      <View style={styles.more}>
        <View
          style={styles.pageOptions}
          onPress={() => setShow((currShow) => !currShow)}
        >
          <Feather
            name="more-vertical"
            size={24}
            color={isDark ? "grey" : "#0b0b0c"}
          />
        </View>
        <View style={[showOrHideStyles, styles.menu]}>
          <View style={styles.menuItem} onPress={deletePage}>
            <Feather
              name="trash"
              size={24}
              color={isDark ? "#ffffff" : "#0b0b0c"}
            />
            <Text style={styles.listItem}>Trash</Text>
          </View>
          <View style={styles.menuItem}>
            <Feather
              name="copy"
              size={24}
              color={isDark ? "#ffffff" : "#0b0b0c"}
            />
            <Text style={styles.listItem}>Copy Link</Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
})

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: "absolute",
    paddingTop: Constants.statusBarHeight + 16,
    padding: 20,
  },
  flexLogoAndIcon: {
    marginBottom: 16,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  title: {
    fontWeight: "bold",
    fontSize: 24,
  },
  page: {
    marginBottom: 12,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 16,
    borderRadius: 12,
  },
  pageTitle: { fontWeight: "bold" },
  more: { position: "relative" },
  menu: {
    flex: 1,
    gap: 12,
    padding: 12,
    borderRadius: 12,
    position: "absolute",
  },
  menuItem: { flex: 1, flexDirection: "row", alignItems: "center", gap: 8 },
})
import { Feather } from '@expo/vector-icons'
import { useContext, useState, useMemo, memo, useEffect } from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import Constants from 'expo-constants'
import { MainContext } from '../MainContext'

const styles = StyleSheet.create({
  bottomPanel: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 20,
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
  },
  panelItem: {
    // TODO: padding: 12, turn this in to settings
    padding: 12,
    borderRadius: 12,
  },
  more: {
    position: 'relative',
  },
  menu: {
    padding: 12,
    borderRadius: 12,
    position: 'absolute',
  },
  menuItem: { width: "100%", flex: 1, flexDirection: 'row', alignItems: 'center', padding: 4 },
  listItem: {
    margin: 8
  },
  themIcon: {
    padding: 8,
    paddingTop: 10,
    paddingLeft: 10,
    position: "absolute",
    top: Constants.statusBarHeight + 12,
    right: 12,
    borderWidth: 1,
    borderRadius: 12
  }
})

export default memo(function BottomPanel({ webViewProps, onGoBackPress, onGoForwardPress }) {
  const {
    isDark,
    tabsVisible,
    setTabsVisible,
    setShowBottomSheet,
    tabs,
    setTabs,
    setSheetArr
  } = useContext(MainContext)
  const { canGoBack, canGoForward } = webViewProps
  const forwardIconColor =  isDark ? `#ffffff${canGoForward ? "" : "50"}` : `#0b0b0c${!canGoForward ? "" : "05"}`
  const backIconColor = isDark ? `#ffffff${canGoBack ? "" : "50"}` : `#0b0b0c${!canGoBack ? "" : "05"}`

  function showTabs() {
    tabsVisible ?
      setTabs((currTabs) => [...currTabs.map(currTab => currTab.visible === true ? {
      ...currTab, visible: false
      } : currTab )]) :
      setTabsVisible(currVal => !currVal)
  }

  return (
    <View
      style={[
        { backgroundColor: isDark ? '#171717' : '#fdfdfd' },
        styles.bottomPanel,
      ]}>
      <TouchableOpacity style={styles.panelItem}>
        <Feather
          style={[{borderColor: isDark ? "#ffffff" : "#0b0b0c"}, styles.themeIcon]}
          name="chevron-left" size={24} color={backIconColor}
          onPress={onGoBackPress}
        />
      </TouchableOpacity>
      <TouchableOpacity style={styles.panelItem}>
        <Feather
          style={[{borderColor: isDark ? "#ffffff" : "#0b0b0c"}, styles.themeIcon]}
          name="chevron-right" size={24} color={forwardIconColor}
          onPress={onGoForwardPress}
        />
      </TouchableOpacity>
      <TouchableOpacity onPress={showTabs} style={[
        {
          paddingHorizontal: 16,
          borderWidth: 2,
          borderColor: isDark ? 'grey' : '#0b0b0c',
        },
        styles.panelItem,
      ]}>
        <Text
          style={{
              color: isDark ? 'grey' : '#0b0b0c',
              fontWeight: 'bold'
            }}>
          {tabs.length}
        </Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.panelItem} onPress={() => setShowBottomSheet(currShow => !currShow)}>
        <Feather
          style={[{borderColor: isDark ? "grey" : "#0b0b0c"}, styles.themeIcon]}
          name="list" size={24} color={isDark ? "grey" : "#0b0b0c"}
        />
      </TouchableOpacity>
    </View>
  )
})

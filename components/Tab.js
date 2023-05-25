import { useContext, useState, useMemo, memo } from 'react'
import { TouchableOpacity, View, Text, StyleSheet, useWindowDimensions } from 'react-native'
import { Feather } from '@expo/vector-icons'
import { MainContext } from '../MainContext'

export default memo(function Tab({ marginRight, tabName, idx }) {
  const { isDark, setTabs } = useContext(MainContext)
  const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = useWindowDimensions()
  const TAB_WIDTH = (SCREEN_WIDTH - 40 - 12) / 2

  function deleteTab() {
    // setTabs((currTabs) => [...currTabs.filter((_, tIdx) => tIdx !== idx)])
  }

  function showWebView() {
    setTabs((currTabs) => [...currTabs.map((currTab, tIdx) => tIdx === idx ? {
    ...currTab, visible: true
    } : currTab )])
  }

  return <TouchableOpacity
      style={[{
        backgroundColor: isDark ? '#171717' : '#f7f7f7',
        width: TAB_WIDTH, height: TAB_WIDTH, marginRight }, styles.tab]}
      onPress={showWebView}
    >
    <View
      style={{
        flex: 1,
        borderTopLeftRadius: 12,
        borderTopRightRadius: 12,
      }}
      >
      <Feather name="globe" size={40} color={isDark ? "grey" : "#0b0b0c"}
          style={{top: "50%", left: "50%", transform: [{translateY: -(40 / 2)}, {translateX: -(40 / 2)}]}}
        />
    </View>
    <Text numberOfLines={1} style={[{ color: isDark ? 'grey' : '#0b0b0c' }, styles.tabName]}>{tabName}</Text>
  </TouchableOpacity>
})

const styles = StyleSheet.create({
  tab: {
    height: 128,
    marginBottom: 12,
    borderRadius: 12,
  },
  webView: {
    flex: 1,
  },
  tabName: {
    width: "100%",
    fontSize: 12,
    padding: 12,
    borderBottomLeftRadius: 12,
    borderBottomRightRadius: 12,
    backgroundColor: "#292929"
  }
})
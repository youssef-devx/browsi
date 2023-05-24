import { useContext, useState, useMemo, memo } from 'react'
import { TouchableOpacity, View, Text, StyleSheet } from 'react-native'
import { Feather } from '@expo/vector-icons'
import { MainContext } from '../MainContext'
import CheckBox from "./CheckBox"
import Constants from 'expo-constants'

export default memo(function SettingItem({ isDark, setting, component, value }) {

  return <View style={styles.setting}>
    <Text style={[{ color: isDark ? "grey" : "white" }, styles.label]}>{setting}</Text>
    {component === "checkbox" ? <CheckBox isDark={isDark} value={value} /> : null}
  </View>
})

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: "absolute",
    paddingTop: Constants.statusBarHeight + 16,
    padding: 20,
  },
  flexLogoAndIcon: {
    marginBottom: 24,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  title: {
    fontWeight: "bold",
    fontSize: 24,
  },
  setting: {
    // marginBottom: 12,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 16,
    borderRadius: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#222222",
    borderTopWidth: 1,
    borderTopColor: "#222222",
  },
  label: { fontWeight: "bold", fontSize: 16 },
})

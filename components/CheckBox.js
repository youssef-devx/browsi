import { memo } from "react"
import { Feather } from "@expo/vector-icons";
import { TouchableOpacity, StyleSheet } from "react-native"
import { useState, meom } from "react";

export default memo(function CheckBox({ isDark, value }) {
  const [checked, setChecked] = useState(value)

  return <TouchableOpacity
      style={[{ borderColor: isDark ? "grey" : "#0b0b0c" }, styles.container]}
      onPress={() => setChecked(currChecked => !currChecked)}
    >
    { checked && <Feather name="check" size={16} color={isDark ? "grey" : "#0b0b0c"}/>}
  </TouchableOpacity>
})

const styles = StyleSheet.create({
  container: {
    padding: 4,
    width: 28,
    aspectRatio: 1,
    borderWidth: 2,
    borderRadius: 8,
    alignItems: "center",
    justifyItems: "center"
  }
})
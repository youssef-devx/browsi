import {View, Text, StyleSheet, TouchableOpacity} from "react-native"
import Constants from 'expo-constants';
import { Feather } from "@expo/vector-icons";

export default function SearchBar({ isDark, title, url, setUrl }) {
  return <View style={[{ backgroundColor: isDark ? '#0b0b0c' : '#fdfdfd' } , styles.searchBar]}>
    
    <TouchableOpacity onPress={() => {console.log('her');setUrl("https://wiki.com")}}>
      <Text style={{color: isDark ? "#ffffff" : "#0b0b0c"}}>{title}</Text>
    </TouchableOpacity>
    <TouchableOpacity onPress={() => {console.log('her');setUrl("https://wiki.com")}}>
      <Feather name="rotate-ccw" size={24} color={isDark ? '#ffffff' : '#0b0b0c'}/>
    </TouchableOpacity>
  </View>
}

const styles = StyleSheet.create({
  searchBar: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 12,
    paddingTop: Constants.statusBarHeight + 12,
  },
  title: {
    backgroundColor: 'red'
  }
})
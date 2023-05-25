import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { useState } from 'react';

const styles = StyleSheet.create({
  pinnedSites: {
    flex: 1,
    gap: 40
  },
  item: {
    alignSelf: 'center',
    padding: 24,
    borderRadius: 20,
  }
})

export default function PinnedSites({isDark}) {
  const [pinnedSites, setPinnedSite] = useState([
    { label: 'Google' },
    { label: 'Youtube' },
    { label: 'Google' },
    { label: 'Youtube' },
    { label: 'Google' },
    { label: 'Youtube' }
  ]);

  return (
    <View style={styles.pinnedSites}>
      <View style={{flexDirection: "row", gap: 40}}>
        {pinnedSites.slice(0, 3).map((site, idx) => <Item key={idx} label={site.label} onPress={() => {}}/>)}
      </View>
      <View style={{flexDirection: "row", gap: 40}}>
      {pinnedSites.slice(3, 6).map((site, idx) => <Item key={idx} label={site.label} onPress={() => {}}/>)}
      </View>
    </View>
  );
}

export function Item({ isDark, label, onPress }) {
  return (
    <View style={{flex: 1, alignItems: "center", gap: 12, margin: 12}}>
      <TouchableOpacity onPress={onPress} style={[{backgroundColor: isDark ? "#303036" : '#f7f7f7'}, styles.item]}>
        <Text style={{fontWeight: "bold", color: isDark ? "#ffffff" : "#0b0b0c"}}>{label[0]}</Text>
      </TouchableOpacity>
      <Text style={{color: isDark ? "#ffffff" : "#0b0b0c"}}>{label}</Text>
    </View>
  )
}
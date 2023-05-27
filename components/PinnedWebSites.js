import {
  Keyboard,
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  useWindowDimensions,
  Image,
} from "react-native";
import { useState, useContext } from "react";
import { MainContext } from "../MainContext";
import { Feather } from "@expo/vector-icons";

export default function PinnedWebSites() {
  const { isDark, pinnedWebsites, setTabs, setTabsVisible, setHistory } = useContext(MainContext);
  const { width: SCREEN_WIDTH } = useWindowDimensions();
  const ITEM_WIDTH = (SCREEN_WIDTH - 64 - 36) / 3;

  function goToPageUrl(pageTitle, pageUrl) {
    setTabsVisible(true)
    setTabs(currVal => ([
      ...currVal,
      { tabName: pageTitle, tabUrl: pageUrl, visible: true },
    ]))
    Keyboard.dismiss()
    setHistory(currVal => ([{ pageTitle, pageUrl }, ...currVal]))
  }

  return (
    <View style={styles.pinnedWebsites}>
      {pinnedWebsites.slice(0, 3).map((website, idx) => (
        <TouchableOpacity
          key={idx}
          onPress={() => goToPageUrl(website.pageTitle, website.pageUrl)}
          style={{ marginBottom: 18, width: ITEM_WIDTH }}
        >
          <View
            style={[
              {
                justifyContent: "center",
                marginBottom: 8,
                height: ITEM_WIDTH,
                backgroundColor: isDark ? "#171717" : "#f7f7f7",
              },
              styles.item,
            ]}
          >
            {website.favIcon ? (
              <Image
                source={{ uri: website.favIcon }}
                style={{ width: 28, height: 28, borderRadius: 8 }}
              />
            ) : (
              <Feather
                name="globe"
                size={28}
                color={isDark ? "grey" : "#0b0b0c"}
              />
            )}
          </View>
          <Text
            style={{
              alignSelf: "center",
              color: isDark ? "grey" : "#0b0b0c",
              width: ITEM_WIDTH / 2.5,
            }}
            numberOfLines={1}
          >
            {website.pageTitle}
          </Text>
        </TouchableOpacity>
      ))}
      {pinnedWebsites.slice(3, 6).map((website, idx) => (
        <TouchableOpacity
          key={idx}
          onPress={() => goToPageUrl(website.pageTitle, website.pageUrl)}
          style={{ width: ITEM_WIDTH }}
        >
          <View
            style={[
              {
                justifyContent: "center",
                marginBottom: 8,
                height: ITEM_WIDTH,
                backgroundColor: isDark ? "#171717" : "#f7f7f7",
              },
              styles.item,
            ]}
          >
            {website.favIcon ? (
              <Image
                source={{ uri: website.favIcon }}
                style={{ width: 28, height: 28, borderRadius: 8 }}
              />
            ) : (
              <Feather
                name="globe"
                size={28}
                color={isDark ? "grey" : "#0b0b0c"}
              />
            )}
          </View>
          <Text
            style={{
              alignSelf: "center",
              color: isDark ? "grey" : "#0b0b0c",
              width: ITEM_WIDTH / 2.5,
            }}
            numberOfLines={1}
          >
            {website.pageTitle}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  pinnedWebsites: {
    width: "100%",
    gap: 12,
    display: "flex",
    justifyContent: "space-between",
    flexDirection: "row",
    flexWrap: "wrap",
  },
  item: {
    padding: 24,
    borderRadius: 20,
    alignItems: "center",
  },
});

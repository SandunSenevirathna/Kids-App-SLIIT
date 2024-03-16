import React from "react";
import {
  Image,
  ImageBackground,
  StyleSheet,
  Text,
  TouchableHighlight,
  TouchableNativeFeedback,
  View,
} from "react-native";

function Settings({ navigation }) {
  return (
    <ImageBackground
      source={require("../../assets/BG_01.png")}
      style={styles.imageBackground}
      resizeMode="cover"
    >
      <View>
        <Text style={styles.Title}>Settings</Text>
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
            marginTop: 150
          }}
        >
          <View style={styles.smallButtons}>
            <TouchableHighlight
              activeOpacity={1}
              underlayColor="#DDDDDD"
              onPress={() => { navigation.navigate('AddQuactions');}}
              style={styles.touchableHighlightSmallButton}
            >
              <Image
                source={require("../../assets/faq.png")}
                style={{ width: 60, height: 60 }}
              />
            </TouchableHighlight>
            <Text style={styles.smallButtonsText}>FAQ</Text>
          </View>
          <View style={styles.smallButtons}>
            <TouchableHighlight
              activeOpacity={1}
              underlayColor="#DDDDDD"
              onPress={() => {}}
              style={styles.touchableHighlightSmallButton}
            >
              <Image
                source={require("../../assets/add-gray.png")}
                style={{ width: 60, height: 60 }}
              />
            </TouchableHighlight>
            <Text style={styles.smallButtonsText}>---</Text>
          </View>
          <View style={styles.smallButtons}>
            <TouchableHighlight
              activeOpacity={1}
              underlayColor="#DDDDDD"
              onPress={() => {}}
              style={styles.touchableHighlightSmallButton}
            >
              <Image
                source={require("../../assets/add-gray.png")}
                style={{ width: 60, height: 60 }}
              />
            </TouchableHighlight>
            <Text style={styles.smallButtonsText}>---</Text>
          </View>
        </View>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  imageBackground: {
    flex: 1,
    justifyContent: "flex-start",
  },
  Title: {
    justifyContent: "flex-start",
    top: 50,
    marginLeft: 20,
    fontSize: 18,
    color: "#ffff",
    fontWeight: "600",
  },
  smallButtons: {
    alignItems: "center",
    justifyContent: "center",
    marginTop: 30,
    margin: 20,
  },
  touchableHighlightSmallButton: {
    width: 70,
    height: 70,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  smallButtonsText: {
    marginTop:5,
    fontWeight: "600",
    color: "#888888"
  },
});

export default Settings;

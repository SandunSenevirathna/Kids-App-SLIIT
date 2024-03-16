import React from "react";
import {
  Image,
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import studentData from "../../../../studentData";
function History({ navigation }) {
  return (
    <ImageBackground
      source={require("../../../assets/BG_01.png")}
      style={styles.imageBackground}
      resizeMode="cover"
    >
      <View style={styles.container}>
        <View>
          <Text style={styles.helloStudent}>
            {studentData.studentName}'s History
          </Text>
        </View>

        <View
          style={{
            marginTop: 200,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <TouchableOpacity
            style={[
              styles.rectangle,
              {
                backgroundColor: "#7C7AF8",
                height: 100,
                justifyContent: "center",
              },
            ]}
            onPress={() => navigation.navigate("ColourShapesDragGameHistory")}
          >
            <View
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <Text style={[styles.rectangleTitle, { marginLeft: 30 }]}>
                Colour Shapes Drag Game
              </Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.rectangle,
              {
                backgroundColor: "#7C7AF8",
                height: 100,
                justifyContent: "center",
              },
            ]}
            onPress={() => navigation.navigate("StoryQuactionGameHistory")}
          >
            <View
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <Text style={[styles.rectangleTitle, { marginLeft: 30 }]}>
                Story Quaction Game
              </Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.rectangle,
              {
                backgroundColor: "#7C7AF8",
                height: 100,
                justifyContent: "center",
              },
            ]}
            onPress={() => navigation.navigate("ColourObjectSelectGameHistory")}
          >
            <View
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <Text style={[styles.rectangleTitle, { marginLeft: 30 }]}>
              Colour Object Select Game
              </Text>
            </View>
          </TouchableOpacity>
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
  helloStudent: {
    justifyContent: "flex-start",
    top: 50,
    marginLeft: 20,
    fontSize: 18,
    color: "#ffff",
    fontWeight: "600",
  },

  rectangle: {
    width: "85%",
    height: 300,
    marginTop: 20,
    marginLeft: 20,
    marginRight: 20,
    backgroundColor: "#ffff",
    borderRadius: 10,
    elevation: 6,
    shadowRadius: 15,
    shadowOffset: { width: 1, height: 13 },
  },

  rectangleTitle: {
    marginLeft: 10,
    fontSize: 20,
    fontWeight: "600",
    color: "#ffff",
  },
  rectangleMoveBar: {
    height: 40,
    margin: 10,
    backgroundColor: "#ffff",
    borderRadius: 10,
  },
});

export default History;

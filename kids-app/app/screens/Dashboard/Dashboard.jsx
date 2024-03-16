import React, { useState } from "react";
import {
  Image,
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import BarCharts from "./BarCharts/BarCharts";
import teacherData from "../../../teacherData";
import studentData from "../../../studentData";

function Dashboard({ navigation }) {
  const [selectedGameIndex, setSelectedGameIndex] = useState(2); // Starting with the index of "Colour Object Select Game"

  const gameNames = [
    "Colour Shapes Drag Game",
    "Story Quaction Game",
    "Colour Object Select Game",
  ];

  const handleLeftButtonPress = () => {
    const newIndex = (selectedGameIndex - 1 + gameNames.length) % gameNames.length;
    setSelectedGameIndex(newIndex);
  };

  const handleRightButtonPress = () => {
    const newIndex = (selectedGameIndex + 1) % gameNames.length;
    setSelectedGameIndex(newIndex);
  };

  return (
    <ImageBackground
      source={require("../../assets/BG_01.png")}
      style={styles.imageBackground}
      resizeMode="cover"
    >
      <View style={styles.container}>
        <View>
          <Text style={styles.helloStudent}>
            Hello, {studentData.studentName}
          </Text>
        </View>

        <View style={{ top: 130, alignItems: "center" }}>
          {/* this is for Dashbord */}
         <View>
         <TouchableOpacity
            style={[
              styles.rectangle,
              {
                backgroundColor: "#7C7AF8",
                height: 50,
                justifyContent: "center",
                marginBottom: 10,
              },
            ]}
            onPress={() => navigation.navigate("CheckStatus")}
          >
            <View
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <Text style={[styles.rectangleTitle, {marginRight: 10, fontSize:15}]}>
                Check Status
              </Text>
            
            </View>
          </TouchableOpacity>
         </View>
          <View style={styles.rectangle}>
            <View
              style={[
                styles.rectangleMoveBar,
                {
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-between",
                },
              ]}
            >
              <TouchableOpacity onPress={handleLeftButtonPress}>
                <Image
                  source={require("../../assets/next.png")}
                  style={{
                    width: 35,
                    height: 35,
                    transform: [{ rotate: "180deg" }],
                  }}
                />
              </TouchableOpacity>

              <TouchableOpacity onPress={handleRightButtonPress}>
                <Image
                  source={require("../../assets/next.png")}
                  style={{
                    width: 35,
                    height: 35,
                  }}
                />
              </TouchableOpacity>
            </View>
            <BarCharts  teacherNIC={teacherData.nicNumber} studentID={studentData.studentID} selectedGame={gameNames[selectedGameIndex]} />
          </View>

          {/* this is for History */}
          <TouchableOpacity
            style={[
              styles.rectangle,
              {
                backgroundColor: "#7C7AF8",
                height: 100,
                top: 20,
                justifyContent: "center",
              },
            ]}
            onPress={() => navigation.navigate("History")}
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
                History
              </Text>
              <Image
                source={require("../../assets/history.png")}
                style={{ marginRight: 30, width: 50, height: 50 }}
              />
            </View>
          </TouchableOpacity>

          {/* this is for Game */}
          <TouchableOpacity
            style={[
              styles.rectangle,
              {
                backgroundColor: "#7C7AF8",
                height: 100,
                top: 30,
                justifyContent: "center",
              },
            ]}
            onPress={() => navigation.navigate("GamesMenu")}
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
                Play Game
              </Text>
              <Image
                source={require("../../assets/game.png")}
                style={{
                  marginRight: 30,
                  width: 50,
                  height: 50,
                  tintColor: "#ffff",
                }}
              />
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
  container: {},

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

export default Dashboard;

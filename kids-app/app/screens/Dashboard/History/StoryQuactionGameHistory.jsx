import React, { useState } from "react";
import { useFocusEffect } from "@react-navigation/native";

import {
  Image,
  ImageBackground,
  StyleSheet,
  Text,
  View,
  ScrollView,
  Alert,
  Animated,
  TouchableWithoutFeedback,
} from "react-native";
import config from "../../../../ipAddress";
import teacherData from "../../../../teacherData";
import studentData from "../../../../studentData";

const StoryQuactionGameHistory = ({ navigation }) => {
  const localIp = config.localIp; // Get the local IP address
  const [gameData, setGameData] = useState([]);
  const animatedValues = gameData.map(() => new Animated.Value(1)); // Initialize animate

  useFocusEffect(
    React.useCallback(() => {
      const fetchPlayedGameData = async () => {
        try {
          const response = await fetch(
            `http://${localIp}:5000/fetchPlayedGameData`,
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                teacherNIC: teacherData.nicNumber,
                studentID: studentData.studentID,
                gameName: "Story Quaction Game",
              }),
            }
          );

          const data = await response.json();

          if (data.success) {
            setGameData(data.message);
          } else {
            console.error("Error fetching gameData data:", data.message);
          }
        } catch (error) {
          console.error("Error fetching gameData data:", error);
        }
      };

      fetchPlayedGameData();
    }, []) // The empty dependency array ensures this effect only runs once when the component mounts
  );

  const renderCard = (gameinfo, index) => (
    <View key={index}>
      <Animated.View
        style={[
          styles.cardView,
          { transform: [{ scale: animatedValues[index] }] },
        ]}
      >
        <Image
          source={require("../../../assets/history.png")}
          style={{ margin: 20, width: 40, height: 40, tintColor: "black" }}
        />
        <View style={{ flexDirection: "column", padding: 10 }}>
          <Text style={{ fontWeight: "600" }}>
            Date: {gameinfo.currentDate}
          </Text>
          <Text style={{ fontWeight: "600" }}>Time: {gameinfo.startTime}</Text>
          <Text style={{ fontWeight: "600" }}>
            AVG Time: {gameinfo.avgTime}s
          </Text>
          <Text style={{ fontWeight: "600" }}>
            Correct Round: {gameinfo.correctRoundsPlayed}
          </Text>
          <Text style={{ fontWeight: "600" }}>
            Incorrect Round: {gameinfo.incorrectRoundsPlayed}
          </Text>
        </View>
      </Animated.View>
    </View>
  );

  return (
    <ImageBackground
      source={require("../../../assets/BG_01.png")}
      style={styles.imageBackground}
      resizeMode="cover"
    >
      <Text style={styles.Title}> Story Quaction Game History</Text>
      <View style={styles.container}>
        <ScrollView
          contentContainerStyle={styles.scrollViewContent}
          style={styles.scrollView}
        >
          {gameData.map((gameinfo, index) => renderCard(gameinfo, index))}
        </ScrollView>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  imageBackground: {
    flex: 1,
    justifyContent: "flex-start",
  },
  container: {
    flex: 1,
    marginLeft: 50,
    marginRight: 50,
    marginTop: 130,
    marginBottom: 50,
  },
  Title: {
    marginTop: 50,
    marginLeft: 10,
    fontSize: 18,
    color: "#ffff",
    fontWeight: "600",
  },
  cardView: {
    flexDirection: "row",
    backgroundColor: "#F1F3F9",
    alignSelf: "center",
    width: "100%",
    borderRadius: 20,
    marginBottom: 10,
    alignItems: "center",
    justifyContent: "flex-start",
  },
  items: {
    marginTop: 10,
    padding: 5,
    borderColor: "pink",
    fontSize: 24,
  },
  addButtonContainer: {
    alignSelf: "center",
    marginBottom: 100,
  },
});

export default StoryQuactionGameHistory;

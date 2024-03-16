import React, { useState, useRef, useEffect } from "react";
import { View, Text, ImageBackground, StyleSheet } from "react-native";
import RoundedButton from "../../../components/RoundedButtonAnimation";
import studentData from "../../../../../studentData";

const ADHD_MidScreen = ({ navigation, route }) => {
  const { predictionMessage } = route.params;

  return (
    <ImageBackground
      source={require("../../../../assets/BG_02.png")}
      style={[styles.imageBackground]}
      resizeMode="cover"
    >
      <View>
        <View>
          <Text style={styles.gameName}>ADHD Next Step</Text>
        </View>

        <View
          style={{
            marginTop: 100,
            alignItems: "center",
          }}
        >
          <View style={[styles.studentProfileArea, { alignItems: "center" }]}>
            <Text
              style={{ marginTop: 10, fontWeight: "500", color: "#7C7AF9" }}
            >
              {studentData.studentName}
            </Text>
          </View>

          <View style={{ marginTop: 230, marginBottom: 50 }}>
            <Text style={{ fontSize: 18, fontWeight: "600" }}>
              {predictionMessage}
            </Text>
          </View>
          <RoundedButton title={"Continue"} onPress={() => navigation.navigate("ADHD_Levels", {predictionMessage})}/>
        </View>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  imageBackground: {
    flex: 1,
    justifyContent: "flex-start",
  },
  gameName: {
    justifyContent: "flex-start",
    top: 50,
    marginLeft: 20,
    fontSize: 20,
    color: "#fff",
    fontWeight: "600",
  },
  studentProfileArea: {
    width: 200,
    height: "auto",
    paddingBottom: 10,
    borderRadius: 25,
    backgroundColor: "#ffff",
    overflow: "hidden",
    shadowColor: "#000",
    shadowOpacity: 0.3,
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowRadius: 4,
    elevation: 5,
  },
});

export default ADHD_MidScreen;

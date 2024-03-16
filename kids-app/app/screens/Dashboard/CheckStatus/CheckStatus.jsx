import React, { useState, useRef, useEffect } from "react";
import {
  Image,
  View,
  Text,
  ImageBackground,
  StyleSheet,
  Animated,
  Easing,
} from "react-native";
import RoundedButtonAnimation from "../../components/RoundedButtonAnimation";
import studentData from "../../../../studentData";
import teacherData from "../../../../teacherData";
import config from "../../../../ipAddress";

const CheckStatus = ({ navigation }) => {
  const localIp = config.localIp;
  const studentID = studentData.studentID;
  const teacherNIC = teacherData.nicNumber;
  console.log(`studentID ${studentID} teacherNIC ${teacherNIC}`);

  const [adhdStatus, setAdhdStatus] = useState("--");
  const [anxietyStatus, setAnxietyStatus] = useState("--");

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch status data
        const response = await fetch(
          `http://${localIp}:5000/CheckStatusgamesPlayedData?teacherNIC=${teacherNIC}&studentID=${studentID}`
        );
        const dataList = await response.json();

        //console.log("Data List:", dataList);
        if (dataList.success && dataList.statusDataList) {
          // Find the status data for the "ANXIETY" game
          const anxietyData = dataList.statusDataList.find(
            (item) => item.gameName === "ANXIETY"
          );
          if (anxietyData) {
            // Extract the status type
            const anxietyStatusType = anxietyData.statusType;
            // Set the anxiety status
            setAnxietyStatus(anxietyStatusType);
          }
          const adhdData = dataList.statusDataList.find(
            (item) => item.gameName === "ADHD"
          );
          if (adhdData) {
            // Extract the status type
            const adhdStatusType = adhdData.statusType;
            // Set the anxiety status
            setAdhdStatus(adhdStatusType);
          }
        } else {
          console.log("Error fetching status:", dataList.message);
        }
      } catch (error) {
        console.error("Error fetching status:", error);
      }
    };

    fetchData(); // Call the fetchData function when the component mounts

    const intervalId = setInterval(fetchData, 5000); // Refresh data every 10 seconds

    // Clear interval on component unmount to prevent memory leaks
    return () => clearInterval(intervalId);
  }, []); // The empty dependency array ensures useEffect runs only once, when the component mounts

  return (
    <ImageBackground
      source={require("../../../assets/BG_02.png")}
      style={[styles.imageBackground]}
      resizeMode="cover"
    >
      <View>
        <View>
          <Text style={styles.gameName}>Check Status Quactions</Text>
        </View>

        <View
          style={{
            marginTop: 100,
            alignItems: "center",
          }}
        >
          <View style={[styles.studentProfileArea, { alignItems: "center" }]}>
            <Text
              style={{
                marginTop: 10,
                fontWeight: "700",
                fontSize: 18,
                color: "#7C7AF9",
              }}
            >
              {studentData.studentName}
            </Text>

            <View style={{ display: "flex", flexDirection: "row" }}>
              <View style={{ alignItems: "center", marginRight: 10 }}>
                <Text
                  style={{ marginTop: 10, fontWeight: "700", color: "#7C7AF9" }}
                >
                  ADHD
                </Text>

                <Text
                  style={{
                    marginTop: 6,
                    fontSize: 15,
                    fontWeight: "600",
                    color: "#7C7AF9",
                  }}
                >
                  {adhdStatus}
                </Text>
              </View>

              <View style={{ alignItems: "center" }}>
                <Text
                  style={{ marginTop: 10, fontWeight: "700", color: "#7C7AF9" }}
                >
                  ANXIETY
                </Text>
                <Text
                  style={{
                    marginTop: 6,
                    fontSize: 15,
                    fontWeight: "600",
                    color: "#7C7AF9",
                  }}
                >
                  {anxietyStatus}
                </Text>
              </View>
            </View>
          </View>

          <View
            style={{ display: "flex", flexDirection: "row", marginTop: 200 }}
          >
            <RoundedButtonAnimation
              title={"ADHD"}
              onPress={() => navigation.navigate("ADHD")}
              buttonheight={100}
              buttonwidth={100}
              borderRadius={10}
              style={{ marginLeft: 20 }}
            />
            <View style={{ margin: 10 }}></View>
            <RoundedButtonAnimation
              title={"Anxiety"}
              onPress={() => navigation.navigate("ANXIETY")}
              buttonheight={100}
              buttonwidth={100}
              borderRadius={10}
            />
          </View>
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
    minWidth: 250,
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

  radioButtonContainer: {
    marginTop: 10,
  },
  radioButtonItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: -15, // Align items horizontally
  },
  popupContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 100,
  },
  popupImage: {
    width: 300, // Adjust the width as per your image dimensions
    height: 300, // Adjust the height as per your image dimensions
  },
});

export default CheckStatus;

import React, { useState, useEffect, useRef } from "react";
import {
  ImageBackground,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  Animated,
  Easing,
} from "react-native";

import teacherData from "../../../../teacherData";
import studentData from "../../../../studentData";
import config from "../../../../ipAddress";
import moment from "moment/moment";

const images = {
  image1: require("../../../assets/L.png"),
  image2: require("../../../assets/M_2.png"),
  image3: require("../../../assets/M.png"),
};

const ColourObjectSelectGame = ({ navigation }) => {
  const localIp = config.localIp;
  const studentID = studentData.studentID;
  const teacherNIC = teacherData.nicNumber;

  const [selectedRectangles, setSelectedRectangles] = useState([]);
  const [bigRectangleImage, setBigRectangleImage] = useState(null);
  const [smallRectangleImages, setSmallRectangleImages] = useState([]);
  const [retryCount, setRetryCount] = useState(0); // Track the number of retries
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const [successPopupVisible, setSuccessPopupVisible] = useState(false);
  const [failurePopupVisible, setFailurePopupVisible] = useState(false);
  const [roundsPlayed, setRoundsPlayed] = useState(1);
  const [correctRoundsPlayed, setCorrectRoundsPlayed] = useState(0);
  const [incorrectRoundsPlayed, setInorrectRoundsPlayed] = useState(0);
  const [startTime, setStartTime] = useState(null);
  const [endTime, setEndTime] = useState(null);
  const currentDate = moment().format("YYYY-MM-DD");
  const [avgTime, setAvgTime] = useState(null);

  useEffect(() => {
    // Randomly select three unique images from the object
    const imageIds = Object.keys(images);
    const selectedImageIds = [];
    while (selectedImageIds.length < 3) {
      const randomImageId =
        imageIds[Math.floor(Math.random() * imageIds.length)];
      if (!selectedImageIds.includes(randomImageId)) {
        selectedImageIds.push(randomImageId);
      }
    }

    // Duplicate the selected images to create nine small rectangle images
    const smallRectangleImages = [];
    for (let i = 0; i < 3; i++) {
      smallRectangleImages.push(images[selectedImageIds[i]]);
      smallRectangleImages.push(images[selectedImageIds[i]]);
      smallRectangleImages.push(images[selectedImageIds[i]]);
    }

    // Shuffle the small rectangle images
    for (let i = smallRectangleImages.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [smallRectangleImages[i], smallRectangleImages[j]] = [
        smallRectangleImages[j],
        smallRectangleImages[i],
      ];
    }

    setSmallRectangleImages(smallRectangleImages);

    // Randomly select an image for the big rectangle
    const randomBigRectangleImageId =
      selectedImageIds[Math.floor(Math.random() * selectedImageIds.length)];
    setBigRectangleImage(images[randomBigRectangleImageId]);
  }, [retryCount]);

  useEffect(() => {
    if (roundsPlayed === 1) {
      const currentTime = getTime();
      setStartTime(currentTime);
    }

    if (roundsPlayed > 5 && startTime !== null) {
      const currentTime = getTime();
      setEndTime(currentTime);
    }
  }, [roundsPlayed, startTime, endTime]);

  // ...

  useEffect(() => {
    if (roundsPlayed > 5 && startTime !== null && endTime !== null) {
      console.log("Calculating avgTime...");
      const startDateTime = moment(startTime, "HH:mm:ss");
      const endDateTime = moment(endTime, "HH:mm:ss");
      const difference = endDateTime.diff(startDateTime); // Difference in milliseconds
      const calculatedAvgTime = difference / 1000;
      setAvgTime(calculatedAvgTime);

      console.log("========= ColourObjectSelectGame ========");
      console.log("gameName :", "ColourObjectSelectGame");
      console.log("teacherNIC :", teacherData.nicNumber);
      console.log("studentID :", studentData.studentID);
      console.log("currentDate :", currentDate);
      console.log("startTime :", startTime);
      console.log("endTime   :", endTime);
      console.log("avgTime :", calculatedAvgTime);
      console.log("correctRounds   :", correctRoundsPlayed);
      console.log("incorrectRounds :", incorrectRoundsPlayed);
      console.log("=========================================");

      handleAddGameData();
      setTimeout(() => {
        navigation.navigate("GamesMenu");
      }, 2500);
    }
  }, [startTime, endTime]);

  const getTime = () => {
    const currentDate = new Date();
    const hours = currentDate.getHours().toString().padStart(2, "0");
    const minutes = currentDate.getMinutes().toString().padStart(2, "0");
    const seconds = currentDate.getSeconds().toString().padStart(2, "0");
    const formattedTime = `${hours}:${minutes}:${seconds}`;
    return formattedTime;
  };

  const handleAddGameData = async () => {
    try {
      const startDateTime = moment(startTime, "HH:mm:ss");
      const endDateTime = moment(endTime, "HH:mm:ss");
      const difference = endDateTime.diff(startDateTime); // Difference in milliseconds
      const calculatedAvgTime = difference / 1000;

      const response = await fetch(
        `http://${localIp}:5000/gamesPlayedDataAdd`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            gameName: "Colour Object Select Game",
            teacherNIC,
            studentID,
            currentDate,
            startTime,
            endTime,
            avgTime: calculatedAvgTime,
            correctRoundsPlayed,
            incorrectRoundsPlayed,
          }),
        }
      );

      const data = await response.json();

      if (data.success) {
        // Registration was successful
        console.log("ColourObjectSelectGame Played Info Add Successful");
      } else {
        // Registration failed, handle the failure
        console.error(
          "ColourObjectSelectGame Played Info Add failed:",
          data.message
        );
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const toggleSelection = (index) => {
    setSelectedRectangles((prevSelection) => {
      if (prevSelection.includes(index)) {
        return prevSelection.filter((item) => item !== index);
      } else {
        return [...prevSelection, index];
      }
    });
  };

  const handleNextPress = () => {
    if (roundsPlayed <= 5) {
      if (selectedRectangles.length === 3) {
        const selectedImages = selectedRectangles.map(
          (index) => smallRectangleImages[index]
        );
        const isMatched = selectedImages.every(
          (image) => image === bigRectangleImage
        );

        if (isMatched) {
          setSuccessPopupVisible(true);
          setCorrectRoundsPlayed(correctRoundsPlayed + 1);
        } else {
          setFailurePopupVisible(true);
          setInorrectRoundsPlayed(incorrectRoundsPlayed + 1);
        }

        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 500,
          easing: Easing.linear,
          useNativeDriver: true,
        }).start();

        // Automatically close popups after 2 seconds
        setTimeout(() => {
          setSuccessPopupVisible(false);
          setFailurePopupVisible(false);
          Animated.timing(fadeAnim, {
            toValue: 0,
            duration: 500,
            easing: Easing.linear,
            useNativeDriver: true,
          }).start();
          setRetryCount(retryCount + 1);
          setSelectedRectangles([]);
          setRoundsPlayed(roundsPlayed + 1); // Increment roundsPlayed after each round
          getTime(); // Move getTime here to record time for each round
        }, 2000);
      } else {
        setInorrectRoundsPlayed(incorrectRoundsPlayed + 1);

        setFailurePopupVisible(true);
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 500,
          easing: Easing.linear,
          useNativeDriver: true,
        }).start();

        // Automatically close failure popup after 2 seconds
        setTimeout(() => {
          setFailurePopupVisible(false);
          Animated.timing(fadeAnim, {
            toValue: 0,
            duration: 500,
            easing: Easing.linear,
            useNativeDriver: true,
          }).start();
          setRetryCount(retryCount + 1);
          setSelectedRectangles([]);
          setRoundsPlayed(roundsPlayed + 1);
          // Increment roundsPlayed after each round
        }, 2000);
      }
    } else if (roundsPlayed === 6) {
      // Set endTime after completing the 5th round
      const currentTime = getTime();
      setEndTime(currentTime);
    }
  };

  return (
    <ImageBackground
      source={require("../../../assets/BG_01.png")}
      style={styles.imageBackground}
      resizeMode="cover"
    >
      <View>
        <View>
          <Text style={styles.gameName}>Object Select Game</Text>
        </View>
        <View
          style={[
            styles.bigRectangle,
            { opacity: successPopupVisible || failurePopupVisible ? 0.3 : 1 },
          ]}
        >
          <View style={{ marginVertical: 20 }}>
            {retryCount < 5 && <Text>Round {retryCount + 1}</Text>}
          </View>
          {bigRectangleImage && (
            <Image
              source={bigRectangleImage}
              style={styles.bigRectangleImage}
            />
          )}
        </View>

        <View style={{ marginTop: 170 }}>
          {[0, 1, 2].map((row) => (
            <View
              key={row}
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                marginHorizontal: 30,
                marginTop: 10,
              }}
            >
              {[0, 1, 2].map((col) => {
                const index = row * 3 + col;
                const isSelected = selectedRectangles.includes(index);
                const smallRectangleImage = smallRectangleImages[index];
                const isDisabled = roundsPlayed === 6; // Check if roundsPlayed is greater than or equal to 10

                return (
                  <TouchableOpacity
                    key={col}
                    style={[
                      styles.smallRectangle,
                      {
                        backgroundColor: isSelected
                          ? "rgba(0, 255, 0, 0.3)"
                          : "rgba(183, 183, 183, 0.2)", // Set background color opacity
                      },
                      {
                        opacity:
                          successPopupVisible ||
                          failurePopupVisible ||
                          isDisabled
                            ? 0.3
                            : 1,
                      },
                    ]}
                    onPress={() => {
                      if (!isDisabled) {
                        toggleSelection(index);
                      }
                    }}
                    disabled={isDisabled} // Disable TouchableOpacity if roundsPlayed is 10 or more
                  >
                    {isSelected && (
                      <Image
                        source={require("../../../assets/green_OK.png")}
                        style={styles.okImage}
                      />
                    )}
                    {smallRectangleImage && (
                      <Image
                        source={smallRectangleImage}
                        style={styles.smallRectangleImage}
                      />
                    )}
                  </TouchableOpacity>
                );
              })}
            </View>
          ))}
        </View>

        <TouchableOpacity
          style={[
            styles.loginButton,
            { backgroundColor: roundsPlayed === 6 ? "#FF5822" : "#7C7AF9" },
          ]}
          onPress={handleNextPress}
        >
          <Text style={styles.buttonText}>
            {roundsPlayed === 6 ? "Finished" : "Next"}
          </Text>
        </TouchableOpacity>
      </View>
      {successPopupVisible && (
        <Animated.View
          style={[
            styles.popupContainer,
            {
              opacity: fadeAnim,
            },
          ]}
        >
          <Image
            source={require("../../../assets/very-good.png")}
            style={styles.popupImage}
          />
        </Animated.View>
      )}

      {failurePopupVisible && (
        <Animated.View
          style={[
            styles.popupContainer,
            {
              opacity: fadeAnim,
            },
          ]}
        >
          <Image
            source={require("../../../assets/try-again.png")}
            style={styles.popupImage}
          />
        </Animated.View>
      )}
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
    fontSize: 18,
    color: "#ffff",
    fontWeight: "600",
  },
  bigRectangle: {
    backgroundColor: "#B7B7B7",
    width: "30%",
    height: 160,
    alignSelf: "center",
    borderRadius: 10,
    opacity: 1,
    backgroundColor: "#ffffff",
    top: 150,
    justifyContent: "center",
    alignItems: "center",
  },
  bigRectangleImage: {
    width: 150,
    height: 150,
    opacity: 1,
  },
  smallRectangle: {
    width: 90,
    height: 100,
    borderRadius: 10,
    alignSelf: "center",
    justifyContent: "center", // Center content vertically
    alignItems: "center", // Center content horizontally
  },
  smallRectangleImage: {
    width: 80,
    height: 80,
  },
  okImage: {
    width: 40,
    height: 40,
    position: "absolute",
    bottom: 0,
    right: 0,
  },
  loginButton: {
    backgroundColor: "#7C7AF9",
    paddingVertical: 15,
    paddingHorizontal: 50,
    borderRadius: 25,
    marginTop: 50,
    alignItems: "center", // Center the button horizontally
    alignSelf: "center", // Center the button horizontally in the parent container
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    textAlign: "center",
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

export default ColourObjectSelectGame;

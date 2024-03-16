import React, { useState, useRef, useEffect } from "react";
import {
  Image,
  ImageBackground,
  StyleSheet,
  Text,
  View,
  PanResponder,
  TouchableOpacity,
  Animated,
  Easing,
} from "react-native";
import teacherData from "../../../../teacherData";
import studentData from "../../../../studentData";
import config from "../../../../ipAddress";
import moment from "moment/moment";

const images = {
  image1: require("../../../assets/S2.png"),
  image2: require("../../../assets/S1.png"),
  image3: require("../../../assets/S3.png"),
  image4: require("../../../assets/S4.png"),
};

const holes = {
  hole1: require("../../../assets/S2.png"),
  hole2: require("../../../assets/S1.png"),
  hole3: require("../../../assets/S3.png"),
  hole4: require("../../../assets/S4.png"),
};

const SNAP_THRESHOLD = 30;

const ColourShapesDragGame_5 = ({ navigation, route }) => {
  const localIp = config.localIp;
  const studentID = studentData.studentID;
  const teacherNIC = teacherData.nicNumber;


  const panResponders = useRef({});
  const [draggedImageKey, setDraggedImageKey] = useState(null);
  const [imageOrder, setImageOrder] = useState(Object.keys(images));
  const [successPopupVisible, setSuccessPopupVisible] = useState(false);
  const [failurePopupVisible, setFailurePopupVisible] = useState(false);
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const currentDate = moment().format("YYYY-MM-DD");
  const { startTime, correctRounds, incorrectRounds } = route.params;
  const [endTime, setEndTime] = useState(null);
  //const [timeDifference, setTimeDifference] = useState(null);
  const [avgTime, setAvgTime] = useState(null);
  const [correctRoundsPlayed, setCorrectRoundsPlayed] = useState(correctRounds);
  const [incorrectRoundsPlayed, setIncorrectRoundsPlayed] = useState(incorrectRounds);
  const [pressedNextButton, setPressedNextButton] = useState(false);
  const [imagePositions, setImagePositions] = useState({
    image1: { x: 0, y: 0 },
    image2: { x: 0, y: 0 },
    image3: { x: 0, y: 0 },
    image4: { x: 0, y: 0 },
  });

  const holePositions = {
    image1: { x: 68, y: 165 },
    image2: { x: 111, y: 165 },
    image3: { x: -111, y: 255 },
    image4: { x: -70, y: 255 },
  };

  const resetGame = () => {
    setImagePositions({
      image1: { x: 0, y: 0 },
      image2: { x: 0, y: 0 },
      image3: { x: 0, y: 0 },
      image4: { x: 0, y: 0 },
    });
  };

  useEffect(() => {
    if (pressedNextButton) {
      if (
        endTime !== null &&
        (correctRoundsPlayed !== 0 || incorrectRoundsPlayed !== 0)
      ) {
        console.log("========== ColourShapesDragGame =========");
        console.log("gameName :", "Colour Shapes Drag Game");
        console.log("teacherNIC :", teacherData.nicNumber);
        console.log("studentID :", studentData.studentID);
        console.log("currentDate :", currentDate);
        console.log("startTime :", startTime);
        console.log("endTime   :", endTime);
        console.log("avgTime :", avgTime);
        console.log("correctRounds   :", correctRoundsPlayed);
        console.log("incorrectRounds :", incorrectRoundsPlayed);
        //console.log('avgTime :', avgTime);
        console.log("=========================================");

        handleAddGameData();

        setTimeout(() => {
          // When navigating to ColourShapesDragGame_2, pass the startTime parameter
          navigation.navigate("GamesMenu");
        }, 2000);
      }
    }
  }, [pressedNextButton, correctRoundsPlayed, incorrectRoundsPlayed, endTime]);

  const handleAddGameData = async () => {
    try {
      const response = await fetch(
        `http://${localIp}:5000/gamesPlayedDataAdd`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            gameName: "Colour Shapes Drag Game",
            teacherNIC,
            studentID,
            currentDate,
            startTime,
            endTime,
            avgTime,
            correctRoundsPlayed,
            incorrectRoundsPlayed,
          }),
        }
      );

      const data = await response.json();

      if (data.success) {
        // Registration was successful
        console.log("ColourShapesDragGame Played Info Add Successful");
      } else {
        // Registration failed, handle the failure
        console.error(
          "ColourShapesDragGame Played Info Add failed:",
          data.message
        );
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const getTime = () => {
    const currentDate = new Date();
    const hours = currentDate.getHours().toString().padStart(2, "0");
    const minutes = currentDate.getMinutes().toString().padStart(2, "0");
    const seconds = currentDate.getSeconds().toString().padStart(2, "0");
    const formattedTime = `${hours}:${minutes}:${seconds}`;
    setEndTime(formattedTime);

    // Calculate time difference
    const startDateTime = moment(startTime, "HH:mm:ss");
    const endDateTime = moment(formattedTime, "HH:mm:ss");
    const difference = endDateTime.diff(startDateTime); // Difference in milliseconds
    setAvgTime(difference / 1000);
  };

  const onPanResponderRelease = (event, gestureState) => {
    if (draggedImageKey) {
      const imageIndex = imageOrder.indexOf(draggedImageKey);
      const correctHolePosition = holePositions[`image${imageIndex + 1}`];
      const draggedPosition = imagePositions[draggedImageKey];
      const distance = Math.sqrt(
        Math.pow(draggedPosition.x - correctHolePosition.x, 2) +
          Math.pow(draggedPosition.y - correctHolePosition.y, 2)
      );

      if (distance < SNAP_THRESHOLD) {
        setImagePositions((prevPositions) => ({
          ...prevPositions,
          [draggedImageKey]: correctHolePosition,
        }));
      } else {
        setImagePositions((prevPositions) => ({
          ...prevPositions,
          [draggedImageKey]: { x: 0, y: 0 },
        }));
      }

      setDraggedImageKey(null);
    }
  };

  Object.keys(images).forEach((imageKey) => {
    panResponders.current[imageKey] = PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderGrant: () => {
        setDraggedImageKey(imageKey);
      },
      onPanResponderMove: (event, gestureState) => {
        if (draggedImageKey) {
          const { dx, dy } = gestureState;
          const newPosition = {
            x: imagePositions[draggedImageKey].x + dx,
            y: imagePositions[draggedImageKey].y + dy,
          };
          setImagePositions((prevPositions) => ({
            ...prevPositions,
            [draggedImageKey]: newPosition,
          }));
        }
      },
      onPanResponderRelease: onPanResponderRelease,
    });
  });

  const checkImagesPlacement = () => {
    const correctPositions = Object.keys(imagePositions).every((imageKey) => {
      const draggedPosition = imagePositions[imageKey];
      const holePosition = holePositions[imageKey];
      const distance = Math.sqrt(
        Math.pow(draggedPosition.x - holePosition.x, 2) +
          Math.pow(draggedPosition.y - holePosition.y, 2)
      );
      return distance < SNAP_THRESHOLD;
    });

    return correctPositions;
  };

  const handleNextRound = () => {
    const areImagesPlacedCorrectly = checkImagesPlacement();
    setPressedNextButton(true);

    if (areImagesPlacedCorrectly) {
      setSuccessPopupVisible(true);
      setCorrectRoundsPlayed(correctRounds + 1);
    } else {
      setFailurePopupVisible(true);
      setIncorrectRoundsPlayed(incorrectRounds + 1);
    }
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 500,
      easing: Easing.linear,
      useNativeDriver: true,
    }).start();

    setTimeout(() => {
      setSuccessPopupVisible(false);
      setFailurePopupVisible(false);
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 500,
        easing: Easing.linear,
        useNativeDriver: true,
      }).start();
    }, 2000);

    resetGame();
    getTime();
  };

  return (
    <ImageBackground
      source={require("../../../assets/BG_01.png")}
      style={[styles.imageBackground]}
      resizeMode="cover"
    >
      <View>
        <Text style={styles.gameName}>Shapes Select Game</Text>
      </View>

      <View
        style={{
          opacity: successPopupVisible || failurePopupVisible ? 0.3 : 1,
        }}
      >
        <View style={styles.bigRectangle}>
          {imageOrder.map((imageKey, index) => (
            <View
              key={imageKey}
              {...panResponders.current[imageKey].panHandlers}
              style={{
                left: imagePositions[imageKey].x,
                top: imagePositions[imageKey].y,
                zIndex: 2,
              }}
            >
              <Image source={images[imageKey]} style={styles.image} />
            </View>
          ))}
        </View>

        <View style={[styles.holeArea]}>
          {Object.keys(holes).map((holeKey, index) => (
            <Image
              key={holeKey}
              source={holes[holeKey]}
              style={[styles.image, { tintColor: "#ffffff" }]}
            />
          ))}
        </View>
      </View>

      <TouchableOpacity
        style={[styles.loginButton]}
        onPress={() => {
          handleNextRound();
        }}
      >
        <Text style={styles.buttonText}>Next</Text>
      </TouchableOpacity>

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
    flexDirection: "row",
    alignSelf: "center",
    top: 200,
    justifyContent: "space-around",
    alignItems: "center",
    position: "absolute",
  },
  holeArea: {
    backgroundColor: "#E5E5E5",
    position: "absolute",
    flexWrap: "wrap",
    flexDirection: "row",
    justifyContent: "space-around",
    borderRadius: 10,
    padding: 5,
    top: 300,
    zIndex: 1,
    margin: 60,
  },
  image: {
    width: 90,
    height: 90,
  },
  loginButton: {
    backgroundColor: "#7C7AF9",
    paddingVertical: 15,
    paddingHorizontal: 50,
    borderRadius: 25,
    marginTop: 600,
    alignItems: "center",
    alignSelf: "center",
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
    width: 300,
    height: 300,
  },
});

export default ColourShapesDragGame_5;

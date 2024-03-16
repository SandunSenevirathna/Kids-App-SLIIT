import React, { useState, useRef, useEffect } from "react";
import { ImageBackground, StyleSheet, Text, View } from "react-native";
import RoundedButtonAnimation from "../../components/RoundedButtonAnimation";
import { Audio } from "expo-av";

// Import all audio files statically
import audioApooruNuwana from "../../../assets/mp3/ApooruNuwana.mp3";
import audioNapuruAliya from "../../../assets/mp3/NapuruAliya.mp3";
import audioNidigathKumariya from "../../../assets/mp3/NidigathKumariya.mp3";
import audioPanaYaama from "../../../assets/mp3/PanaYaama.mp3";
import audioSundaraKumariya from "../../../assets/mp3/SundaraKumariyasahaMunAtaya.mp3";


const StoryLoad = ({ navigation, route }) => {

 
  const { story } = route.params;
  const [fileName, setFileName] = useState("");

  const [isPlaying, setIsPlaying] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [soundObject, setSoundObject] = useState(null);
  const [audioUri, setAudioUri] = useState(null);

  useEffect(() => {
    const loadAudio = async () => {
      const audioFile = `${story}.mp3`;
      let selectedAudio;

      // Select the appropriate audio file based on the story
      switch (story) {
        case "ApooruNuwana":
          selectedAudio = audioApooruNuwana;
          break;
        case "NapuruAliya":
          selectedAudio = audioNapuruAliya;
          break;
        case "NidigathKumariya":
          selectedAudio = audioNidigathKumariya;
          break;
        case "PanaYaama":
          selectedAudio = audioPanaYaama;
          break;
        case "SundaraKumariyasahaMunAtaya":
          selectedAudio = audioSundaraKumariya;
          break;
        default:
          // Handle default case
          break;
      }

      const soundObject = new Audio.Sound();
      try {
        await soundObject.loadAsync(selectedAudio); // Load the selected audio file
        setFileName(audioFile); // Set the file name in state
        setSoundObject(soundObject); // Set the sound object in state
      } catch (error) {
        console.error("Error loading audio file:", error);
      }
    };

    loadAudio(); // Call the loadAudio function when the component mounts

    // Cleanup function to stop the audio when navigating away from the page
    return () => {
      if (soundObject) {
        soundObject.stopAsync(); // Stop the audio
        soundObject.unloadAsync(); // Unload the audio
      }
    };
  }, [story]);
  
  const handlePlayButtonPress = async () => {
    try {
      if (soundObject) {
        await soundObject.playAsync(); // Play the audio
        setIsPlaying(true); // Update the state to indicate that audio is playing
        setIsPaused(false); // Reset the paused state
      }
    } catch (error) {
      console.error("Error playing audio:", error);
    }
  };

  const handlePauseButtonPress = async () => {
    if (soundObject) {
      try {
        await soundObject.pauseAsync(); // Pause the audio
      } catch (error) {
        console.error("Error pausing audio:", error);
      }
    }
  };

  const handleNextButtonPress = () => {
    if (soundObject) {
      soundObject.stopAsync(); // Stop the audio
    }
    setTimeout(() => {
      console.log(story)
      navigation.navigate("StoryQuaction", { audioFileName: story });
    }, 1000);
  };
  

  return (
    <ImageBackground
      source={require("../../../assets/BG_01.png")}
      style={[styles.imageBackground]}
      resizeMode="cover"
    >
      <View>
        <View>
          <Text style={styles.gameName}>{story}</Text>
        </View>

        <View style={{ marginTop: 200, alignItems: "center" }}>
          <View style={{ flexDirection: "row" }}>
            <View style={styles.buttonStyles}>
              <RoundedButtonAnimation
                buttonwidth={150}
                buttonheight={150}
                onPress={handlePlayButtonPress} // Pass the uri as an argument here
                imageSource={require("../../../assets/play.png")}
                backgroundColor={"transparent"}
                imageTintColor={isPlaying ? "#7C7AF9" : "gray"}
                disabled={isPlaying}
              />
            </View>

            <View style={styles.buttonStyles}>
              <RoundedButtonAnimation
                buttonwidth={150}
                buttonheight={150}
                onPress={handlePauseButtonPress}
                imageSource={require("../../../assets/pause.png")}
                backgroundColor={"transparent"}
                imageTintColor={isPaused ? "#7C7AF9" : "gray"}
                disabled={!isPlaying || isPaused}
              />
            </View>
          </View>

          <Text style={{ marginTop: 10, color: "#CFCFCF" }}>
            File Name: {fileName}
          </Text>

          <View style={{ marginTop: 80 }}></View>
          <RoundedButtonAnimation title={"Questions"} onPress={handleNextButtonPress} />
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
    color: "#ffff",
    fontWeight: "600",
  },
});

export default StoryLoad;

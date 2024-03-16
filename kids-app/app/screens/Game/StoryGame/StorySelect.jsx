import React, { useCallback } from "react";
import { ImageBackground, StyleSheet, Text, View } from "react-native";
import RoundedButton from "../../components/RoundedButtonAnimation";

const StorySelect = ({ navigation }) => 
{
    const handleStoryButtonPress = useCallback(
        (story) => {
          const formattedTitle = story.replace(/\s/g, ''); // Remove spaces from the title
          navigation.navigate("StoryLoad", { story: formattedTitle });
        },
        [navigation]
      );

  const stories = [
    "Apooru Nuwana",
    "Napuru Aliya",
    "Nidigath Kumariya",
    "Pana Yaama",
    "Sundara Kumariya saha MunAtaya",
  ];
  return (
    <ImageBackground
      source={require("../../../assets/BG_01.png")}
      style={[styles.imageBackground]}
      resizeMode="cover"
    >
      <View>
        <View>
          <Text style={styles.gameName}>Listing and Answer Game</Text>
        </View>
        <View
          style={{ justifyContent: "center", alignItems: "center", top: 200 }}
        >
          <View style={styles.buttonContainer}>
          {stories.map((story, index) => (
            <View key={index} style={styles.buttonWrapper}>
              <RoundedButton
                title={story}
                onPress={() => handleStoryButtonPress(story)}
                buttonheight={80}
                buttonwidth={300}
                borderRadius={10}
              />
            </View>
          ))}
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
    color: "#ffff",
    fontWeight: "600",
  },
  buttonContainer: {
    alignItems: "center",
  },
  buttonWrapper: {
    marginVertical: 10,
  },
});

export default StorySelect;

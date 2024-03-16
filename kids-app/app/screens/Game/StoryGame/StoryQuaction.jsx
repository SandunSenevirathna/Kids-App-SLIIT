import React, { useState, useEffect } from "react";
import { View, Text, Button, StyleSheet, ScrollView } from "react-native";
import { RadioButton } from "react-native-paper";
import RoundedButton from "../../components/RoundedButtonAnimation";
import {
  ApooruNuwana,
  NapuruAliya,
  NidigathKumariya,
  PanaYaama,
  SundaraKumariyasahaMunAtaya,
} from "./Quaction";
import studentData from "../../../../studentData";
import teacherData from "../../../../teacherData";
import config from "../../../../ipAddress";
import moment from "moment/moment";

const StoryQuaction = ({ navigation, route }) => {
  const localIp = config.localIp;
  const studentID = studentData.studentID;
  const teacherNIC = teacherData.nicNumber;

  const { audioFileName } = route.params;

  const getQuestionsByAudioFileName = (audioFileName) => {
    switch (audioFileName) {
      case "ApooruNuwana":
        return ApooruNuwana;
      case "NapuruAliya":
        return NapuruAliya;
      case "NidigathKumariya":
        return NidigathKumariya;
      case "PanaYaama":
        return PanaYaama;
      case "SundaraKumariyasahaMunAtaya":
        return SundaraKumariyasahaMunAtaya;
      default:
        return [];
    }
  };

  const questions = getQuestionsByAudioFileName(audioFileName);
  const [selectedAnswers, setSelectedAnswers] = useState(
    Array(questions.length).fill(null)
  );
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [totalMarks, setTotalMarks] = useState(0);
  const [correctRounds, setCorrectRounds] = useState(0);
  const [incorrectRounds, setIncorrectRounds] = useState(0);
  const [buttonPressed, setButtonPressed] = useState(false);
  const [startTime, setStartTime] = useState(null);
  const [endTime, setEndTime] = useState(null);
  const [avgTime, setAvgTime] = useState(null);

  useEffect(() => {
    // Reset correct and incorrect rounds when component is mounted
    setCorrectRounds(0);
    setIncorrectRounds(0);

    // Capture the start time when the component mounts
    const currentTime = moment().format("HH:mm:ss");
    setStartTime(currentTime);

    console.log("--------start---------");
    console.log("Start Time:", currentTime);
    console.log("Correct Rounds:", correctRounds);
    console.log("Incorrect Rounds:", incorrectRounds);
    console.log("-----------------------");
  }, []);

  useEffect(() => {
    if (currentQuestionIndex === questions.length - 1) {
      // Capture the end time when the game ends
      const currentTime = moment().format("HH:mm:ss");
      setEndTime(currentTime);
      let AVG = 0;

      if (startTime && endTime) {
        const startDateTime = moment(startTime, "HH:mm:ss");
        const endDateTime = moment(endTime, "HH:mm:ss");
        const difference = endDateTime.diff(startDateTime); // Difference in milliseconds
        AVG = difference / 1000;

        console.log("--------End----------");
        console.log("Start Time:", startTime);
        console.log("End Time:", currentTime);
        console.log("Correct Rounds:", correctRounds);
        console.log("Incorrect Rounds:", incorrectRounds);
        console.log(
          "Difference between Start Time and End Time:",
          difference / 1000
        );
      }

      addGameData(AVG, correctRounds, incorrectRounds);
      navigation.navigate("StorySelect");
    }
  }, [endTime]);

  // Reset the buttonPressed flag when moving to the next question
  useEffect(() => {
    setButtonPressed(false);
  }, [currentQuestionIndex]);

  const addGameData = async (
    AVG,
    correctRoundsPlayed,
    incorrectRoundsPlayed
  ) => {
    try {
      const avgTime = AVG;
      const currentDate = moment().format("YYYY-MM-DD");

      const response = await fetch(
        `http://${localIp}:5000/gamesPlayedDataAdd`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            gameName: "Story Quaction Game",
            teacherNIC,
            studentID,
            currentDate,
            startTime,
            endTime,
            avgTime,
            correctRoundsPlayed: correctRoundsPlayed, // Use correctRoundsPlayed
            incorrectRoundsPlayed: incorrectRoundsPlayed,
          }),
        }
      );

      const data = await response.json();

      if (data.success) {
        // Registration was successful
        console.log("StoryQuactionGame Played Info Add Successful");
      } else {
        // Registration failed, handle the failure
        console.error(
          "StoryQuactionGame Played Info Add failed:",
          data.message
        );
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleNextButtonPress = () => {
    if (buttonPressed) {
      return; // If the button has already been pressed, do nothing
    }
    // Set the flag to true to indicate that the button has been pressed
    setButtonPressed(true);

    // Update the selected answers
    const updatedSelectedAnswers = [...selectedAnswers];
    updatedSelectedAnswers[currentQuestionIndex] =
      selectedAnswers[currentQuestionIndex];
    setSelectedAnswers(updatedSelectedAnswers);

    // Check if the current answer is correct or incorrect
    const question = questions[currentQuestionIndex];
    if (
      question.correctAnswerIndex ===
      parseInt(selectedAnswers[currentQuestionIndex])
    ) {
      setCorrectRounds((prevCorrectRounds) => {
        // console.log("Correct Rounds:", prevCorrectRounds + 1);
        return prevCorrectRounds + 1;
      });
    } else {
      setIncorrectRounds((prevIncorrectRounds) => {
        // console.log("Incorrect Rounds:", prevIncorrectRounds + 1);
        return prevIncorrectRounds + 1;
      });
    }

    // Move to the next question or finish the quiz
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1); // Move to the next question
    } else {
      // Calculate total marks or navigate to the next screen
      console.log("--------End----------");
      // Capture the end time when the game ends
      const currentTime = moment().format("HH:mm:ss");
      setEndTime(currentTime);

      if (startTime && endTime) {
        const totalTimeInSeconds = (endTime - startTime) / 1000;
        setAvgTime(totalTimeInSeconds / (correctRounds + incorrectRounds));
      }
      console.log("End Time:", endTime);
      console.log("Correct Rounds:", correctRounds);
      console.log("Incorrect Rounds:", incorrectRounds);
      console.log("Average Time Per Question:", avgTime);

      navigation.navigate("StorySelect");
    }
  };

  const renderQuestion = () => {
    const question = questions[currentQuestionIndex];
    return (
      <View style={styles.questionContainer}>
        <Text style={styles.questionText}>{question.question}</Text>
        <RadioButton.Group
          onValueChange={(value) => handleAnswerChange(value)}
          value={selectedAnswers[currentQuestionIndex]}
        >
          {question.options.map((option, index) => (
            <RadioButton.Item
              key={index}
              label={option}
              value={index.toString()}
              color="#7C7AF9"
            />
          ))}
        </RadioButton.Group>
      </View>
    );
  };

  const handleAnswerChange = (value) => {
    const updatedSelectedAnswers = [...selectedAnswers];
    updatedSelectedAnswers[currentQuestionIndex] = value;
    setSelectedAnswers(updatedSelectedAnswers);
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.gameName}>Story Quaction Game</Text>
      {renderQuestion()}
      <RoundedButton title="Next" onPress={handleNextButtonPress} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 20,
  },
  gameName: {
    fontSize: 20,
    fontWeight: "600",
    marginBottom: 20,
  },
  questionContainer: {
    marginBottom: 20,
    width: "80%",
  },
  questionText: {
    fontSize: 16,
    fontWeight: "500",
    marginBottom: 10,
  },
});

export default StoryQuaction;

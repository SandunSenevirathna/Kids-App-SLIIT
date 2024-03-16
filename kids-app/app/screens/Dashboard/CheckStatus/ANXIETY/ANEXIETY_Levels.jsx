import React, { useState, useEffect } from "react";
import { View, Text, Button, StyleSheet, ScrollView } from "react-native";
import { RadioButton } from "react-native-paper";
import RoundedButton from "../../../components/RoundedButtonAnimation";
import { lowLevelQuestions, highLevelQuestions } from "./ANEXIETY_Questions";
import studentData from "../../../../../studentData";
import teacherData from "../../../../../teacherData";
import config from "../../../../../ipAddress";

const ANEXIETY_Levels = ({ navigation, route }) => {
  const localIp = config.localIp;
  const studentID = studentData.studentID;
  const teacherNIC = teacherData.nicNumber;

  const { predictionMessage } = route.params;
  const [questions, setQuestions] = useState(
    predictionMessage === "The student has anxiety below 50% average."
      ? lowLevelQuestions
      : highLevelQuestions
  );
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [totalMarks, setTotalMarks] = useState(0);

  const handleNextButtonPress = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      calculateTotalMarks();
    }
  };

  const renderQuestion = () => {
    const question = questions[currentQuestionIndex];
    return (
      <View style={styles.questionContainer}>
        <Text style={styles.questionText}>{question.text}</Text>
        <RadioButton.Group
          onValueChange={(value) => handleAnswerChange(question.id, value)}
          value={question.answer}
        >
          {question.options.map((option, index) => (
            <RadioButton.Item
              key={index}
              label={option}
              value={index.toString()} // Use index as value
              color="#7C7AF9"
            />
          ))}
        </RadioButton.Group>
      </View>
    );
  };

  const handleAnswerChange = (questionId, answer) => {
    const updatedQuestions = questions.map((question) =>
      question.id === questionId ? { ...question, answer } : question
    );
    setQuestions(updatedQuestions);
  };

 const calculateTotalMarks = async () => {
  let marks = 0;
  let selectedOption;
  questions.forEach((question) => {
    selectedOption = question.options[parseInt(question.answer)];
    if (selectedOption === "Rarely or never") {
      marks += 1;
    } else if (selectedOption === "Occasionally") {
      marks += 5;
    } else if (selectedOption === "Frequently") {
      marks += 10;
    }
  });
  setTotalMarks(marks);

  // Calculate percentage
  const maxMarks = questions.length * 10;
  const percentage = ((marks / maxMarks) * 100).toFixed(2);

  // Prepare data to send to backend
  const gameName = "ANXIETY";
  let statusType;
  if (predictionMessage === "The student has anxiety below 50% average.") {
    statusType = `Level 1 : ${percentage}%`;
  } else {
    statusType = `Level 2 : ${percentage}%`;
  }

  try {
    const response = await fetch(`http://${localIp}:5000/CheckStatusgamesPlayedDataAdd`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        gameName,
        teacherNIC,
        studentID,
        statusType,
      }),
    });
    const data = await response.json();
    console.log(data);
    navigation.navigate("CheckStatus");
  } catch (error) {
    console.error('Error:', error);
    // Handle error
  }
};


  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.gameName}>Check ANXIETY Questions</Text>
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

export default ANEXIETY_Levels;

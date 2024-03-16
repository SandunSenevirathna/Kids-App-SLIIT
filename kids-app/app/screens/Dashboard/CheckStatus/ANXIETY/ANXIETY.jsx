import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  ScrollView,
} from "react-native";
import { RadioButton } from "react-native-paper";
import teacherData from "../../../../../teacherData";
import studentData from "../../../../../studentData";
import config from "../../../../../ipAddress";
import RoundedButton from "../../../components/RoundedButtonAnimation";

const ANXIETY = ({ navigation }) => {
  const localIp = config.localIp;
  const studentID = studentData.studentID;
  const teacherNIC = teacherData.nicNumber;

  const [questions, setQuestions] = useState([
    {
      id: 1,
      text: "Sweating Level High or Low?",
      options: ["High", "Low"],
      answer: "",
    },
    {
      id: 2,
      text: "Social Media Addiction High or Low ",
      options: ["High", "Low"],
      answer: "",
    },
    {
      id: 3,
      text: "Increased Energy during play time high or Low ?",
      options: ["High", "Low"],
      answer: "",
    },
    {
      id: 4,
      text: "Avoids People or Activities High or Low ?",
      options: ["High", "Low"],
      answer: "",
    },
    {
      id: 5,
      text: "Trouble concentrating in activities high or low ?",
      options: ["High", "Low"],
      answer: "",
    },
    {
      id: 6,
      text: "Breathing Rapidly when engage in a small Activity ?",
      options: ["Yes", "No"],
      answer: "",
    },
    {
      id: 7,
      text: "Having close friends ?",
      options: ["Yes", "No"],
      answer: "",
    },
    {
      id: 8,
      text: "Having trouble.with.work ?",
      options: ["Yes", "No"],
      answer: "",
    },
    {
      id: 9,
      text: "Weight gainining every month ?",
      options: ["Yes", "No"],
      answer: "",
    },
    {
      id: 10,
      text: "Provide Your Age in years",
      answer: "",
    },
    {
      id: 11,
      text: "Feeling Nervous Durning the an activity?",
      options: ["Yes", "No"],
      answer: "",
    },
    {
      id: 12,
      text: "Blamming Yourselves oftenly ? ",
      options: ["Yes", "No"],
      answer: "",
    },
  ]);

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

  const handleNextButtonPress = async () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      try {
        // Save answers and log them
        const answers = questions.map((question) => {
          // Check if the answer needs to be converted to integer
          if (
            question.answer === "High" ||
            question.answer === "Yes"
          ) {
            return 1;
          } else if (
            question.answer === "Low" ||
            question.answer === "No"
          ) {
            return 0;
          } else {
            // Convert answer to integer if it's not already an integer
            return parseInt(question.answer, 10); // Parse string to integer
          }
        });

        console.log("All answers:", answers);

        // Send POST request to backend with answers array
        const response = await fetch(`http://${localIp}:5000/predict_anxiety`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ answers }), // Send answers array in the request body
        });

        const data = await response.json();

        // Extract prediction message from the response and display it
        const predictionMessage = data.prediction_message;
        console.log("Prediction Message:", predictionMessage);

        
        navigation.navigate("ANEXIETY_MideScreen", { predictionMessage });
       // navigation.goBack(); // Use correct function call to navigate back
        // Now you can use the predictionMessage variable to display the prediction result message to the user
      } catch (error) {
        console.error("Error:", error);
      }
    }
  };

  const renderQuestion = () => {
    const question = questions[currentQuestionIndex];
    return (
      <View style={styles.questionContainer}>
        <Text style={styles.questionText}>{question.text}</Text>
        {question.options ? (
          <RadioButton.Group
            onValueChange={(value) => handleAnswerChange(question.id, value)}
            value={question.answer}
          >
            {question.options.map((option, index) => (
              <RadioButton.Item
                key={index}
                label={option}
                value={option}
                color="#7C7AF9"
              />
            ))}
          </RadioButton.Group>
        ) : (
          <TextInput
            style={styles.textInput}
            placeholder="Enter your answer"
            onChangeText={(text) => handleAnswerChange(question.id, text)}
            value={question.answer}
          />
        )}
      </View>
    );
  };

  const handleAnswerChange = (questionId, answer) => {
    const updatedQuestions = questions.map((question) =>
      question.id === questionId ? { ...question, answer } : question
    );
    setQuestions(updatedQuestions);
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
  textInput: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  },
});

export default ANXIETY;

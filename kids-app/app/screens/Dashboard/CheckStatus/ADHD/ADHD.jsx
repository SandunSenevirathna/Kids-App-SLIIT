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
import moment from "moment/moment";
import RoundedButton from "../../../components/RoundedButtonAnimation";

const ADHD = ({ navigation }) => {
  const localIp = config.localIp;
  const studentID = studentData.studentID;
  const teacherNIC = teacherData.nicNumber;

  const [questions, setQuestions] = useState([
    {
      id: 1,
      text: "Is the student's ODD stage High or Low?",
      options: ["High", "Low"],
      answer: "",
    },
    {
      id: 2,
      text: "Age of the Student",
      answer: "",
    },
    {
      id: 3,
      text: "Has the child had depression before (Treated / Not treated) ?",
      options: ["High", "Low"],
      answer: "",
    },
    {
      id: 4,
      text: "Number of Bio. Parents",
      answer: "",
    },
    {
      id: 5,
      text: "Number of Siblings",
      answer: "",
    },
    {
      id: 6,
      text: "Student's Gender",
      options: ["Male", "Female"],
      answer: "",
    },
    {
      id: 7,
      text: "Poverty status is high or low ?",
      options: ["High", "Low"],
      answer: "",
    },
    {
      id: 8,
      text: "Is there any substance abuse in the Family ?",
      options: ["Yes", "No"],
      answer: "",
    },
    {
      id: 9,
      text: "Does the child show behavioural problems to animals ?",
      options: ["Yes", "No"],
      answer: "",
    },
    {
      id: 10,
      text: "Does the child show behavioural problems to unknown people (Yes or No) ?",
      options: ["Yes", "No"],
      answer: "",
    },
    {
      id: 11,
      text: "Does the child have symptoms of depression that comes and goes in a seasonal pattern ?",
      options: ["Yes", "No"],
      answer: "",
    },
    {
      id: 12,
      text: "Do you noticed if the child easily get distracted or have difficulty focusing on tasks ?",
      options: ["Yes", "No"],
      answer: "",
    },
    {
      id: 13,
      text: "Does the child show behavioural problems to known people ?",
      options: ["Yes", "No"],
      answer: "",
    },
    {
      id: 14,
      text: "Does the child have behaviors to uncooperative critically ?",
      options: ["Yes", "No"],
      answer: "",
    },
    {
      id: 15,
      text: "Does the child have behaviors to hostile toward peers, parents, teachers & other authority figures critically ?",
      options: ["Yes", "No"],
      answer: "",
    },
    {
      id: 16,
      text: "How is the child performing academically ?",
      options: ["Excellent ", "Good", "Not bad", "Bad", "Weak"],
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
        let  answers = questions.map((question) => {
          // Check if the answer needs to be converted to integer
          if (
            question.answer === "High" ||
            question.answer === "Male" ||
            question.answer === "Yes"
          ) {
            return 1;
          } else if (
            question.answer === "Low" ||
            question.answer === "Female" ||
            question.answer === "No"
          ) {
            return 0;
          } else {
            // Convert answer to integer if it's not already an integer
            return parseInt(question.answer, 10); // Parse string to integer
          }
        });

         // Remove the last 4 answers from the array
        answers = answers.slice(0, -4);
        console.log("All answers:", answers);

        // Send POST request to backend with answers array
        const response = await fetch(`http://${localIp}:5000/predict_adhd`, {
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

        navigation.navigate("ADHD_MidScreen", { predictionMessage }); // Use correct function call to navigate back
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
      <Text style={styles.gameName}>Check ADHD Questions</Text>
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

export default ADHD;

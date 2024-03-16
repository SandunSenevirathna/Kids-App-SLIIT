import {
  Image,
  KeyboardAvoidingView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import React, { useState } from "react";
import RoundedButton from "../components/RoundedButtonAnimation";
import teacherData from "../../../teacherData";
import config from "../../../ipAddress";


const ChildrenAddForm = () => {
    
  const localIp = config.localIp;
  const [studentID, setStudentID] = useState("");
  const [studentName, setStudentName] = useState("");
  const [dob, setDOB] = useState('');
  const [homeTP, setHomeTP] = useState('');
  const teacherNIC = teacherData.nicNumber;

  const handleRegister = async () => {
    try {
      // Check if any of the input fields are empty
      if (!studentID || !studentName || !dob || !homeTP) {
        console.error("Please fill in all the fields");
        return;
      } else {
        const response = await fetch(`http://${localIp}:5000/studentRegister`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({  teacherNIC, studentID, studentName, dob, homeTP}),
        });

        const data = await response.json();

        if (data.success) {
          // Registration was successful
          console.log("Student Registration successful");
          handelClear();
        } else {
          // Registration failed, handle the failure
          console.error("Registration failed:", data.message);
          handelClear();
        }
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handelClear = () => {
    setStudentID("");
    setStudentName("");
    setDOB("");
    setHomeTP("");
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
    >
      <View style={styles.inputContainer}>
        <Text style={styles.Title}>Add Children</Text>

        <TextInput
          style={styles.input}
          placeholder="Student ID"
          value={studentID}
          onChangeText={setStudentID}
        />

        <TextInput
          style={styles.input}
          placeholder="Student Name"
          value={studentName}
          onChangeText={setStudentName}
        />

        <TextInput
          style={styles.input}
          placeholder="Date of Birth"
          inputMode="decimal"
          value={dob}
          onChangeText={setDOB}
        />

        <TextInput
          style={styles.input}
          placeholder="Home TP"
          inputMode="decimal"
          value={homeTP}
          onChangeText={setHomeTP}
        />

        <View style={styles.buttonContainer}>
          <RoundedButton
            backgroundColor={"#4B4B54"}
            buttonwidth={100}
            buttonheight={50}
            borderRadius={15}
            onPress={handleRegister}
            title={"Add"}
          />
        </View>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
  },
  Title: {
    fontSize: 18,
    color: "#252525",
    fontWeight: "600",
    textAlign: "center",
    marginBottom: 20,
  },
  inputContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  input: {
    width: "80%",
    height: 50,
    borderColor: "#C3C3C6",
    borderWidth: 1,
    borderRadius: 25,
    paddingHorizontal: 20,
    marginBottom: 15,
    fontSize: 18,
  },
  buttonContainer: {
    marginTop: 20,
    alignSelf: "center",
  },
});

export default ChildrenAddForm;

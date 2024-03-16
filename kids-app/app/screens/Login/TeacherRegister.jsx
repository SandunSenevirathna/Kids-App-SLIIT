import {
  KeyboardAvoidingView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import React, { useState } from "react";
import RoundedButton from "../components/RoundedButtonAnimation";
import config from "../../../ipAddress";

const TeacherRegister = () => {
  const localIp = config.localIp;
  const [nicNumber, setNicNumber] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = async () => {
    try {
      // Check if any of the input fields are empty
      if (!nicNumber || !name || !email || !password) {
        console.error("Please fill in all the fields");
        return;
      } else {
        const response = await fetch(`http://${localIp}:5000/register`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ nicNumber, name, email, password }),
        });

        const data = await response.json();

        if (data.success) {
          // Registration was successful
          console.log("Registration successful");
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
    setNicNumber("");
    setName("");
    setEmail("");
    setPassword("");
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
    >
      <View style={styles.inputContainer}>
        <Text style={styles.Title}>Teacher Register</Text>

        <TextInput
          style={styles.input}
          placeholder="NIC Number"
          value={nicNumber}
          onChangeText={setNicNumber}
        />
        <TextInput
          style={styles.input}
          placeholder="Teacher Name"
          value={name}
          onChangeText={setName}
        />
        <TextInput
          style={styles.input}
          placeholder="Email"
          value={email}
          inputMode="email"
          onChangeText={setEmail}
        />
        <TextInput
          style={styles.input}
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry={true}
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
    height: 100,
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

export default TeacherRegister;

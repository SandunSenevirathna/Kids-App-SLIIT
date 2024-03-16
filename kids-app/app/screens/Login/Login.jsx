import React, { useState } from "react";
import {
  Image,
  ImageBackground,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  KeyboardAvoidingView,
  Platform,
  Dimensions,
} from "react-native";
import config from "../../../ipAddress";
import teacherData from "../../../teacherData";

function Login({ navigation }) {
  const localIp = config.localIp;
  const [nicNumber, setNicNumber] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    try {
      const response = await fetch(`http://${localIp}:5000/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ nicNumber, password }),
      });

      if (response.ok) {
        const data = await response.json();

        if (data.success) {
          // Login successful, handle navigation or other logic here
          console.log("Login successful");
          handelClear();

          // Update teacherData with received data
          teacherData.name = data.message.name;
          teacherData.nicNumber = data.message.nicNumber;

          navigation.navigate("MainMenu");
        } else {
          // Handle login failure
          console.error("Login failed:", data.message);
          handelClear();
        }
      } else {
        // Handle server error
        console.error("Server error:", response.statusText);
        const errorMessage = await response.text(); // Log the error message from the server
        console.error("Server response:", errorMessage);
      }
    } catch (error) {
      console.error("An error occurred", error);
    }
  };

  const handleForgotPasswordPress = () => {
    // Handle forgot password logic here
  };

  const handelClear = () => {
    setNicNumber("");
    setPassword("");
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
    >
      <ImageBackground
        source={require("../../assets/LG_01.png")}
        style={styles.imageBackground}
        resizeMode="cover"
      >
        <View style={styles.logo}>
          <Image
            source={require("../../assets/LG_02.png")}
            style={{ width: 200, height: 200 }}
          />
        </View>

        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Enter NIC"
            value={nicNumber}
            autoCapitalize="none"
            onChangeText={setNicNumber}
          />

          <TextInput
            style={styles.input}
            placeholder="Enter Password"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
          />

          <TouchableOpacity onPress={handleForgotPasswordPress}>
            <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
          <Text style={styles.buttonText}>LOGIN</Text>
        </TouchableOpacity>
      </ImageBackground>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
  },
  imageBackground: {
    position: "absolute",
    left: 0,
    top: 0,
    bottom: 0,
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
  },
  logo: {
    position: "absolute",
    top: 40,
    alignSelf: "center",
  },
  inputContainer: {
    alignItems: "center",
    marginVertical: 250,
    justifyContent: "center",
  },
  input: {
    width: "80%",
    height: 50,
    backgroundColor: "#fff",
    borderRadius: 25,
    paddingHorizontal: 20,
    marginBottom: 15,
    fontSize: 18,
  },
  forgotPasswordText: {
    color: "#ffff",
    fontSize: 16,
    textDecorationLine: "underline",
  },
  loginButton: {
    backgroundColor: "#7C7AF9",
    paddingVertical: 15,
    paddingHorizontal: 50,
    borderRadius: 25,
    marginBottom: 90,
    alignItems: "center", // Center the button horizontally
    alignSelf: "center", // Center the button horizontally in the parent container
  },

  buttonText: {
    color: "#fff",
    fontSize: 18,
    textAlign: "center",
  },
});

export default Login;

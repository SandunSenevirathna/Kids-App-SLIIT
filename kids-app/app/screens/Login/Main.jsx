import React, { useState, Component } from "react";
import {
  Image,
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Modal,
  Platform,
} from "react-native";
import TeacherRegister from "./TeacherRegister";


function Main({ navigation }) {
  const [isModalVisible, setModalVisible] = useState(false);

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  return (
    <ImageBackground
      source={require("../../assets/LG_00.png")}
      style={styles.imageBackground}
      resizeMode="cover"
    >
      <View style={styles.logo}>
        <Image
          source={require("../../assets/LG_02.png")}
          style={{ width: 200, height: 200 }}
        />
      </View>

      <View style={styles.loginRoundedButton}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            navigation.navigate("Login");
          }}
        >
          <Text style={styles.buttonText}>LOGIN</Text>
        </TouchableOpacity>

        <View style={{ marginVertical: 10 }} />

        <TouchableOpacity
          style={[styles.button, { backgroundColor: "#939393" }]}
          onPress={toggleModal}
        >
          <Text style={styles.buttonText}>REGISTER</Text>
        </TouchableOpacity>

        <Modal
          animationType="fade"
          transparent={true}
          visible={isModalVisible}
          onRequestClose={toggleModal}
        >
          <View style={styles.modalContainer}>
            <TeacherRegister />
          </View>
        </Modal>
      </View>

      <View style={styles.bottomText}>
        <Text>Need Help?</Text>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  imageBackground: {
    flex: 1,
    justifyContent: "flex-end",
  },
  modalContainer: {
    width: "80%", // Set the width to your desired value (in pixels)
    height: 400,
    top: 200, // Set the height to the same value to make it a square (in pixels)
    backgroundColor: "#FFFFFF", // Semi-transparent background
    borderRadius: 10, // Optional: add border radius for rounded corners
    alignSelf: "center",
    justifyContent: "center",
    ...Platform.select({
      ios: {
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
      },
      android: {
        elevation: 8,
      },
    }),
  },

  loginRoundedButton: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-end",
    marginBottom: 200,
  },
  logo: {
    position: "absolute",
    top: 50,
    alignSelf: "center",
  },
  button: {
    backgroundColor: "#1E90FF", // Default button color
    paddingVertical: 15,
    paddingHorizontal: 50,
    borderRadius: 25,
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    textAlign: "center",
  },
  bottomText: {
    justifyContent: "flex-end",
    alignItems: "center",
    marginBottom: 20,
  },
});

export default Main;

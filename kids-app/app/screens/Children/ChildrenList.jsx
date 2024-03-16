import React, { useState } from "react";  
import { useFocusEffect } from '@react-navigation/native';

import {
  Image,
  ImageBackground,
  StyleSheet,
  Text,
  View,
  ScrollView,
  Alert,
  Animated,
  TouchableWithoutFeedback,
} from "react-native";
import RoundedButton from "../components/RoundedButtonAnimation";
import config from "../../../ipAddress";
import teacherData from "../../../teacherData";
import studentData from "../../../studentData";

const ChildrenList = ({ navigation }) => {
  const localIp = config.localIp; // Get the local IP address
  const [children, setChildren] = useState([]);
  const animatedValues = children.map(() => new Animated.Value(1)); // Initialize animate

  useFocusEffect(
    React.useCallback(() => {
      const fetchChildrenData = async () => {
        try {
          const response = await fetch(
            `http://${localIp}:5000/fetchChildrenData`,
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({ teacherNIC: teacherData.nicNumber }),
            }
          );
  
          const data = await response.json();
  
          if (data.success) {
            setChildren(data.message);
          } else {
            console.error("Error fetching children data:", data.message);
          }
        } catch (error) {
          console.error("Error fetching children data:", error);
        }
      };
  
      fetchChildrenData();
    }, []) // The empty dependency array ensures this effect only runs once when the component mounts
  );
  

  const handlePress = (index) => {
    const touchedChild = children[index]; // Get the touched child data
    studentData.studentID = touchedChild.studentID;
    studentData.studentName = touchedChild.studentName;

    const newAnimatedValues = animatedValues.map((value, i) => {
      return i === index
        ? Animated.sequence([
            Animated.timing(value, {
              toValue: 0.9,
              duration: 100,
              useNativeDriver: true,
            }),
            Animated.timing(value, {
              toValue: 1,
              duration: 100,
              useNativeDriver: true,
            }),
          ])
        : Animated.timing(value, {
            toValue: 1,
            duration: 100,
            useNativeDriver: true,
          });
    });

    Animated.parallel(newAnimatedValues).start();
    console.log(studentData.studentID);
    console.log(studentData.studentName);
    navigation.navigate('Dashboard');
  };

  const renderCard = (child, index) => (
    <TouchableWithoutFeedback
      key={index}
      onLongPress={() => handleLongPress(child)}
      onPress={() => handlePress(index)}
    >
      <Animated.View
        style={[
          styles.cardView,
          { transform: [{ scale: animatedValues[index] }] },
        ]}
      >
        <Image
          source={require("../../assets/student.png")}
          style={{ margin: 20, width: 40, height: 40 }}
        />
        <View style={{ flexDirection: "column" }}>
          <Text style={{ fontWeight: "600" }}>{child.studentName}</Text>
          <Text style={{ fontWeight: "400", fontSize: 12 }}>
            {child.studentID}
          </Text>
        </View>
      </Animated.View>
    </TouchableWithoutFeedback>
  );

  const handleLongPress = (touchedChild) => {
    Alert.alert(
      `Delete ${touchedChild.studentName}?`,
      "Are you sure you want to delete this student?",
      [
        {
          text: "Cancel",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel",
        },
        { text: "Yes", onPress: () => deleteStudent(touchedChild) },
      ],
      { cancelable: false }
    );
  };

  const deleteStudent = async (touchedChild) => {
    console.log(teacherData.nicNumber,);
    console.log(touchedChild.studentID,);


    try {
      const response = await fetch(`http://${localIp}:5000/deleteStudent`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          teacherNIC: teacherData.nicNumber,
          studentID: touchedChild.studentID,
        }),
      });

      const data = await response.json();

      if (data.success) {
        // Update the state to reflect the changes
        setChildren((prevChildren) =>
          prevChildren.filter(
            (child) => child.studentID !== touchedChild.studentID
          )
        );
        console.log("Student deleted successfully:", data.message);
      } else {
        console.error("Error deleting student:", data.message);
      }
    } catch (error) {
      console.error("Error deleting student:", error);
    }
  };

  return (
    <ImageBackground
      source={require("../../assets/BG_01.png")}
      style={styles.imageBackground}
      resizeMode="cover"
    >
      <Text style={styles.Title}> Children List</Text>
      <View style={styles.container}>
        <ScrollView
          contentContainerStyle={styles.scrollViewContent}
          style={styles.scrollView}
        >
          {children.map((child, index) => renderCard(child, index))}
        </ScrollView>
      </View>
      <View style={styles.addButtonContainer}>
        <RoundedButton
          backgroundColor={"#7C7AF8"}
          buttonwidth={100}
          buttonheight={50}
          borderRadius={15}
          onPress={() => {
            navigation.navigate("ChildrenAddForm");
          }}
          title={"Add"}
        />
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  imageBackground: {
    flex: 1,
    justifyContent: "flex-start",
  },
  container: {
    flex: 1,
    marginLeft: 50,
    marginRight: 50,
    marginTop: 130,
    marginBottom: 50,
  },
  Title: {
    marginTop: 50,
    marginLeft: 10,
    fontSize: 18,
    color: "#ffff",
    fontWeight: "600",
  },
  cardView: {
    flexDirection: "row",
    backgroundColor: "#F1F3F9",
    alignSelf: "center",
    width: "100%",
    borderRadius: 20,
    marginBottom: 10,
    alignItems: "center",
    justifyContent: "flex-start",
  },
  items: {
    marginTop: 10,
    padding: 5,
    borderColor: "pink",
    fontSize: 24,
  },
  addButtonContainer: {
    alignSelf: "center",
    marginBottom: 100,
  },
});

export default ChildrenList;

// GameDataAPI.js
import config from "../../../../ipAddress";
import teacherData from "../../../../teacherData";
import studentData from "../../../../studentData";

export const fetchPlayedGameData = async (teacherNIC, studentID, selectedGame) => {
  const localIp = config.localIp; // Get the local IP address

  try {
    const response = await fetch(`http://${localIp}:5000/fetchPlayedGameData`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        teacherNIC: teacherData.nicNumber,
        studentID: studentData.studentID,
        gameName: selectedGame,
      }),
    });

    const data = await response.json();

    if (data.success) {
      return data.message;
    } else {
      console.error("Error fetching gameData data:", data.message);
      return null;
    }
  } catch (error) {
    console.error("Error fetching gameData data:", error);
    return null;
  }
};

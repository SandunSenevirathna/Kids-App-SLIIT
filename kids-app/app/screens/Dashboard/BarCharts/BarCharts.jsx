// BarCharts.jsx
import React, { useEffect, useState } from "react";
import { View, Text } from "react-native";
import { BarChart } from "react-native-chart-kit";
import { fetchPlayedGameData } from "./GameDataAPI";
import moment from "moment/moment";

// BarCharts.jsx
// ... (other imports)

const BarCharts = ({ teacherNIC, studentID, selectedGame }) => {
    const [chartData, setChartData] = useState([]);
  
    useEffect(() => {
      const fetchData = async () => {
        const data = await fetchPlayedGameData(teacherNIC, studentID, selectedGame);
  
        if (data) {
          const formattedData = data.map((entry) => ({
            currentDate: moment(entry.currentDate).format("MM-DD"),
            avgTime: entry.avgTime,
          }));
  
          // Aggregate data for the same date
          const aggregatedData = aggregateDataByDate(formattedData);
  
          // Sort the aggregated data by currentDate in ascending order
          const sortedData = aggregatedData.sort((a, b) =>
            moment(a.currentDate).diff(moment(b.currentDate))
          );
  
          // Extract the last five days' data
          const lastFiveDaysData = sortedData.slice(-5);
  
          setChartData(lastFiveDaysData);
        }
      };
  
      fetchData();
    }, [teacherNIC, studentID, selectedGame]);
  
    // Function to aggregate data by date
    const aggregateDataByDate = (data) => {
      const aggregatedData = [];
      const dateMap = new Map();
  
      data.forEach((entry) => {
        const { currentDate, avgTime } = entry;
  
        if (dateMap.has(currentDate)) {
          // If date already exists, update the sum and count
          const existingData = dateMap.get(currentDate);
          existingData.sum += avgTime;
          existingData.count += 1;
        } else {
          // If date doesn't exist, add it to the map
          dateMap.set(currentDate, { sum: avgTime, count: 1 });
        }
      });
  
      // Convert the map back to an array
      dateMap.forEach((value, key) => {
        aggregatedData.push({
          currentDate: key,
          avgTime: value.sum / value.count,
        });
      });
  
      return aggregatedData;
    };
  
    return (
      <View style={{justifyContent:'center', alignItems:'center'}}>
        <Text>{selectedGame}</Text>
        <BarChart
          data={{
            labels: chartData.map((entry) => entry.currentDate),
            datasets: [
              {
                data: chartData.map((entry) => entry.avgTime),
              },
            ],
          }}
          width={300}
          height={200}
          yAxisLabel=""
          yAxisSuffix="s"
          yAxisInterval={10}
          xAxisLabel=""
          verticalLabelRotation={0}
          chartConfig={{
            backgroundColor: "#ffffff",
            backgroundGradientFrom: "#ffffff",
            backgroundGradientTo: "#ffffff",
            decimalPlaces: 0,
            color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
            labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
            style: {
              borderRadius: 16,
            },
          }}
        />
      </View>
    );
  };
  
  export default BarCharts;
  

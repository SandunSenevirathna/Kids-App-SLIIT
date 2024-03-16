import React, { useState } from 'react';
import Main from './app/screens/Login/Main';
import Login from './app/screens/Login/Login';
import MainMenu from './app/screens/MainMenu/MainMenu';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import GamesMenu from './app/screens/MainMenu/GamesMenu';
import ColourObjectSelectGame from './app/screens/Game/ObjectSelectGame/ColourObjectSelectGame';
import ColourShapesDragGame_1 from './app/screens/Game/ColourShapesDragGame/ColourShapesDragGame_1';
import ColourShapesDragGame_2 from './app/screens/Game/ColourShapesDragGame/ColourShapesDragGame_2';
import ColourShapesDragGame_3 from './app/screens/Game/ColourShapesDragGame/ColourShapesDragGame_3';
import ColourShapesDragGame_4 from './app/screens/Game/ColourShapesDragGame/ColourShapesDragGame_4';
import ColourShapesDragGame_5 from './app/screens/Game/ColourShapesDragGame/ColourShapesDragGame_5';
import StoryLoad from './app/screens/Game/StoryGame/StoryLoad';
import StorySelect from './app/screens/Game/StoryGame/StorySelect';
import ChildrenList from './app/screens/Children/ChildrenList';
import ChildrenAddForm from './app/screens/Children/ChildrenAddForm';
import TeacherRegister from './app/screens/Login/TeacherRegister';
import StoryQuaction from './app/screens/Game/StoryGame/StoryQuaction';
import Dashboard from './app/screens/Dashboard/Dashboard';
import History from './app/screens/Dashboard/History/History';
import ColourShapesDragGameHistory from './app/screens/Dashboard/History/ColourShapesDragGameHistory';
import ColourObjectSelectGameHistory from './app/screens/Dashboard/History/ColourObjectSelectGameHistory';
import StoryQuactionGameHistory from './app/screens/Dashboard/History/StoryQuactionGameHistory';
import CheckStatus from './app/screens/Dashboard/CheckStatus/CheckStatus';
import ADHD from './app/screens/Dashboard/CheckStatus/ADHD/ADHD';
import ADHD_MidScreen from './app/screens/Dashboard/CheckStatus/ADHD/ADHD_MidScreen';
import ADHD_Levels from './app/screens/Dashboard/CheckStatus/ADHD/ADHD_Levels';
import ANXIETY from './app/screens/Dashboard/CheckStatus/ANXIETY/ANXIETY';
import ANEXIETY_MideScreen from './app/screens/Dashboard/CheckStatus/ANXIETY/ANEXIETY_MideScreen';
import ANEXIETY_Levels from './app/screens/Dashboard/CheckStatus/ANXIETY/ANEXIETY_Levels';

const Stack = createStackNavigator();

export default function App() {

  const [initialRoute, setInitialRoute] = useState('Main');

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName={initialRoute}>
          <Stack.Screen name="Main" component={Main} options={{ headerShown: false }} />
          <Stack.Screen name="Login" component={Login} options={{ headerShown: false }} />
          <Stack.Screen name="TeacherRegister" component={TeacherRegister} options={{ headerShown: false }} />
          <Stack.Screen name="MainMenu" component={MainMenu} options={{ headerShown: false }} />
          <Stack.Screen name="GamesMenu" component={GamesMenu} options={{ headerShown: false }} />
          <Stack.Screen name="ColourObjectSelectGame" component={ColourObjectSelectGame} options={{ headerShown: false }} />
          <Stack.Screen name="ColourShapesDragGame_1" component={ColourShapesDragGame_1} options={{ headerShown: false }} />
          <Stack.Screen name="ColourShapesDragGame_2" component={ColourShapesDragGame_2} options={{ headerShown: false }} />
          <Stack.Screen name="ColourShapesDragGame_3" component={ColourShapesDragGame_3} options={{ headerShown: false }} />
          <Stack.Screen name="ColourShapesDragGame_4" component={ColourShapesDragGame_4} options={{ headerShown: false }} />
          <Stack.Screen name="ColourShapesDragGame_5" component={ColourShapesDragGame_5} options={{ headerShown: false }} />
          <Stack.Screen name="StoryLoad" component={StoryLoad} options={{ headerShown: false }} />
          <Stack.Screen name="StoryQuaction" component={StoryQuaction} options={{ headerShown: false }} />
          <Stack.Screen name="ChildrenList" component={ChildrenList} options={{ headerShown: false }} />
          <Stack.Screen name="ChildrenAddForm" component={ChildrenAddForm} options={{ headerShown: false }} />
          <Stack.Screen name="Dashboard" component={Dashboard} options={{ headerShown: false }} />
          <Stack.Screen name="History" component={History} options={{ headerShown: false }} />
          <Stack.Screen name="ColourShapesDragGameHistory" component={ColourShapesDragGameHistory} options={{ headerShown: false }} />
          <Stack.Screen name="ColourObjectSelectGameHistory" component={ColourObjectSelectGameHistory} options={{ headerShown: false }} />
          <Stack.Screen name="StoryQuactionGameHistory" component={StoryQuactionGameHistory} options={{ headerShown: false }} />
          <Stack.Screen name="CheckStatus" component={CheckStatus} options={{ headerShown: false }} />
          <Stack.Screen name="ADHD" component={ADHD} options={{ headerShown: false }} />
          <Stack.Screen name="ANXIETY" component={ANXIETY} options={{ headerShown: false }} />
          <Stack.Screen name="ADHD_MidScreen" component={ADHD_MidScreen} options={{ headerShown: false }} />
          <Stack.Screen name="ADHD_Levels" component={ADHD_Levels} options={{ headerShown: false }} />
          <Stack.Screen name="ANEXIETY_MideScreen" component={ANEXIETY_MideScreen} options={{ headerShown: false }} />
          <Stack.Screen name="ANEXIETY_Levels" component={ANEXIETY_Levels} options={{ headerShown: false }} />
          <Stack.Screen name="StorySelect" component={StorySelect} options={{ headerShown: false }} />





        </Stack.Navigator>
      </NavigationContainer>
    </GestureHandlerRootView>
  );
}

import { StatusBar, StyleSheet, Text, View } from 'react-native'
import React, { useEffect } from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { NavigationContainer } from '@react-navigation/native';
import AudioPlayer from './src/screens/AudioPlayer';
import Videos from './src/screens/Videos';
import TrackPlayer from 'react-native-track-player';
import Audios from './src/screens/Audios';
import VideoPlayer from './src/screens/VideoPlayer';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import FontAwesome from 'react-native-vector-icons/dist/FontAwesome';
import { BLACK, YELLOW } from './src/assets/colors';


// export type RootStackParamList = {
//   Home: undefined;
//   Audio: { message: string };
// };
const App = () => {
  const AudioStack = createNativeStackNavigator();
  const VideoStack = createNativeStackNavigator();
  const RootStack = createNativeStackNavigator();
  const Tab = createBottomTabNavigator();


  useEffect(() => {
    initializePlayer();
  }, [])
  const initializePlayer = async () => {
    await TrackPlayer.setupPlayer();

  }
  function AudioScreen() {
    return (
      <AudioStack.Navigator screenOptions={{ headerShown: false }}>
        <AudioStack.Screen name="Audios" component={Audios} />
      </AudioStack.Navigator>
    )
  }
  function VideoScreen() {
    return (<VideoStack.Navigator screenOptions={{ headerShown: false }}>
      <VideoStack.Screen name='Videos' component={Videos} />

    </VideoStack.Navigator>)
  }
  function TabNavigator() {
    return (
      <Tab.Navigator screenOptions={{ tabBarStyle: { backgroundColor: BLACK }, headerStyle: styles.header, headerTitleStyle: styles.headerTitle }}>
        <Tab.Screen name="Audios" component={AudioScreen} options={{
          tabBarLabel: 'Audios', tabBarLabelStyle: styles.tabLabel,
          tabBarIcon: ({ focused, color, size }) => {
            const colors = focused ? YELLOW : color;
            return (
              <FontAwesome name={'music'} color={colors} size={size} />
            )
          },
        }} />
        <Tab.Screen name="Videos" component={VideoScreen} options={{
          tabBarLabel: 'Videos', tabBarLabelStyle: styles.tabLabel, tabBarIcon: ({ focused, color, size }) => {
            const colors = focused ? YELLOW : color;
            return (
              <FontAwesome name={'video-camera'} color={colors} size={size} />
            )
          }

        }} />
      </Tab.Navigator>
    )
  }
  return (
    <NavigationContainer >
      <StatusBar
        backgroundColor={BLACK}
        barStyle="light-content"
      />
      <RootStack.Navigator screenOptions={{ headerShown: false }}>
        <RootStack.Screen name='Home' component={TabNavigator} />
        <AudioStack.Screen name='AudioPlayer' component={AudioPlayer} />
        <VideoStack.Screen name='VideoPlayer' component={VideoPlayer} />
      </RootStack.Navigator>
    </NavigationContainer>
  )
}

export default App

const styles = StyleSheet.create({
  header: {
    backgroundColor: YELLOW,
  },
  headerTitle: {
    color: BLACK,
  },
  tabLabel: {
    color: YELLOW,
  }
})
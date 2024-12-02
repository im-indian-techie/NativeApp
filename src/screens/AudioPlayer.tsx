import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { TrackItem } from '../TrackItem';
import TrackPlayer, { Capability, Event, State, useProgress, useTrackPlayerEvents } from 'react-native-track-player';
import { ProgressBar } from 'react-native-paper';
import Slider from '@react-native-community/slider';
import { Image } from 'react-native-animatable';
import { YELLOW } from '../assets/colors';


const AudioPlayer = ({ route }: any) => {

  const track: TrackItem = route.params.track;
  const progress = useProgress();
  const [playerState, setPlayerState] = useState<State>(State.None)
  var track1 = {
    url: track.url,
    title: track.title
  }
  useEffect(() => {
    initPlayer();
  }, [])
  const initPlayer = async () => {
    try {
      // const state =  TrackPlayer.getState();
      // setPlayerState(state);
      await TrackPlayer.reset();
      await TrackPlayer.add([track1]);
      TrackPlayer.updateOptions({
        // Media controls capabilities
        capabilities: [
          Capability.Play,
          Capability.Pause,
          Capability.SkipToNext,
          Capability.SkipToPrevious,
          Capability.Stop,
        ],

        // Capabilities that will show up when the notification is in the compact form on Android
        compactCapabilities: [Capability.Play, Capability.Pause],

        // Icons for the notification on Android (if you don't like the default ones)
        // playIcon: require('./play-icon.png'),
        // pauseIcon: require('./pause-icon.png'),
        // stopIcon: require('./stop-icon.png'),
        // previousIcon: require('./previous-icon.png'),
        // nextIcon: require('./next-icon.png'),
        // icon: require('./notification-icon.png')
      });
      TrackPlayer.play();
    } catch (error) {
      console.error(error)
    }


  }
  const playResume=async()=>{
    (await TrackPlayer.getState() == State.Playing) ?  TrackPlayer.pause() :  TrackPlayer.play();
    
  }

  useTrackPlayerEvents([Event.PlaybackState],(event)=>{
     if(event.state)
     {
      setPlayerState(event.state);
     }
  });


  return (
    <View style={{ flex: 1, backgroundColor: 'black', padding: 12, alignItems: 'center' }}>
      <Image source={require('../assets/images/music.png')} style={{ height: 200, width: 200, marginTop: 40 }} />
      <Text style={{ color: 'white' }}>{track.title}</Text>
      <Slider
        style={{ width: '100%', height: 60 }}
        minimumValue={0}
        value={progress.position}
        maximumValue={progress.duration}
        minimumTrackTintColor="#FFFFFF"
        maximumTrackTintColor={YELLOW}
      />
      <View style={{ flex: 1, flexDirection: 'row', marginTop: 50 }}>
        <TouchableOpacity onPress={
          () => {
             
          }
        }>
          <Image source={require('../assets/images/left.png')} style={{ height: 25, width: 25,tintColor:YELLOW }} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => {
          playResume();
        }}>
          {
            (playerState == State.Playing) ? <Image source={require('../assets/images/play.png')} style={{ height: 25, width: 25, marginLeft: 50, marginRight: 50 ,tintColor:YELLOW}} /> :
              <Image source={require('../assets/images/pause.png')} style={{ height: 25, width: 25, marginLeft: 50, marginRight: 50 ,tintColor:YELLOW}} />
          }
        </TouchableOpacity>
        <TouchableOpacity>
          <Image source={require('../assets/images/right.png')} style={{ height: 25, width: 25,tintColor:YELLOW }} />

        </TouchableOpacity>

      </View>
    </View>
  )
}

export default AudioPlayer

const styles = StyleSheet.create({})
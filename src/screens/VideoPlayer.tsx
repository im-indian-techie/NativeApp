import { Dimensions, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import Video, { VideoRef } from 'react-native-video';
import { TrackItem } from '../TrackItem';
import VideoPlayers from 'react-native-video-controls';
import Orientation from 'react-native-orientation-locker';


const VideoPlayer = ({ route }: any) => {
  const item: TrackItem = route.params.track;
  const videoRef = useRef<VideoRef>(null);
  const [videoFullScreen, setVideoFullScreen] = useState(false);
  useEffect(() => {
    if (videoFullScreen) {
      Orientation.lockToLandscape();
    }
    else {
      Orientation.lockToPortrait();
    }
  }, [videoFullScreen])
  console.log(item.url);
  return (
    <View style={styles.container}>

      {/* <VideoPlayers
        source={{ uri: item.url }} 
        onBack={() => console.log('Back button pressed')}
        onEnd={() => console.log('Video has finished')}
        videoFullScreen={videoFullScreen}
        onFullscreenPlayerDidPresent={() => {
          setVideoFullScreen(true);
        }}
        onFullscreenPlayerWillDismiss={() => {
          setVideoFullScreen(false);
        }}
        resizeMode="contain"
        controls={true}
      /> */}




      <Video
        controls={true}
        source={{ uri: item.url, }}
        ref={videoRef}
        repeat={false}
        resizeMode={'contain'}
        style={styles.videoPreview}
        onFullscreenPlayerDidPresent={() => {
          setVideoFullScreen(true);
        }}
        onFullscreenPlayerWillDismiss={() => {
          setVideoFullScreen(false);
        }}
        
      />
    </View>

  )
}

export default VideoPlayer

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'black',


  },
  videoPreview: {
    height: 500,

  },
})
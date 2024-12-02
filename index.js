/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import Test from './src/screens/Test';
import Videos from './src/screens/Videos';
import TrackPlayer from 'react-native-track-player';
import { PlaybackService } from './src/PlaybackService';


AppRegistry.registerComponent(appName, () => App);

TrackPlayer.registerPlaybackService(() => PlaybackService);



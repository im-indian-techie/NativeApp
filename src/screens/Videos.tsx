import React, { useEffect, useState } from 'react';
import {
    Alert,
    FlatList,
    PermissionsAndroid,
    Platform,
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    Image,
} from 'react-native';
import RNFS from 'react-native-fs';
import Video from 'react-native-video'; // Import Video component
import SoundPlayer from 'react-native-sound-player'
import { useNavigation } from '@react-navigation/native';
// import { RootStackParamList } from '../../App';
import { NativeStackNavigationProp, NativeStackNavigatorProps } from 'react-native-screens/lib/typescript/native-stack/types';
import { TrackItem } from '../TrackItem';
import { mediaLibrary } from "react-native-media-library2";

const Videos = () => {
    const navigation = useNavigation<any>();
    const [videos, setVideos] = useState<TrackItem[]>([]);
    const [paused, isPaused] = useState<string | null>(null);


    const requestPermissions = async () => {
        if (Platform.OS === 'android') {
            const granted = await PermissionsAndroid.request(
                PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE
            );
            return granted === PermissionsAndroid.RESULTS.GRANTED;
        }
        return true;
    };

    const loadVideos = async () => {
        const hasPermission = await requestPermissions();
        if (!hasPermission) {
            Alert.alert("Permission Required", "Please grant storage permissions to access videos.");
            return;
        }
        const video = await mediaLibrary.getAssets({ mediaType: ['video'] })
        console.log('video', video);
        const allVideos: any[] = [];
        const mappedVideos = video.map(file => ({
            title: file.filename,
            url: file.uri,
        }));
        allVideos.push(...mappedVideos);
        setVideos(allVideos);
    }
    // const loadVideos = async () => {
    //     const hasPermission = await requestPermissions();
    //     if (!hasPermission) {
    //         Alert.alert("Permission Required", "Please grant storage permissions to access videos.");
    //         return;
    //     }

    //     const directoriesToCheck = [
    //         RNFS.ExternalStorageDirectoryPath,
    //         `${RNFS.ExternalStorageDirectoryPath}/Movies`,
    //         `${RNFS.ExternalStorageDirectoryPath}/DCIM`,
    //         `${RNFS.ExternalStorageDirectoryPath}/Download`,
    //     ];

    //     const allVideos: any[] = [];

    //     for (const dir of directoriesToCheck) {
    //         try {
    //             console.log(`Checking directory: ${dir}`);
    //             const files = await RNFS.readDir(dir);
    //             console.log(`Files in ${dir}:`, files); 
    //             const videoFiles = files.filter(file =>
    //                 file.isFile() &&
    //                 (file.name.endsWith('.mp4') || file.name.endsWith('.avi') || file.name.endsWith('.mov'))
    //             );
    //             const mappedVideos = videoFiles.map(file => ({
    //                 title: file.name, 
    //                 url: file.path,  
    //             }));

    //             console.log(`Filtered video files in ${dir}:`, mappedVideos); 
    //             allVideos.push(...mappedVideos);
    //         } catch (error) {
    //             console.error(`Error reading directory ${dir}:`, error);
    //         }
    //     }

    //     setVideos(allVideos); 
    // };

    // const loadVideos=()=>{
    //      const vd:Video[]=[
    //        {
    //         path:'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
    //         name:'test'
    //        },
    //        {
    //         path:'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4',
    //         name:'test'
    //        },
    //        {
    //         path:'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
    //         name:'test'
    //        },
    //      ];
    //      setVideos(vd);




    // }

    useEffect(() => {
        loadVideos();
    }, []);


    const VideoItem = ({ item }: { item: TrackItem }) => {
        const pase = paused !== item.url;

        return (
            <TouchableOpacity style={styles.videoItem} onPress={() => {
                console.log("title", item.title);
                playVideo(item)
            }

            }>
                <Image source={require('../assets/images/videoplayer.png')} style={styles.img} />

                <Text style={styles.videoText}>{item.title}</Text>
                {/* <Video
                    source={{ uri: item.path }} // Video URI
                    style={styles.videoPreview}
                    paused={pase} // Preview is paused
                    resizeMode="cover"
                    repeat={true} // Loop the video
                /> */}


            </TouchableOpacity>
        )
    }



    const playVideo = (track: TrackItem) => {
        navigation.navigate('VideoPlayer', { track: track });

    };

    return (
        <View style={styles.container}>
            <FlatList
                data={videos}
                renderItem={VideoItem}
                keyExtractor={(item) => item.url}
            />

        </View>
    );
};

// Define styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    videoItem: {
        padding: 16,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
        flexDirection:'row'
    },
    videoText: {
        fontSize: 18,
        color: 'black'
    },
    videoPreview: {
        height: 200,
        marginTop: 10,
    },
    img: {
        height: 20,
        width: 20,
        marginLeft: 20,
        marginRight: 20,
    }
});

export default Videos;

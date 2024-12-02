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
} from 'react-native';
import RNFS from 'react-native-fs';
import Video from 'react-native-video'; // Import Video component
import SoundPlayer from 'react-native-sound-player'
import { useNavigation } from '@react-navigation/native';
// import { RootStackParamList } from '../../App';
import { NativeStackNavigationProp, NativeStackNavigatorProps } from 'react-native-screens/lib/typescript/native-stack/types';
import { TrackItem } from '../TrackItem';
import { check, PERMISSIONS, requestMultiple, RESULTS } from 'react-native-permissions';
import { getAll, SortSongOrder, SortSongFields } from 'react-native-get-music-files';
import { Song } from 'react-native-get-music-files/lib/typescript/src/NativeTurboSongs';
import { mediaLibrary } from "react-native-media-library2";
import { Image } from 'react-native-animatable';




const Audios = () => {
    const navigation = useNavigation<any>();
    const [audios, setAudios] = useState<TrackItem[]>([]);
    const [paused, isPaused] = useState<string | null>(null);


    const requestPermissions = async () => {
        if (Platform.OS === 'android') {
            // const granted = await PermissionsAndroid.request(
            //     PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE
            // );
            // return granted === PermissionsAndroid.RESULTS.GRANTED;
            let haspermission = (await check(PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE)) === RESULTS.GRANTED || (await check(PERMISSIONS.ANDROID.READ_MEDIA_AUDIO)) === RESULTS.GRANTED;
            if (!haspermission) {
                const per = await requestMultiple([
                    PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE, PERMISSIONS.ANDROID.READ_MEDIA_AUDIO
                ]);

                haspermission = per[PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE] === RESULTS.GRANTED || per[PERMISSIONS.ANDROID.READ_MEDIA_AUDIO] === RESULTS.GRANTED;

            }
            return haspermission;
        }
        return true;
    };

    const loadAudios = async () => {
        const hasPermission = await requestPermissions();
        if (!hasPermission) {
            Alert.alert("Permission Required", "Please grant storage permissions to access videos.");
            return;
        }
        const audio=await mediaLibrary.getAssets({mediaType:['audio']})
        console.log('audio',audio);
        const allaudios: any[] = [];
        const mappedAudios=audio.map(file=>({
            title:file.filename,
            url:file.uri,
        }));
        allaudios.push(...mappedAudios);
        setAudios(allaudios);
    }
    // const loadAudios = async () => {
    //     const hasPermission = await requestPermissions();
    //     if (!hasPermission) {
    //         Alert.alert("Permission Required", "Please grant storage permissions to access videos.");
    //         return;
    //     } else {
    //         const allAudios: any[] = [];
    //         let songsOrError: string | Song[] = await getAll({}); 
    //         console.log("songggs",songsOrError);
    //         let songs: Song[];

    //         if (Array.isArray(songsOrError)) {
    //             songs = songsOrError; 
    //             const mappedAudios=songs.map(file=>({
    //                 title:file.title,
    //                 url:file.url
    //             }))
    //             allAudios.push(...mappedAudios);
    //         } else {
    //             console.error("Error loading songs:", songsOrError); 
    //             songs = [];
    //         }
    //         setAudios(allAudios);


    //     }


    // }

    // const loadAudios = async () => {
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

    //     const allAudios: any[] = [];

    //     for (const dir of directoriesToCheck) {
    //         try {
    //             console.log(`Checking directory: ${dir}`);
    //             const files = await RNFS.readDir(dir);
    //             console.log(`Files in ${dir}:`, files);
    //             const audioFiles=files.filter(file=>
    //               file.isFile()&& (file.name.endsWith('.mp3'))
    //             )
    //             const mappedAudios = audioFiles.map(file => ({
    //                 title: file.name, 
    //                 url: file.path,  
    //             }));

    //             console.log(`Filtered video files in ${dir}:`, mappedAudios); 
    //             allAudios.push(...mappedAudios);

    //         } catch (error) {
    //             console.error(`Error reading directory ${dir}:`, error);
    //         }
    //     }

    //     setAudios(allAudios); 
    // };

    useEffect(() => {
        loadAudios();
    }, []);


    const AudioItem = ({ item }: { item: TrackItem }) => {
        const pase = paused !== item.url;

        return (
            <TouchableOpacity style={styles.videoItem} onPress={() => {
                console.log("title", item.title);
                playVideo(item)
            }

            }>
                <Image source={require('../assets/images/musicalnote.png')} style={styles.img}/>
                <Text style={styles.videoText}>{item.title}</Text>


            </TouchableOpacity>
        )
    }



    const playVideo = (track: TrackItem) => {
        navigation.navigate('AudioPlayer', { track: track });

    };

    return (
        <View style={styles.container}>
            <FlatList
                data={audios}
                renderItem={AudioItem}
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
        flexDirection:'row',
       
    },
    videoText: {
        fontSize: 18,
        color: 'black'
    },
    videoPreview: {
        height: 200,
        marginTop: 10,
    },
    img:{
        height:20,
        width:20,
        marginLeft:20,
        marginRight:20,
    }
});

export default Audios;

import React from 'react';
import {
    StyleSheet,
    Text,
    View,
    SafeAreaView,
    StatusBar,
    Platform,
    TouchableOpacity,
    ScrollView,
    Image
} from 'react-native';
import {RFValue,RFPercentage } from 'react-native-responsive-fontsize'

import * as Permissions from "expo-permissions";

import * as FaceDetector from 'expo-face-detector';
import { Camera } from 'expo-camera';

import Filter1 from './Filter1'
import Filter2 from './Filter2';
import Filter3 from './Filter3';
import Filter4 from './Filter4';
import Filter5 from './Filter5';


let data = [{
    "id": "1",
    "image": require('../assets/crown-pic1.png'),
},
{
    "id": "2",
    "image": require('../assets/crown-pic2.png'),
},
{
    "id": "3",
    "image": require('../assets/crown-pic3.png'),
},
{
    "id": "4",
    "image": require('../assets/flower-pic1.png'),
},
{
    "id": "5",
    "image": require('../assets/flower-pic2.png'),
},
];

export default class Main extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            hasCameraPermission: null,
            faces: [],
            current_filter: "Filter_1",
        }
        this.onCameraPermission = this.onCameraPermission.bind(this)
        this.onFacesDetected = this.onFacesDetected.bind(this)
        this.onFaceDetectionError = this.onFaceDetectionError.bind(this)
    }

    componentDidMount() {
        Permissions
            .askAsync(Permissions.CAMERA)
            .then(this.onCameraPermission)
    }

    onCameraPermission({ status }) {
        this.setState({ hasCameraPermission: status === 'granted' })
    }

    onFacesDetected({ faces }) {
        this.setState({ faces: faces })
console.log(faces)
    }

    onFaceDetectionError(error) {
        console.log(error)
    }

    render() {
        const { hasCameraPermission } = this.state;
        if (hasCameraPermission === null) {
            return <View><Text>no</Text></View>
        }
        if (hasCameraPermission === false) {
            return (
                <View style={styles.container}>
                    <Text>No access to camera</Text>
                </View>
            )
        }
        return (
            <View style={styles.container}>
                <SafeAreaView style={styles.droidSafeArea} />
                <View style={styles.headingContainer}>
                    <Text style={styles.titleText}>FRAPP</Text>
                </View>
                <View style={styles.cameraStyle}>
                    <Camera
                        style={{ flex: 1 }}
                        type={Camera.Constants.Type.front}
                        faceDetectorSettings={{
                            mode: FaceDetector.FaceDetectorMode.fast,
                            detectLandmarks: FaceDetector.FaceDetectorLandmarks.all,
                            runClassifications: FaceDetector.FaceDetectorClassifications.all
                        }}
                        onFacesDetected={this.onFacesDetected}
                        onFacesDetectionError={this.onFacesDetectionError}
                    />
                    {
                        this.state.faces.map(face => {
                            if(this.state.current_filter=="Filter_1") return <Filter1 face={face} />
                            else if(this.state.current_filter=="Filter_2") return <Filter2 key={face.faceID} face={face} />
                            else if(this.state.current_filter=="Filter_3") return <Filter3 key={face.faceID} face={face} />
                            else if(this.state.current_filter=="Filter_4") return <Filter4 key={face.faceID} face={face} />
                            else if(this.state.current_filter=="Filter_5") return <Filter5 key={face.faceID} face={face} />
                        })
                    }
                </View>
                <View style={styles.frameContainer}>
                    <ScrollView
                        style={{ flexDirection: 'row' }}
                        horizontal
                        showsHorizontalScrollIndicator={false}
                    >
                        {
                            data.map(filter_data => {
                                return (
                                    <TouchableOpacity style={styles.filterImageContainer}
                                        onPress={() => {
                                            this.setState({
                                                current_filter: `Filter_${filter_data.id}`
                                            })
                                        }}
                                    >
                                        <Image
                                        source={filter_data.image}
                                        style={{width:80,height:32}}
                                        ></Image>
                                    </TouchableOpacity>
                                )
                            })
                        }
                    </ScrollView>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    droidSafeArea: {
        marginTop: Platform.OS === "android" ? StatusBar.currentHeight : 0
    },
    headingContainer: {
        flex: 0.1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    titleText: {
        fontSize: 30
    },
    cameraStyle: {
        flex: 0.65
    },
    frameContainer: {
        flex:0.2,
        paddingLeft:RFValue(20),
        paddingRight:RFValue(20),
        paddingTop:RFValue(10),
        backgroundColor:'cyan',
    },
    filterImageContainer: {
        height: RFValue(70),
        width: RFValue(70),
        justifyContent: "center",
        alignItems: "center",
        borderRadius: RFValue(35),
        backgroundColor: "#E7F2F8",
        borderWidth: 5,
        marginRight: RFValue(20),
        marginBottom: RFValue(10)
    },
});
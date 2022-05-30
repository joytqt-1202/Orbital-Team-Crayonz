import { StatusBar } from "expo-status-bar"
import { Button, StyleSheet, Text, View, SafeAreaView, Image, TouchableOpacity, AsyncStorage, Platform} from "react-native"
import React from "react"
import { useEffect, useRef, useState } from "react"
import { Camera, getMicrophonePermissionsAsync } from "expo-camera"
import * as MediaLibrary from "expo-media-library"
import { shareAsync } from "expo-sharing"
import Icon from '@expo/vector-icons/Ionicons'
import { LinearGradient } from "expo-linear-gradient"
// import storage from "@react-native-firebase/storage"
// import firebase from "./src/firebase"
// import { launchImageLibrary } from 'react-native-image-picker'
// import { CLIENT_API_KEY } from "@env"

/*
const SERVER_URL = 'https://api.imgbb.com/1/upload'
const createFormData = (photo, body = {}) => {
  const data = new FormData()
  
  data.append('photo', {
    name: photo.fileName,
    type: photo.type,
    uri: Platform.OS === 'ios' ? photo.uri.replace('file://', '') : photo.uri
  })

  Object.keys(body).forEach((key) => {
    data.append(key, body[key])
  })

  return data
}
*/

export default function App() {
  let cameraRef = useRef()
  const [hasCameraPermission, setHasCameraPermission] = useState(false) //initial value is undefined
  const [hasMediaLibPermission, setHasMediaLibPermission] = useState(false)
  const [photo, setPhoto] = useState() //if val is undefined means theres no photo
  const [cameraType, setCameraType] = useState(Camera.Constants.Type.back)
  const [cameraFlash, setCameraFlash] = useState(Camera.Constants.FlashMode.off)

  /* // Not working. - Unhandled Promise Rejection
  const handleChoosePhoto = () => {
    launchImageLibrary({ noData: true }, (response) => {
      if (response) {
        setPhoto(response)
      }
    })
  }
  */

  useEffect(() => {
    (async () => {
      const cameraPermission = await Camera.requestCameraPermissionsAsync() //to use await we need async fcn
      const mediaLibPermission = await MediaLibrary.requestPermissionsAsync()
      setHasCameraPermission(cameraPermission.status === "granted")
      setHasMediaLibPermission(mediaLibPermission.status === "granted")
    })()//() returns a promise
  }, [])

  if (hasCameraPermission === undefined) {
    return <Text>Requesting Permissions</Text>
  } else if (!hasCameraPermission) {
    return (
      <Text>Please enable camera permissions in your device's settings.</Text>
    )
  }

  let takePic = async () => {
    let options = {
      quality: 1,
      base64: true,
      exif: false,
    }

    let newPhoto = await cameraRef.current.takePictureAsync(options)
    setPhoto(newPhoto)
  }

  if (photo) {
    let sharePic = () => {
      shareAsync(photo.uri).then(() => {
        setPhoto(undefined)
      })
    }
    let savePic = () => {
      MediaLibrary.saveToLibraryAsync(photo.uri).then(() => {
        setPhoto(undefined)
      })
    }
/* // Not working
    let uploadImage = async () => {
      const response = await fetch(photo.uri)
      const blob = await response.blob()

      const ref = firebase.storage().ref().child(new Date().toISOString)
      return ref.put(blob)
    }
*/
/* // Not really working because of server linking
  const handleUploadPhoto = () => {
    fetch(`${SERVER_URL}/api/upload`, {
      method: 'POST',
      image: createFormData(photo, {userId: '123 '}),
      key: CLIENT_API_KEY
    })
      .then((response) => response.json())
      .then((response) => {
        console.log('response', response)
      })
      .catch((e) => {
        console.log('error', e)
      })
  }
*/
    return (
      <SafeAreaView style={styles.container}>
        <Image
          style={styles.preview}
          source={{ uri: /*"data:image/jpg;base64," + photo.base64*/ photo.uri }}
        />
        <Button title="Share" onPress={sharePic} />
        
        { hasMediaLibPermission ? (
          <Button title="Save" onPress={savePic} />
        ) : undefined }
       
        <Button title="Discard" onPress={() => setPhoto(undefined)} />
      </SafeAreaView>
    )
  }

  const switchCamera = () => {
    cameraType === "back"
      ? setCameraType("front")
      : setCameraType("back")
  }

  const switchFlash = () => {
    cameraFlash === "off"
      ? setCameraFlash("torch")
      : setCameraFlash("off")
  }

  return (
    //Top level container
    <View style={styles.container}>
      
    <Camera type={cameraType} style={styles.camContainer} ref={cameraRef} ratio={'16:9'} flashMode={cameraFlash}>

      {/* bottomBarContainer start */}
      <View style={styles.bottomBarContainer}>
        <View style={{ flex: 1 }}></View>
        
        <View style={styles.takePicContainer}>
          {/* change gradient: https://cssgradient.io/ */}
          <LinearGradient colors={['#fd2df8', '#ffa823', '#6ee0cf']} style={styles.buttonGradient}>
            <TouchableOpacity onPress={takePic} style={styles.takePic} activeOpacity="0.5"/>
          </LinearGradient>
        </View>

        <View style={{ flex: 1 }}>
          <TouchableOpacity onPress={switchCamera} style={styles.changeCam} activeOpacity="0.5">
            <View style={styles.changeCamIcon}>
              <Icon name="camera-reverse" size={26} color={"white"} />
            </View>  
          </TouchableOpacity>  
        </View>

        <TouchableOpacity /*</View>onPress={handleChoosePhoto}*/ style={styles.mediaLibrary} activeOpacity="0.5">
          <View style={styles.changeCamIcon}>
            <Icon name="image" size={26} color={"white"} />
          </View> 
        </TouchableOpacity>    
      </View>
      {/* bottomBarContainer end */}

      {/* topBarContainer start */}
      <View style={styles.topBarContainer}>
        <View style={{ flex: 1 }}></View>

        <TouchableOpacity onPress={switchFlash} style={styles.flashContainer} activeOpacity="0.5">
          <View>
            { cameraFlash === "torch"
                ? <Icon name="md-flash" size={26} color={"white"} />
                : <Icon name="md-flash-off" size={26} color={"white"} /> 
            }     
          </View> 
        </TouchableOpacity> 

        <TouchableOpacity activeOpacity="0.5">
          <View style={styles.settingsContainer}>
            <Icon name="settings" size={26} color={"white"} />
          </View> 
        </TouchableOpacity>

      </View>
      {/* topBarContainer end */}

      <StatusBar style="light"/>
    </Camera>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    borderTopWidth: 40,
    borderColor: "black",
    backgroundColor: "#fff",
    flex: 1,
  },
  camContainer: {
    backgroundColor: "#fff",
    flex: 1,//make sure it occupies entire screen, 
  },
  bottomBarContainer:{
    position: 'absolute',
    bottom: 0,
    flexDirection: "row",
    marginBottom: 30,
    alignItems: "center",
  },
  mediaLibrary: {
    backgroundColor: "rgba(0,0,0,0.75)",
    borderRadius: 30,
    width: 45,
    height: 45,
    position: "absolute",
    left: 25
  },
  mediaLibraryIcon:{
    alignSelf:"center",
  },
  takePicContainer: {
    flex: 1,
    marginHorizontal: 80, //make sure components don't touch each other
  },
  buttonGradient: {
    width: 80,
    height: 80, 
    borderRadius: 50,
    alignSelf: "center",
  },
  takePic: {
    // borderWidth: 5,
    backgroundColor: "#fff",
    // borderColor: "rgb(204,204,255)",
    width: 70,
    height: 70, 
    borderRadius: 50,
    alignSelf: "center",
    top: 5
  },
  changeCam: {
    backgroundColor: "rgba(0,0,0,0.75)",
    borderRadius: 30,
    width: 45,
    height: 45,
  },
  changeCamIcon:{
    alignSelf:"center",
    top: 8
  },
  topBarContainer: {
    position: 'absolute',
    flexDirection: "row",
    alignItems: "center",
    marginTop: 15,
    // backgroundColor:"pink"
  },
  flashContainer:{
    marginRight: 280
  },
  settingsContainer:{
    marginRight: 21,
  },
  preview: {
    alignSelf: "stretch",
    flex: 1,
  },
})
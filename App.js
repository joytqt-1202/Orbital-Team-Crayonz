import { StatusBar } from "expo-status-bar"
import { Button, StyleSheet, Text, View, SafeAreaView, Image, TouchableOpacity } from "react-native"
import React from "react"
import { useEffect, useRef, useState } from "react"
import { Camera } from "expo-camera"
import * as MediaLibrary from "expo-media-library"
import { shareAsync } from "expo-sharing"
import { Icon } from "react-native-vector-icons/FontAwesome"
//import { LinearGradient } from "expo"

export default function App() {
  let cameraRef = useRef()
  const [hasCameraPermission, setHasCameraPermission] = useState(false) //initial value is undefined
  const [hasMediaLibPermission, setHasMediaLibPermission] = useState(false)
  const [photo, setPhoto] = useState() //if val is undefined means theres no photo
  const [cameraType, setCameraType] = useState(Camera.Constants.Type.back)
  const [cameraFlash, setCameraFlash] = useState(Camera.Constants.FlashMode.off)

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

    return (
      <SafeAreaView style={styles.container}>
        <Image
          style={styles.preview}
          source={{ uri: "data:image/jpg;base64," + photo.base64 }}
        />
        <Button title="Share" onPress={sharePic} />
        {hasMediaLibPermission ? (
          <Button title="Save" onPress={savePic} />
        ) : undefined}
        <Button title="Discard" onPress={() => setPhoto(undefined)} />
      </SafeAreaView>
    )
  }

  const switchCamera = () => {
    if(cameraType === "back"){
      setCameraType("front")
    } else{
      setCameraType("back")
    }
  }
  return (
    <Camera type={cameraType} style={styles.container} ref={cameraRef} flashMode={cameraFlash}>

      <View style={styles.bottomBarContainer}>

        <View style={{ flex: 1 }}></View>

        <View style={styles.takePicContainer}>
          <TouchableOpacity onPress={takePic} style={styles.takePic} activeOpacity="0.5"/>
        </View>

        <View style={{ flex: 1 }}>
          <TouchableOpacity onPress={switchCamera} style={styles.changeCam} activeOpacity="0.5">
            {/* <Icon name="camera" size={24} color={"white"} />  */}
            <Text style={styles.iconText}>Flip</Text>
          </TouchableOpacity>
          
        </View>

        <View style={styles.topBarContainer}></View>
        
      </View>
      <StatusBar style="auto" />
    </Camera>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1, //make sure it occupies entire screen
    backgroundColor: "#fff",
  },
  bottomBarContainer:{
    position: 'absolute',
    bottom: 0,
    flexDirection: "row",
    marginBottom: 30,
    alignItems: "center",
  },
  takePicContainer: {
    flex: 1,
    marginHorizontal: 65 //make sure components don't touch each other
  },
  takePic: {
    borderWidth: 5,
    backgroundColor: "#fff",
    borderColor: "rgb(204,204,255)",
    width: 80,
    height: 80, 
    borderRadius: 50,
    alignSelf: "center",
  },
  changeCam: {
    backgroundColor: "rgba(0,0,0,0.75)",
    borderRadius: 30,
    width: 45,
    height: 45,
  },
  iconText:{
    color: "#fff",
    fontSize: 18,
    position: "absolute",
    alignSelf: "center",
    bottom: 15 
  },
  preview: {
    alignSelf: "stretch",
    flex: 1,
  },
})

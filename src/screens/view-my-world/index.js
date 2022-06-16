import { StatusBar } from "expo-status-bar"
import { Button, StyleSheet, Text, View, SafeAreaView, Image, TouchableOpacity } from "react-native"
import React from "react"
import { useEffect, useRef, useState } from "react"
import { Camera } from "expo-camera"
import * as MediaLibrary from "expo-media-library"
import { shareAsync } from "expo-sharing"
import Icon from "@expo/vector-icons/Ionicons"
import { LinearGradient } from "expo-linear-gradient" 
import styles from "./styles"
import CamButtons from "../../components/main-camera"


export default function VMWScreen({navigation}) {
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
   <CamButtons 
      takePicFcn={takePic}
      switchCamFcn={switchCamera}
      switchFlashFcn={switchFlash}
      camRef={cameraRef}
      cameraFlash={cameraFlash}
      cameraType={cameraType}
      navigation={navigation}
   />

   
  )
}
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
  const [text, setText] = useState(0)

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
      <View style={styles.container}>
        <Image
          style={styles.preview}
          source={{ uri: "data:image/jpg;base64," + photo.base64 }}
        />

        {/* bottomBarContainer start */}
      <View style={styles.bottomBarContainer}>
        <View style={{ flex: 1 }}></View>
        
          <TouchableOpacity onPress={sharePic} style={styles.changeCam}>
            <View style={styles.bottomBar}>
              <Icon name="share-outline" size={30} color={"white"} />
              {/* <Text>Share</Text> */}
            </View>  
          </TouchableOpacity>  
        
          <TouchableOpacity onPress={savePic} style={styles.mediaLibrary}>
            <View style={styles.bottomBar}>
              <Icon name="save-outline" size={30} color={"white"} />
              {/* <Text>Save</Text> */}
            </View> 
          </TouchableOpacity>

          <TouchableOpacity style={styles.mediaLibrary}>
            <View style={styles.bottomBar}>
              <Icon name="logo-firebase" size={30} color={"white"} />
              {/* <Text>Firebase</Text> */}
            </View> 
          </TouchableOpacity>

          <TouchableOpacity onPress={() => setPhoto(undefined)} style={styles.mediaLibrary}>
            <View style={styles.bottomBar}>
              <Icon name="ios-trash" size={30} color={"white"} />
              {/* <Text>Discard</Text> */}
            </View> 
          </TouchableOpacity>

      </View>
      {/* bottomBarContainer end */}
        
        {/* <Button title="Share" onPress={sharePic} />
        {hasMediaLibPermission ? (
          <Button title="Save" onPress={savePic} />
        ) : undefined}
        <Button title="Discard" onPress={() => setPhoto(undefined)} /> */}
        <StatusBar style="light"/>
      </View>
      
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

  // const showText = () => {
  //   cameraFlash === "off"
  //     ? setCameraFlash("torch")
  //     : setCameraFlash("off")
  // }
  return (
  <View style={styles.preview}>
   <CamButtons 
      takePicFcn={takePic}
      switchCamFcn={switchCamera}
      switchFlashFcn={switchFlash}
      camRef={cameraRef}
      cameraFlash={cameraFlash}
      cameraType={cameraType}
      navigation={navigation}
   /> 
    
   <View style={styles.leftBarContainer}>
      <TouchableOpacity >
        <Text style={styles.Text}>R</Text>
      </TouchableOpacity>
      <TouchableOpacity >
        <Text style={styles.Text}>G</Text>
      </TouchableOpacity>
      <TouchableOpacity >
        <Text style={styles.Text}>B</Text>
      </TouchableOpacity>
      <TouchableOpacity >
        <Text style={styles.Text}>C</Text>
      </TouchableOpacity>
    </View>

   
   </View>
  )
}
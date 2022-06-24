import { StatusBar } from "expo-status-bar"
import { Button, StyleSheet, Text, View, SafeAreaView, Image, TouchableOpacity, Alert } from "react-native"
import React from "react"
import { useEffect, useRef, useState } from "react"
import { Camera } from "expo-camera"
import * as MediaLibrary from "expo-media-library"
import * as ImagePicker from "expo-image-picker"
import { shareAsync } from "expo-sharing"
import styles from "./styles"
import CamButtons from "../../components/main-camera"
import Icon from "@expo/vector-icons/Ionicons"
import * as firebase from 'firebase/app'
require("firebase/storage")

export default function CamMainScreen({navigation}) {
  let cameraRef = useRef()
  const [hasCameraPermission, setHasCameraPermission] = useState() //initial value is undefined
  const [hasMediaLibPermission, setHasMediaLibPermission] = useState()
  const [hasGalleryPermission, setHasGalleryPermission] = useState()
  const [photo, setPhoto] = useState() //if val is undefined means theres no photo
  const [cameraType, setCameraType] = useState(Camera.Constants.Type.back)
  const [cameraFlash, setCameraFlash] = useState(Camera.Constants.FlashMode.off)
  const [isCameraReady, setIsCameraReady] = useState(false)
  const [uploading, setUploading] = useState(false)
  const [transferred, setTransferred] = useState(0)
  
  Camera.

  useEffect(() => {
    (async () => {
      const cameraPermission = await Camera.requestCameraPermissionsAsync() //to use await we need async fcn
      const mediaLibPermission = await MediaLibrary.requestPermissionsAsync()
      const galleryPermission = await ImagePicker.requestMediaLibraryPermissionsAsync()
      setHasCameraPermission(cameraPermission.status === "granted")
      setHasMediaLibPermission(mediaLibPermission.status === "granted")
      setHasGalleryPermission(galleryPermission.status === "granted")
    })()//() returns a promise
  }, []) 

  // 

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
    // console.log(newPhoto)
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
      
      Alert.alert(
        'Image Saved!',
        'To your media gallery!'
      )
    }

    // const uploadToFirebase = async () => {
    //   const blob = await new Promise((resolve, reject) => {
    //     const xhr = new XMLHttpRequest()
    //     xhr.onload = function () {
    //       resolve(xhr.response)
    //     }
    //     xhr.onerror = function (e) {
    //       console.log(e)
    //     reject(new TypeError("Network request failed"))
    //     }
    //     xhr.responseType = "blob"
    //     xhr.open("GET", photo.uri, true)
    //     xhr.send(null)
    //   })

    //   const ref = firebase.bucket().ref(storage).cild(new Date().toISOString())
    //   const snapshot = await ref.put(blob)

    //   snapshot.on(
    //     firebase.storage().TaskEvent.STATE_CHANGED,
    //     (error)=> {
    //       console.log(error)
    //       blob.close()
    //       return
    //     },
    //     () => {
    //       snapshot.snapshot.ref.getDownloadURL().then((url) => {
    //         console.log("download url: ", url)
    //         blob.close()
    //         return url
    //       })
    //     }
    //   )
      

      // const uploadUri = photo
      // let filename = "test.jpg"

      // setUploading(true)

      // try {
      //   await firebase.storage().ref(filename).putFile(uploadUri)
      //   setUploading(false)

      //   Alert.alert(
      //     'Image Saved!',
      //     'To Firebase Storage!'
      //   )
      // } catch (e) {
      //   console.log(e)
      // }
    // }

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

  const pickImage = async() => {
    let result= await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images
    })

    console.log(result)
    if(!result.cancelled){
      // const storage = getStorage() //create an instance of storage which can add and access images from
      // const reference = ref(storage, result)  //create image inside storage

      //conver image to array of bytes
     
    //   uploadBytes(reference, bytes).then((snapshot) => {
    //     console.log('Uploaded blob or file!')
    //   });

    }
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
        camReady={() => setIsCameraReady(true)}
        openGallery={pickImage}
    /> 
  )
}
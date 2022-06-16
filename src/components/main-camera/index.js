import { StatusBar } from "expo-status-bar"
import { Button, StyleSheet, Text, View, SafeAreaView, Image, TouchableOpacity } from "react-native"
import React from "react"
import { Camera } from "expo-camera"
import Icon from "@expo/vector-icons/Ionicons"
import { LinearGradient } from "expo-linear-gradient" 
import styles from "./style"


export default function CamButtons({ navigation, takePicFcn, switchCamFcn, switchFlashFcn, camRef, cameraFlash, cameraType }) {
  // const navigate = useNavigation()
  // let cameraRef = useRef()
  // const [hasCameraPermission, setHasCameraPermission] = useState(false) //initial value is undefined
  // const [hasMediaLibPermission, setHasMediaLibPermission] = useState(false)
  // const [photo, setPhoto] = useState() //if val is undefined means theres no photo
  // const [cameraType, setCameraType] = useState(Camera.Constants.Type.back)
  // const [cameraFlash, setCameraFlash] = useState(Camera.Constants.FlashMode.off)

  // useEffect(() => {
  //   (async () => {
  //     const cameraPermission = await Camera.requestCameraPermissionsAsync() //to use await we need async fcn
  //     const mediaLibPermission = await MediaLibrary.requestPermissionsAsync()
  //     setHasCameraPermission(cameraPermission.status === "granted")
  //     setHasMediaLibPermission(mediaLibPermission.status === "granted")
  //   })()//() returns a promise
  // }, [])

  // if (hasCameraPermission === undefined) {
  //   return <Text>Requesting Permissions</Text>
  // } else if (!hasCameraPermission) {
  //   return (
  //     <Text>Please enable camera permissions in your device's settings.</Text>
  //   )
  // }

  // let takePic = async () => {
  //   let options = {
  //     quality: 1,
  //     base64: true,
  //     exif: false,
  //   }

  //   let newPhoto = await cameraRef.current.takePictureAsync(options)
  //   setPhoto(newPhoto)
  // }


  //   return (
  //     <SafeAreaView style={styles.container}>
  //       <Image
  //         style={styles.preview}
  //         source={{ uri: "data:image/jpg;base64," + photo.base64 }}
  //       />
  //       <Button title="Share" onPress={sharePic} />
  //       {hasMediaLibPermission ? (
  //         <Button title="Save" onPress={savePic} />
  //       ) : undefined}
  //       <Button title="Discard" onPress={() => setPhoto(undefined)} />
  //     </SafeAreaView>
  //   )
  // }

  // const switchCamera = () => {
  //   cameraType === "back"
  //     ? setCameraType("front")
  //     : setCameraType("back")
  // }

  // const switchFlash = () => {
  //   cameraFlash === "off"
  //     ? setCameraFlash("torch")
  //     : setCameraFlash("off")
  // }
  return (
    //Top level container
    <View style={styles.container}>
      
    <Camera type={cameraType} style={styles.camContainer} ref={camRef} ratio={'16:9'} flashMode={cameraFlash}>

      {/* bottomBarContainer start */}
      <View style={styles.bottomBarContainer}>
        <View style={{ flex: 1 }}></View>
        
        <View style={styles.takePicContainer}>
          {/* change gradient: https://cssgradient.io/ */}
          <LinearGradient colors={['#fd2df8', '#ffa823', '#6ee0cf']} style={styles.buttonGradient}>
            <TouchableOpacity onPress={takePicFcn} style={styles.takePic} activeOpacity="0.5"/>
          </LinearGradient>
        </View>

        <View style={{ flex: 1 }}>
          <TouchableOpacity onPress={switchCamFcn} style={styles.changeCam} activeOpacity="0.5">
            <View style={styles.changeCamIcon}>
              <Icon name="camera-reverse" size={26} color={"white"} />
            </View>  
          </TouchableOpacity>  
        </View>

        <TouchableOpacity style={styles.mediaLibrary} activeOpacity="0.5">
          <View style={styles.changeCamIcon}>
            <Icon name="image" size={26} color={"white"} />
          </View> 
        </TouchableOpacity>    
      </View>
      {/* bottomBarContainer end */}

      {/* topBarContainer start */}
      <View style={styles.topBarContainer}>
        <View style={{ flex: 1 }}></View>

        <TouchableOpacity activeOpacity="0.5" onPress={() => navigation.toggleDrawer()}>
          <View style={styles.menuContainer}>
            <Icon name="menu" size={32} color={"white"} />
          </View> 
        </TouchableOpacity>

        <TouchableOpacity onPress={switchFlashFcn} style={styles.flashContainer} activeOpacity="0.5">
          <View>
            { cameraFlash === "torch"
                ? <Icon name="md-flash" size={26} color={"white"} />
                : <Icon name="md-flash-off" size={26} color={"white"} /> 
            }     
          </View> 
        </TouchableOpacity> 

        <TouchableOpacity activeOpacity="0.5" onPress={() => navigation.navigate('Settings')}>
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


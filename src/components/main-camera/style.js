import { StyleSheet } from "react-native";
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
    marginTop: 10,
    // backgroundColor:"pink"
  },
  menuContainer:{
    marginRight: 125,
  },
  flashContainer:{
    marginRight: 130,
  },
  settingsContainer:{
    marginRight: 21,
  },
  preview: {
    alignSelf: "stretch",
    flex: 1,
  },
})

export default styles 
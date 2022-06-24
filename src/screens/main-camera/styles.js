import { StyleSheet } from "react-native";
const styles = StyleSheet.create({
  container: {
    borderColor: "black",
    // backgroundColor: "white",
    // marginBottom: 0,
    flex: 1,
  },
  camContainer: {
    backgroundColor: "#fff",
    flex: 1,//make sure it occupies entire screen, 
  },
  preview: {
    flex: 1,  
  },
  bottomBarContainer:{
    position: 'absolute',
    bottom: 0,
    flexDirection: "row",
    // marginTop: 100,
    width:380,
    height:65,
    alignSelf:"center",
    alignItems: "center",
    // backgroundColor: "white",
    // backgroundColor: "rgba(222,49,99,0.5)",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  bottomBar:{
    alignItems: "center",
    marginHorizontal: 32,
    marginBottom: 10,
    // textColor:"white",
  },
})

export default styles 

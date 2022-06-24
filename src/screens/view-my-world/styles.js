import { StyleSheet } from "react-native";
const styles = StyleSheet.create({
  container: {
    // borderTopWidth: 40,
    // borderColor: "black",
    backgroundColor: "#fff",
    flex: 1,
  },
  preview: {
    flex: 1,  
  },
  leftBarContainer:{
    position: "absolute",
    // backgroundColor: "#78646A",
    backgroundColor: "rgba(222,49,99,0.5)",
    flex: 1,
    width:50,
    height: 230,
    marginTop: 290,
    marginLeft: 15,
    alignItems: "center",
    borderRadius:30,
    justifyContent:"space-evenly"
  },
  Text:{
    fontSize: 30,
    color:"white",
  },
})

export default styles 
import { StyleSheet } from "react-native"
const styles = StyleSheet.create({
  container:{
    justifyContent:"center",
    alignItems:"center",
    flex: 1,
  },
  inputContainer:{
    width: "80%",
  },
  input:{
    backgroundColor:"white",
    paddingHorizontal: 15,
    paddingVertical: 15, 
    borderRadius: 10,
    marginTop: 5,

  }, 
  buttonContainer:{
    width: "60%",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 40,
  },
  button:{
    width: "60%",
    backgroundColor:"pink",
    padding: 10,
    borderRadius: 10,
    alignItems: "center"
  },
  buttonText:{
    fontWeight: "500",
    fontSize: 16,
  }
})

export default styles 
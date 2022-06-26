import React, { useState } from 'react'
import { View, Text, TouchableOpacity } from "react-native"
import { auth, db } from '../../firebase'
import { onValue, ref } from 'firebase/database'
import styles from './styles'

export default function Settings({navigation}) {
  const [uname, setUname] = useState('')

  const logoutUser = () => {
    auth.signOut().then(() => {
      navigation.replace('Login')
    })
    .catch(error => alert(error.message))
  }

  
  const reference = ref(db, 'users/' + auth.currentUser?.uid)
  onValue(reference, (snapshot) => {
      const userName = snapshot.val().username
      userName === '' ? setUname("Guest") : setUname(userName)
  },{
      onlyOnce: true
  })
   



  return (
    <View style={styles.container}>
      <Text style={{fontWeight: "600", alignSelf: "center"}}>Hi {uname}, welcome to Settings!</Text>

      <View style={styles.buttonContainer}>
            <TouchableOpacity onPress={logoutUser} style={styles.button}>
                <Text style={styles.buttonText}>Delete Account</Text>
            </TouchableOpacity>
        </View>
    </View>
  )
}
import { View, Text, KeyboardAvoidingView, TouchableOpacity} from 'react-native'
import React, { useEffect, useState } from 'react'
import styles from './styles'
import { TextInput } from 'react-native-gesture-handler'
import { auth, db } from '../../firebase'
import { signInAnonymously } from 'firebase/auth'
import { ref, set } from 'firebase/database'

export default function LoginScreen({navigation}) {
    // const [email, setEmail] = useState('')
    // const [password, setPassword] = useState('')
    const [uname, setUname] = useState('')
    const [isAuthenticated, setIsAuthenticated] = useState(undefined)

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(user => {
            if(user){
                navigation.navigate('HomeScreen')
            }
        })
        return unsubscribe
    }, [])

    const checkTextInput = () => {
        //Check for the Name TextInput
        if (!uname.trim()) {
            alert('Please Enter Username')
        return
        }
        // if(isAuthenticated === false){
        //     alert('Unable to create account')
        // }
        //Checked Successfully
        //Do whatever you want
        registerUser()    
    }

    const registerUser = () => {
        signInAnonymously(auth).then(userCredentials => {
                const user = userCredentials.user
                const reference = ref(db, 'users/' + user.uid)
                set(reference, {
                    username: uname
                })
                // setIsAuthenticated(true)
                console.log("username: " + uname + "user id: " + user.uid)
            })
            .catch(error => alert(error.message))
            // .catch(setIsAuthenticated(false))

      //TODO: Enable edit username in settings, Secure DB rules
        // createUserWithEmailAndPassword(auth, email, password).then(userCredentials => {
        //         const user = userCredentials.user
        //         console.log(user.email)
        //     })
        //     .catch(error => alert(error.message))

    }
    return (
        <KeyboardAvoidingView style={styles.container} behavior="padding">
        <View style={styles.inputContainer}>
            <TextInput 
            placeholder='Username' 
            value={uname} 
            onChangeText={text => setUname(text)} 
            autoCorrect={false}
            style={styles.input}/>
        </View>

        <View style={styles.buttonContainer}>
            <TouchableOpacity onPress={checkTextInput} style={styles.button}>
                {/* !username.trim() ? alert("Please enter a username") :  */}
                <Text style={styles.buttonText}>Join Now</Text>
            </TouchableOpacity>
        </View>
        </KeyboardAvoidingView>
    )
}
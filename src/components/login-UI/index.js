import { View, Text, StyleSheet, Image, Dimensions } from 'react-native'
import React from 'react'
import Animated from 'react-native-reanimated'
import { TapGestureHandler, State } from 'react-native-gesture-handler'
import styles from './styles'

export default class loginUI extends React.Component {
    constructor(){
        super()
        this.state={
            isReady: false
        }
    }
    render(){
        const {width, height} = Dimensions.get("window")
        return (
            <View style={{flex: 1, backgroundColor: 'white', justifyContent: "flex-end"}}>
                <View style={{...StyleSheet.absoluteFill}}>
                    <Image 
                        source={require('../../../assets/bg.jpg')}
                        style={{flex: 1, height: null, width: null}}
                    />
                </View>

                <View style={{height: height / 3 }}>
                    <TapGestureHandler onHandlerStateChange={this.onStateChange}>
                        <View style={styles.button}>
                            <Text style={{fontSize: 20, fontWeight: "bold"}}>Join Now</Text>
                        </View>
                    </TapGestureHandler>
                </View>
        </View>
        )  
    }
}
import { View, Text } from 'react-native'
import React from 'react'
import { TouchableOpacity } from 'react-native-web'
import styles from './styles'

export default function Settings() {
  return (
    <View style={styles.container}>
      <TouchableOpacity>
          <Icon name="settings" size={26} color={"white"} />
      </TouchableOpacity>
    </View>
  )
}
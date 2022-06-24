import {Button, StyleSheet, Text, View, SafeAreaView, Image, TouchableOpacity  } from 'react-native'
import React from 'react'
import Icon from "@expo/vector-icons/Ionicons"
import styles from "./style"

export default function imagePreview(imgSource, sharePicFcn, savePicFcn) {
  return (
     <SafeAreaView style={styles.container}>
        <Image
          style={styles.preview}
          source={{ uri: "data:image/jpg;base64," + photo.base64 }}
        />
        <Button title="Share" />
        {hasMediaLibPermission ? (
          <Button title="Save" onPress={savePic} />
        ) : undefined}
        <Button title="Discard" onPress={() => setPhoto(undefined)} />
      </SafeAreaView>
  )
}
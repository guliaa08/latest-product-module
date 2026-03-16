import { View, Text, ActivityIndicator } from 'react-native'
import React from 'react'
import { StyleSheet } from 'react-native'

const Loader = () => {
  return (
    <View style={styles.container}>
            <ActivityIndicator style={styles.ActivityIndicator} size="large" color="#999999" />
    </View>
  )
}

const styles = StyleSheet.create({
    container:{
        ...StyleSheet.absoluteFill,
        justifyContent:"center",
        alignItems:"center",
    },
    ActivityIndicator:{
     

    }
})

export default Loader
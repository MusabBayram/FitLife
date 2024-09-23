import React from 'react'
import { View, Text, StyleSheet } from 'react-native';

function HomeScreen() {
  return (
    <View style={styles.screen}>
        <Text style={styles.text}>Ana Sayfa</Text>
    </View>
  )
}

const styles = StyleSheet.create({
    screen: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#000',
      color: '#fff'
    },
    text: {
      color: '#fff', 
      fontSize: 18,
    },
  });

export default HomeScreen
import React from 'react'
import { View, Text, StyleSheet } from 'react-native';

function ProfileScreen() {
  return (
    <View style={styles.screen}>
        <Text style={styles.text}>Profil</Text>
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

export default ProfileScreen
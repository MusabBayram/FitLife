import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import firestore from '@react-native-firebase/firestore';

const SettingsScreen = ({ route, navigation }) => {
  const { currentWaterGoal, currentStepGoal, currentSleepGoal } = route.params;
  
  const [waterGoal, setWaterGoal] = useState(currentWaterGoal);
  const [stepGoal, setStepGoal] = useState(currentStepGoal);
  const [sleepGoal, setSleepGoal] = useState(currentSleepGoal);

  const saveGoalsToFirebase = async () => {
    try {
      await firestore().collection('users').doc('userId').set({
        waterGoal,
        stepGoal,
        sleepGoal,
      });
      alert('Hedefler başarıyla kaydedildi!');
      navigation.goBack();
    } catch (error) {
      console.error("Hedefler kaydedilemedi: ", error);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.label}>Su Hedefi (ml)</Text>
      <TextInput
        style={styles.input}
        value={waterGoal.toString()}
        onChangeText={setWaterGoal}
        keyboardType="numeric"
      />

      <Text style={styles.label}>Adım Hedefi</Text>
      <TextInput
        style={styles.input}
        value={stepGoal.toString()}
        onChangeText={setStepGoal}
        keyboardType="numeric"
      />

      <Text style={styles.label}>Uyku Hedefi (saat)</Text>
      <TextInput
        style={styles.input}
        value={sleepGoal.toString()}
        onChangeText={setSleepGoal}
        keyboardType="numeric"
      />

      <TouchableOpacity style={styles.button} onPress={saveGoalsToFirebase}>
        <Text style={styles.buttonText}>Hedefleri Kaydet</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#000',
  },
  label: {
    color: '#FFD700',
    fontSize: 18,
    marginBottom: 5,
  },
  input: {
    backgroundColor: '#333',
    color: '#FFF',
    borderRadius: 8,
    padding: 10,
    marginBottom: 15,
  },
  button: {
    backgroundColor: '#FFD700',
    paddingVertical: 10,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 20,
  },
  buttonText: {
    color: '#000',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default SettingsScreen;
import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Image, ScrollView } from 'react-native';
import ProgressBar from 'react-native-progress/Bar';

const ProfileScreen = () => {
  const [waterGoal, setWaterGoal] = useState(3000); 
  const [waterIntake, setWaterIntake] = useState(1500); 
  const [inputWaterGoal, setInputWaterGoal] = useState(''); 

  const [stepGoal, setStepGoal] = useState(10000); 
  const [currentSteps, setCurrentSteps] = useState(7500); 
  const [inputStepGoal, setInputStepGoal] = useState(''); 

  const [sleepGoal, setSleepGoal] = useState(8); 
  const [currentSleep, setCurrentSleep] = useState(6); 
  const [inputSleepGoal, setInputSleepGoal] = useState(''); 

  // Hedef güncelleme
  const handleGoalUpdate = () => {
    if (inputWaterGoal) setWaterGoal(Number(inputWaterGoal));
    if (inputStepGoal) setStepGoal(Number(inputStepGoal));
    if (inputSleepGoal) setSleepGoal(Number(inputSleepGoal));
    setInputWaterGoal('');
    setInputStepGoal('');
    setInputSleepGoal('');
  };

  const increaseWaterIntake = () => setWaterIntake(prev => Math.min(prev + 250, waterGoal));
  const decreaseWaterIntake = () => setWaterIntake(prev => Math.max(prev - 250, 0));

  const increaseSteps = () => setCurrentSteps(prev => Math.min(prev + 500, stepGoal));
  const decreaseSteps = () => setCurrentSteps(prev => Math.max(prev - 500, 0));

  const increaseSleep = () => setCurrentSleep(prev => Math.min(prev + 1, sleepGoal));
  const decreaseSleep = () => setCurrentSleep(prev => Math.max(prev - 1, 0));

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Image source={{ uri: 'https://i.imgur.com/profile.jpg' }} style={styles.profileImage} />
      <Text style={styles.name}>Musab Bayram</Text>

      {/* Su Tüketimi */}
      <Text style={styles.label}>Su Tüketimi</Text>
      <ProgressBar progress={waterIntake / waterGoal} width={null} color="#FFD700" />
      <Text style={styles.progressText}>{waterIntake}/{waterGoal} ml</Text>
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.adjustButton} onPress={decreaseWaterIntake}>
          <Text style={styles.adjustButtonText}>-250 ml</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.adjustButton} onPress={increaseWaterIntake}>
          <Text style={styles.adjustButtonText}>+250 ml</Text>
        </TouchableOpacity>
      </View>

      {/* Adım Sayısı */}
      <Text style={styles.label}>Adım Sayısı</Text>
      <ProgressBar progress={currentSteps / stepGoal} width={null} color="#FFD700" />
      <Text style={styles.progressText}>{currentSteps}/{stepGoal} adım</Text>
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.adjustButton} onPress={decreaseSteps}>
          <Text style={styles.adjustButtonText}>-500 adım</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.adjustButton} onPress={increaseSteps}>
          <Text style={styles.adjustButtonText}>+500 adım</Text>
        </TouchableOpacity>
      </View>

      {/* Uyku */}
      <Text style={styles.label}>Uyku</Text>
      <ProgressBar progress={currentSleep / sleepGoal} width={null} color="#FFD700" />
      <Text style={styles.progressText}>{currentSleep}/{sleepGoal} saat</Text>
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.adjustButton} onPress={decreaseSleep}>
          <Text style={styles.adjustButtonText}>-1 saat</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.adjustButton} onPress={increaseSleep}>
          <Text style={styles.adjustButtonText}>+1 saat</Text>
        </TouchableOpacity>
      </View>

      {/* Hedef Güncelleme */}
      <Text style={styles.label}>Hedefleri Güncelle</Text>
      <TextInput
        style={styles.input}
        placeholder="Yeni Su Hedefi"
        keyboardType="numeric"
        value={inputWaterGoal}
        onChangeText={(value) => setInputWaterGoal(value)}
      />
      <TextInput
        style={styles.input}
        placeholder="Yeni Adım Hedefi"
        keyboardType="numeric"
        value={inputStepGoal}
        onChangeText={(value) => setInputStepGoal(value)}
      />
      <TextInput
        style={styles.input}
        placeholder="Yeni Uyku Hedefi"
        keyboardType="numeric"
        value={inputSleepGoal}
        onChangeText={(value) => setInputSleepGoal(value)}
      />
      <TouchableOpacity onPress={handleGoalUpdate} style={styles.updateButton}>
        <Text style={styles.buttonText}>Hedefleri Güncelle</Text>
      </TouchableOpacity>

      <Text style={styles.motivationText}>Hadi biraz daha yürüyüş yapalım!</Text>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#000',
    padding: 20,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    alignSelf: 'center',
    marginBottom: 20,
  },
  name: {
    color: '#FFD700',
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  label: {
    color: '#FFD700',
    fontSize: 18,
    marginBottom: 5,
  },
  progressText: {
    color: '#FFF',
    fontSize: 14,
    marginBottom: 15,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  adjustButton: {
    backgroundColor: '#FFD700',
    padding: 10,
    borderRadius: 8,
    width: '45%',
    alignItems: 'center',
  },
  adjustButtonText: {
    color: '#000',
    fontSize: 16,
    fontWeight: 'bold',
  },
  input: {
    backgroundColor: '#333',
    color: '#FFF',
    borderRadius: 8,
    padding: 10,
    marginBottom: 15,
  },
  updateButton: {
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
  motivationText: {
    color: '#FFD700',
    fontSize: 16,
    textAlign: 'center',
    marginTop: 20,
  },
});

export default ProfileScreen;
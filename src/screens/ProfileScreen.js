import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Image, ScrollView, StyleSheet } from 'react-native';
import ProgressBar from 'react-native-progress/Bar';
import firestore from '@react-native-firebase/firestore';

const ProfileScreen = ({ navigation }) => {
  const [waterGoal, setWaterGoal] = useState(3000);
  const [waterIntake, setWaterIntake] = useState(1500);
  const [stepGoal, setStepGoal] = useState(10000);
  const [currentSteps, setCurrentSteps] = useState(7500);
  const [sleepGoal, setSleepGoal] = useState(8);
  const [currentSleep, setCurrentSleep] = useState(6);

  useEffect(() => {
    // Firestore'dan hedefleri yükle
    const loadGoals = async () => {
      try {
        const userDoc = await firestore().collection('users').doc('userId').get();
        if (userDoc.exists) {
          const data = userDoc.data();
          setWaterGoal(data.waterGoal);
          setStepGoal(data.stepGoal);
          setSleepGoal(data.sleepGoal);
        }
      } catch (error) {
        console.error("Hedefler yüklenemedi: ", error);
      }
    };
    loadGoals();
  }, []);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Image source={{ uri: 'https://i.imgur.com/profile.jpg' }} style={styles.profileImage} />
      <Text style={styles.name}>Musab Bayram</Text>

      <Text style={styles.label}>Su Tüketimi</Text>
      <ProgressBar progress={waterIntake / waterGoal} width={null} color="#FFD700" />
      <Text style={styles.progressText}>{waterIntake}/{waterGoal} ml</Text>

      <Text style={styles.label}>Adım Sayısı</Text>
      <ProgressBar progress={currentSteps / stepGoal} width={null} color="#FFD700" />
      <Text style={styles.progressText}>{currentSteps}/{stepGoal} adım</Text>

      <Text style={styles.label}>Uyku</Text>
      <ProgressBar progress={currentSleep / sleepGoal} width={null} color="#FFD700" />
      <Text style={styles.progressText}>{currentSleep}/{sleepGoal} saat</Text>

      <TouchableOpacity 
        style={styles.settingsButton} 
        onPress={() => navigation.navigate('Settings', {
          currentWaterGoal: waterGoal,
          currentStepGoal: stepGoal,
          currentSleepGoal: sleepGoal,
        })}
      >
        <Text style={styles.settingsButtonText}>☰</Text>
      </TouchableOpacity>
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
  settingsButton: {
    position: 'absolute',
    top: 10,
    right: 20,
  },
  settingsButtonText: {
    fontSize: 30,
    color: '#FFD700',
  },
});

export default ProfileScreen;
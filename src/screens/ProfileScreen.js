import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, ProgressBarAndroid, TouchableOpacity, Alert, TextInput } from 'react-native';

const ProfileScreen = () => {
  // Kullanıcının profil bilgileri
  const [user, setUser] = useState({
    name: 'Musab Bayram',
    profilePic: 'https://example.com/profile.jpg',
    waterIntakeGoal: 3000,
    currentWaterIntake: 1500,
    stepGoal: 10000,
    currentSteps: 7500,
    sleepGoal: 8,
    currentSleep: 6,
  });

  // İlerleme oranlarını hesaplama
  const waterProgress = user.currentWaterIntake / user.waterIntakeGoal;
  const stepProgress = user.currentSteps / user.stepGoal;
  const sleepProgress = user.currentSleep / user.sleepGoal;

  // Hedefleri Güncellemek için
  const [newWaterGoal, setNewWaterGoal] = useState(user.waterIntakeGoal.toString());
  const [newStepGoal, setNewStepGoal] = useState(user.stepGoal.toString());

  const updateGoals = () => {
    if (isNaN(newWaterGoal) || isNaN(newStepGoal)) {
      Alert.alert('Geçersiz giriş!', 'Lütfen geçerli bir sayı girin.');
      return;
    }

    setUser(prevState => ({
      ...prevState,
      waterIntakeGoal: parseInt(newWaterGoal),
      stepGoal: parseInt(newStepGoal),
    }));
    Alert.alert('Başarı!', 'Hedefler güncellendi.');
  };

  return (
    <View style={styles.container}>
      {/* Profil Bilgileri */}
      <View style={styles.profileSection}>
        <Image source={{ uri: user.profilePic }} style={styles.profilePic} />
        <Text style={styles.name}>{user.name}</Text>
      </View>

      {/* Günlük Hedefler */}
      <View style={styles.goalSection}>
        <Text style={styles.goalTitle}>Su Tüketimi</Text>
        <ProgressBarAndroid styleAttr="Horizontal" color="#FFD700" progress={waterProgress} />
        <Text style={styles.progressText}>{user.currentWaterIntake}/{user.waterIntakeGoal} ml</Text>

        <Text style={styles.goalTitle}>Adım Sayısı</Text>
        <ProgressBarAndroid styleAttr="Horizontal" color="#FFD700" progress={stepProgress} />
        <Text style={styles.progressText}>{user.currentSteps}/{user.stepGoal} adım</Text>

        <Text style={styles.goalTitle}>Uyku</Text>
        <ProgressBarAndroid styleAttr="Horizontal" color="#FFD700" progress={sleepProgress} />
        <Text style={styles.progressText}>{user.currentSleep}/{user.sleepGoal} saat</Text>
      </View>

      {/* Hedefleri Güncelle */}
      <View style={styles.updateSection}>
        <Text style={styles.goalUpdateText}>Hedefleri Güncelle</Text>
        <TextInput
          style={styles.input}
          value={newWaterGoal}
          onChangeText={setNewWaterGoal}
          keyboardType="numeric"
          placeholder="Yeni Su Hedefi (ml)"
          placeholderTextColor="#999"
        />
        <TextInput
          style={styles.input}
          value={newStepGoal}
          onChangeText={setNewStepGoal}
          keyboardType="numeric"
          placeholder="Yeni Adım Hedefi"
          placeholderTextColor="#999"
        />
        <TouchableOpacity style={styles.updateButton} onPress={updateGoals}>
          <Text style={styles.updateButtonText}>Hedefleri Güncelle</Text>
        </TouchableOpacity>
      </View>

      {/* Motivasyon Mesajı */}
      <Text style={styles.motivation}>
        {user.currentSteps >= user.stepGoal
          ? "Harika! Adım hedefini tamamladın!"
          : "Hadi biraz daha yürüyüş yapalım!"}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    alignItems: 'center',
    padding: 20,
  },
  profileSection: {
    alignItems: 'center',
    marginBottom: 20,
  },
  profilePic: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 10,
  },
  name: {
    color: '#FFD700',
    fontSize: 24,
    fontWeight: 'bold',
  },
  goalSection: {
    width: '100%',
    marginBottom: 20,
  },
  goalTitle: {
    color: '#FFD700',
    fontSize: 18,
    marginVertical: 10,
  },
  progressText: {
    color: '#FFF',
    fontSize: 14,
    marginBottom: 5,
  },
  updateSection: {
    width: '100%',
    marginBottom: 20,
  },
  goalUpdateText: {
    color: '#FFD700',
    fontSize: 18,
    marginVertical: 10,
  },
  input: {
    backgroundColor: '#333',
    color: '#fff',
    padding: 10,
    borderRadius: 8,
    width: '100%',
    marginBottom: 10,
  },
  updateButton: {
    backgroundColor: '#FFD700',
    paddingVertical: 10,
    borderRadius: 8,
    width: '100%',
    alignItems: 'center',
  },
  updateButtonText: {
    color: '#000',
    fontWeight: 'bold',
    fontSize: 16,
  },
  motivation: {
    color: '#FFD700',
    fontSize: 18,
    marginVertical: 20,
    textAlign: 'center',
  },
});

export default ProfileScreen;
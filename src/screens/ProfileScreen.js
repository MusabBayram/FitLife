import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Image, KeyboardAvoidingView, ScrollView } from 'react-native';
import ProgressBar from 'react-native-progress/Bar';
import LottieView from 'lottie-react-native';

const ProfileScreen = () => {
  const [waterGoal, setWaterGoal] = useState(3000); // Su hedefi
  const [waterIntake, setWaterIntake] = useState(1500); // Şu anki su tüketimi
  const [inputWaterGoal, setInputWaterGoal] = useState(''); 
  const [stepGoal, setStepGoal] = useState(10000); // Adım hedefi
  const [currentSteps, setCurrentSteps] = useState(7500); // Şu anki adım sayısı
  const [inputStepGoal, setInputStepGoal] = useState('');
  const [sleepGoal, setSleepGoal] = useState(8); // Uyku hedefi (saat)
  const [currentSleep, setCurrentSleep] = useState(6); // Şu anki uyku (saat)
  const [inputSleepGoal, setInputSleepGoal] = useState(''); 
  const [showConfetti, setShowConfetti] = useState(false);

  // Konfeti animasyonu tetikleme
  useEffect(() => {
    if (waterIntake >= waterGoal || currentSteps >= stepGoal || currentSleep >= sleepGoal) {
      console.log('Animasyon tetikleniyor');

      setShowConfetti(true);
    }
  }, [waterIntake, currentSteps, currentSleep]);

  // Hedef güncelleme işlemi
  const handleGoalUpdate = () => {
    if (inputWaterGoal) setWaterGoal(Number(inputWaterGoal));
    if (inputStepGoal) setStepGoal(Number(inputStepGoal));
    if (inputSleepGoal) setSleepGoal(Number(inputSleepGoal));

    setInputWaterGoal('');
    setInputStepGoal('');
    setInputSleepGoal('');
  };

  return (
    <KeyboardAvoidingView style={styles.container} behavior="padding">
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <Image source={{ uri: 'https://i.imgur.com/profile.jpg' }} style={styles.profileImage} />
        <Text style={styles.name}>Musab Bayram</Text>

        {/* Su Tüketimi */}
        <Text style={styles.label}>Su Tüketimi</Text>
        <ProgressBar progress={waterIntake / waterGoal} width={null} color="#FFD700" />
        <Text style={styles.progressText}>{waterIntake}/{waterGoal} ml</Text>
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.adjustButton} onPress={() => setWaterIntake(waterIntake - 250)}>
            <Text style={styles.adjustButtonText}>-250 ml</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.adjustButton} onPress={() => setWaterIntake(waterIntake + 250)}>
            <Text style={styles.adjustButtonText}>+250 ml</Text>
          </TouchableOpacity>
        </View>

        {/* Adım Sayısı */}
        <Text style={styles.label}>Adım Sayısı</Text>
        <ProgressBar progress={currentSteps / stepGoal} width={null} color="#FFD700" />
        <Text style={styles.progressText}>{currentSteps}/{stepGoal} adım</Text>
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.adjustButton} onPress={() => setCurrentSteps(currentSteps - 500)}>
            <Text style={styles.adjustButtonText}>-500 adım</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.adjustButton} onPress={() => setCurrentSteps(currentSteps + 500)}>
            <Text style={styles.adjustButtonText}>+500 adım</Text>
          </TouchableOpacity>
        </View>

        {/* Uyku */}
        <Text style={styles.label}>Uyku</Text>
        <ProgressBar progress={currentSleep / sleepGoal} width={null} color="#FFD700" />
        <Text style={styles.progressText}>{currentSleep}/{sleepGoal} saat</Text>
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.adjustButton} onPress={() => setCurrentSleep(currentSleep - 1)}>
            <Text style={styles.adjustButtonText}>-1 saat</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.adjustButton} onPress={() => setCurrentSleep(currentSleep + 1)}>
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
          onChangeText={setInputWaterGoal}
        />
        <TextInput
          style={styles.input}
          placeholder="Yeni Adım Hedefi"
          keyboardType="numeric"
          value={inputStepGoal}
          onChangeText={setInputStepGoal}
        />
        <TextInput
          style={styles.input}
          placeholder="Yeni Uyku Hedefi"
          keyboardType="numeric"
          value={inputSleepGoal}
          onChangeText={setInputSleepGoal}
        />
        <TouchableOpacity onPress={handleGoalUpdate} style={styles.updateButton}>
          <Text style={styles.buttonText}>Hedefleri Güncelle</Text>
        </TouchableOpacity>

        {/* Motivasyon Mesajı */}
        <Text style={styles.motivationText}>Hadi biraz daha yürüyüş yapalım!</Text>

        {/* Konfeti Animasyonu */}
        {showConfetti && (
  <LottieView
    source={require('../assets/animations/confetti.json')}
    autoPlay
    loop={false}
    style={{ zIndex: 1 }}
    onAnimationFinish={() => setShowConfetti(false)}
  />
)}
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    padding: 20,
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center',
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
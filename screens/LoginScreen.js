import React, { useRef } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  Animated,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';

const screenWidth = Dimensions.get('window').width;

const LoginScreen = () => {
  const navigation = useNavigation();
  const animatedValue = useRef(new Animated.Value(0)).current; // Animasyon için state

  const navigateToSignUp = () => {
    Animated.timing(animatedValue, {
      toValue: 1, // 1 değerine gitmesini sağla (tam dolu daire)
      duration: 500, // Animasyon süresi
      useNativeDriver: false,
    }).start(() => {
      navigation.navigate('SignUp');
    });
  };

  const resetCircle = () => {
    Animated.timing(animatedValue, {
      toValue: 0, // Orijinal pozisyona dön
      duration: 500,
      useNativeDriver: false,
    }).start();
  };

  // HalfCircle stili animasyonla büyüyecek
  const halfCircleStyle = {
    width: animatedValue.interpolate({
      inputRange: [0, 1],
      outputRange: [screenWidth, screenWidth * 2], // Başlangıçtan tam daireye geçiş
    }),
    height: animatedValue.interpolate({
      inputRange: [0, 1],
      outputRange: [screenWidth, screenWidth * 2], // Yüksekliği ekran genişliğine eşit
    }),
    borderRadius: animatedValue.interpolate({
      inputRange: [0, 1],
      outputRange: [screenWidth, screenWidth * 2], // Tam bir daire oluşturuyoruz
    }),
    backgroundColor: '#FFD700',
    bottom: animatedValue.interpolate({
      inputRange: [0, 1],
      outputRange: [-screenWidth / 2, 0], // Yarım daireyi ekranın altında gösterecek şekilde ayarla
    }),
  };

  return (
    <View style={styles.container}>
      <Text style={styles.logo}>LOGO</Text>
      <Text style={styles.welcomeText}>Welcome User</Text>
      <Text style={styles.signInText}>Sign in to continue</Text>

      <Animated.View style={[styles.halfCircle, halfCircleStyle]} />
      <TouchableOpacity onPress={navigateToSignUp} style={styles.signUpButton}>
        <Text style={styles.signUpText}>Don't have an account? Sign Up</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#000',
  },
  logo: {
    color: '#fff',
    fontSize: 36,
    marginBottom: 20,
  },
  welcomeText: {
    color: '#fff',
    fontSize: 24,
  },
  signInText: {
    color: '#fff',
    fontSize: 16,
    marginBottom: 100,
  },
  halfCircle: {
    position: 'absolute',
    width: screenWidth,
    height: screenWidth, // Yüksekliği ekran genişliğine eşit
    borderRadius: screenWidth, // Tam bir daire oluşturuyoruz
    backgroundColor: '#FFD700', // Sarı yarım daire
    bottom: -screenWidth / 2, // Yarım daireyi ekranın altında gösterecek şekilde ayarlıyoruz
  },
  signUpButton: {
    position: 'absolute',
    bottom: 20,
  },
  signUpText: {
    color: '#fff',
    fontSize: 16,
  },
});

export default LoginScreen;
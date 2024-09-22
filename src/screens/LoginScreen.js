import React, { useRef, useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  Animated,
  TextInput,
} from 'react-native';
import { Svg, Path, Text as SvgText, TextPath } from 'react-native-svg';
import { useNavigation } from '@react-navigation/native';

const screenWidth = Dimensions.get('window').width;

const LoginScreen = () => {
  const navigation = useNavigation(); // Navigasyon kullanımı
  const [showSignUp, setShowSignUp] = useState(false); // Formun görünürlüğünü kontrol etmek için
  const animatedValue = useRef(new Animated.Value(0)).current;
  const fadeAnim = useRef(new Animated.Value(0)).current; // Fade animasyonu

  // SignUp ekranına geçiş animasyonu
  const navigateToSignUp = () => {
    setShowSignUp(true); // Daire genişleyince formu gösteriyoruz
    Animated.timing(animatedValue, {
      toValue: 1, // 1 değerine gitmesini sağla (tam dolu daire)
      duration: 500,
      useNativeDriver: false,
    }).start(() => {
      Animated.timing(fadeAnim, {
        toValue: 1, // Saydamlık 1 olacak (fade-in)
        duration: 500,
        useNativeDriver: true,
      }).start();
    });
  };

  const handleLogin = () => {
    // Giriş yapıldıktan sonra TabView'a geç
    navigation.navigate('Main');
  };

  // Login ekranına geri dönüş animasyonu
  const navigateBackToLogin = () => {
    Animated.timing(fadeAnim, {
      toValue: 0, // Saydamlık 0 olacak (fade-out)
      duration: 500,
      useNativeDriver: true,
    }).start(() => {
      setShowSignUp(false); // Formu gizliyoruz
      Animated.timing(animatedValue, {
        toValue: 0, // Orijinal pozisyona dön
        duration: 500,
        useNativeDriver: false,
      }).start();
    });
  };

  // Yarım daire stili animasyonla büyüyecek
  const halfCircleStyle = {
    width: animatedValue.interpolate({
      inputRange: [0, 1],
      outputRange: [screenWidth, screenWidth * 3], // Yarım daireyi tam daireye büyüt
    }),
    height: animatedValue.interpolate({
      inputRange: [0, 1],
      outputRange: [screenWidth, screenWidth * 2],
    }),
    borderRadius: animatedValue.interpolate({
      inputRange: [0, 1],
      outputRange: [screenWidth, screenWidth * 2],
    }),
    backgroundColor: '#FFD700',
    bottom: animatedValue.interpolate({
      inputRange: [0, 1],
      outputRange: [-screenWidth / 1.3, 0], // Yarım daireyi ekranın altına konumlandır
    }),
  };

  return (
    <View style={styles.container}>
      {/* Eğer showSignUp true ise Signup formunu gösteriyoruz */}
      {showSignUp ? (
        <Animated.View style={{ opacity: fadeAnim, zIndex: 2, width: '100%', justifyContent: 'center',
          alignItems: 'center', }}>
          <Text style={styles.logo}>Sign Up</Text>
          <TextInput
            style={styles.input}
            placeholder="Full Name"
            placeholderTextColor="#999"
          />
          <TextInput
            style={styles.input}
            placeholder="Email"
            placeholderTextColor="#999"
            keyboardType="email-address"
          />
          <TextInput
            style={styles.input}
            placeholder="Password"
            placeholderTextColor="#999"
            secureTextEntry
          />

          <TouchableOpacity style={styles.signUpSubmitButton}>
            <Text style={styles.signUpSubmitButtonText}>Submit</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={navigateBackToLogin} style={styles.goBackButton}>
            <Text style={styles.goBackButtonText}>Go Back to Login</Text>
          </TouchableOpacity>
        </Animated.View>
      ) : (
        <>
          <Text style={styles.logo}>LOGO</Text>
          <Text style={styles.welcomeText}>Welcome User</Text>
          <Text style={styles.signInText}>Sign in to continue</Text>

          {/* Giriş Alanları */}
          <TextInput
            style={styles.input}
            placeholder="Email"
            placeholderTextColor="#999"
            keyboardType="email-address"
          />
          <TextInput
            style={styles.input}
            placeholder="Password"
            placeholderTextColor="#999"
            secureTextEntry
          />

          {/* Login Butonu */}
          <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
            <Text style={styles.loginButtonText}>Login</Text>
          </TouchableOpacity>
        </>
      )}

      {/* Animasyonlu Yarım Daire */}
      <Animated.View style={[styles.halfCircle, halfCircleStyle]}>
        <Svg height={screenWidth / 1.75} width={screenWidth}>
          <Path
            id="path"
            d={`M 0 ${screenWidth / 1.75} A ${screenWidth / 2} ${screenWidth / 2} 0 0 1 ${screenWidth} ${screenWidth / 1.75}`}
            fill="none"
          />
          <SvgText fill="#000" fontSize="16" fontWeight="bold">
            <TextPath
              href="#path"
              startOffset="37%"
              textAnchor="middle"
            >
              Don't have an account?
            </TextPath>
          </SvgText>
        </Svg>
      </Animated.View>

      {!showSignUp && (
        <TouchableOpacity onPress={navigateToSignUp} style={styles.signUpButton}>
          <Text style={styles.signUpText}>Sign Up</Text>
        </TouchableOpacity>
      )}
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
    color: '#000',
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
    marginBottom: 20,
  },
  input: {
    width: '80%',
    height: 50,
    backgroundColor: '#333',
    borderRadius: 8,
    paddingHorizontal: 15,
    marginBottom: 15,
    color: '#fff',
  },
  loginButton: {
    backgroundColor: '#FFD700',
    width: '80%',
    paddingVertical: 15,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  loginButtonText: {
    color: '#000',
    fontSize: 16,
    fontWeight: 'bold',
  },
  halfCircle: {
    position: 'absolute',
    width: screenWidth,
    height: screenWidth, // Yüksekliği ekran genişliğine eşit
    borderRadius: screenWidth, // Tam bir daire oluşturuyoruz
    backgroundColor: '#FFD700', // Sarı yarım daire
    bottom: -screenWidth / 1.3,  // Yarım daireyi biraz daha aşağıda gösterecek şekilde ayarlıyoruz
  },
  signUpButton: {
    position: 'absolute',
    bottom: 20,
  },
  signUpText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  signUpSubmitButton: {
    backgroundColor: '#333',
    paddingVertical: 15,
    width: '80%',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
    marginTop: 20,
  },
  signUpSubmitButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  signUpText: {
    color: '#000',
    fontSize: 16,
    fontWeight: 'bold',
  },
  goBackButton: {
    position: 'absolute',
    bottom: -207, // Butonu ekranın altına konumlandır
    backgroundColor: '#FFD700',
    paddingVertical: 15,
    width: '80%',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
  },
  goBackButtonText: {
    color: '#000',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default LoginScreen;
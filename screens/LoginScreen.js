import React from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Animated,
  Dimensions,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { PanGestureHandler, State } from 'react-native-gesture-handler';

const { height } = Dimensions.get('window');

const LoginScreen = () => {
  const translateY = new Animated.Value(0);

  const onGestureEvent = Animated.event(
    [{ nativeEvent: { translationY: translateY } }],
    { useNativeDriver: true }
  );

  const onHandlerStateChange = event => {
    if (event.nativeEvent.state === State.END) {
      if (event.nativeEvent.translationY < -50) {
        Animated.spring(translateY, {
          toValue: -height,
          useNativeDriver: true,
        }).start();
      } else {
        Animated.spring(translateY, {
          toValue: 0,
          useNativeDriver: true,
        }).start();
      }
    }
  };

  return (
    <PanGestureHandler
      onGestureEvent={onGestureEvent}
      onHandlerStateChange={onHandlerStateChange}
    >
      <Animated.View style={{ flex: 1, transform: [{ translateY }] }}>
        <LinearGradient
          colors={['#000000', '#1a1a1a']}
          style={styles.container}
        >
          <View style={styles.logoContainer}>
            <Text style={styles.logo}>LOGO</Text>
          </View>

          <Text style={styles.welcomeText}>Welcome User</Text>
          <Text style={styles.signInText}>Sign in to continue</Text>

          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              placeholder="Email"
              placeholderTextColor="#888"
              keyboardType="email-address"
            />
            <TextInput
              style={styles.input}
              placeholder="Password"
              placeholderTextColor="#888"
              secureTextEntry
            />
            <TouchableOpacity>
              <Text style={styles.forgotPasswordText}>Forgot password?</Text>
            </TouchableOpacity>
          </View>

          <TouchableOpacity style={styles.signInButton}>
            <Text style={styles.signInButtonText}>SIGN IN</Text>
          </TouchableOpacity>
        </LinearGradient>

        {/* Sign Up Ekranı */}
        <View style={styles.signUpContainer}>
          <Text style={styles.signUpTitle}>Sign Up</Text>
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              placeholder="Full Name"
              placeholderTextColor="#888"
            />
            <TextInput
              style={styles.input}
              placeholder="Email"
              placeholderTextColor="#888"
              keyboardType="email-address"
            />
            <TextInput
              style={styles.input}
              placeholder="Password"
              placeholderTextColor="#888"
              secureTextEntry
            />
          </View>

          <TouchableOpacity style={styles.signUpButton}>
            <Text style={styles.signUpButtonText}>SIGN UP</Text>
          </TouchableOpacity>
        </View>
      </Animated.View>
    </PanGestureHandler>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  logoContainer: {
    marginBottom: 30,
  },
  logo: {
    fontSize: 48,
    color: '#fff',
    fontWeight: 'bold',
  },
  welcomeText: {
    fontSize: 24,
    color: '#fff',
    fontWeight: 'bold',
    marginBottom: 8,
  },
  signInText: {
    fontSize: 16,
    color: '#fff',
    marginBottom: 30,
  },
  inputContainer: {
    width: '100%',
    marginBottom: 20,
  },
  input: {
    backgroundColor: '#333',
    color: '#fff',
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 10,
    marginBottom: 15,
    fontSize: 16,
  },
  forgotPasswordText: {
    color: '#ffcc00',
    textAlign: 'right',
    marginBottom: 30,
  },
  signInButton: {
    backgroundColor: '#ffcc00',
    paddingVertical: 15,
    paddingHorizontal: 100,
    borderRadius: 10,
  },
  signInButtonText: {
    color: '#000',
    fontSize: 18,
    fontWeight: 'bold',
  },
  signUpContainer: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    backgroundColor: '#222',
    padding: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  signUpTitle: {
    fontSize: 24,
    color: '#fff',
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  signUpButton: {
    backgroundColor: '#ffcc00',
    paddingVertical: 15,
    paddingHorizontal: 100,
    borderRadius: 10,
    marginTop: 10,
  },
  signUpButtonText: {
    color: '#000',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default LoginScreen;
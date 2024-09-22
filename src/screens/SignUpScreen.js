import React from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';

const SignUpScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.signUpTitle}>Sign Up</Text>
      <TextInput style={styles.input} placeholder="Full Name" placeholderTextColor="#888" />
      <TextInput style={styles.input} placeholder="Email" placeholderTextColor="#888" />
      <TextInput style={styles.input} placeholder="Password" placeholderTextColor="#888" secureTextEntry />
      <TouchableOpacity style={styles.signUpButton} onPress={() => navigation.navigate('Home')}>
        <Text style={styles.signUpButtonText}>SIGN UP</Text>
      </TouchableOpacity>

      {/* Login Sayfasına Geri Dönüş */}
      <TouchableOpacity onPress={() => navigation.navigate('Login')}>
        <Text style={styles.loginLink}>Already have an account? Login</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#000',
    paddingHorizontal: 20,
  },
  signUpTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 20,
  },
  input: {
    width: '100%',
    height: 50,
    backgroundColor: '#333',
    borderRadius: 10,
    paddingHorizontal: 15,
    color: '#fff',
    marginBottom: 20,
  },
  signUpButton: {
    width: '100%',
    height: 50,
    backgroundColor: '#FFD700',
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
  },
  signUpButtonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
  },
  loginLink: {
    fontSize: 16,
    color: '#FFD700',
    marginTop: 20,
  },
});

export default SignUpScreen;
// src/screens/SplashScreen.tsx
import React from 'react';
import {View, ActivityIndicator, StyleSheet, Text} from 'react-native';

const SplashScreen = () => {
  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" color="#E53E3E" />
      <Text style={styles.text}>Cargando...</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#121212',
  },
  text: {
    marginTop: 10,
    color: '#fff',
    fontSize: 16,
  },
});

export default SplashScreen;

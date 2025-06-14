// src/screens/app/DashboardScreen.tsx
import React from 'react';
import {View, Text, Button, StyleSheet} from 'react-native';
import {useUserAuthContext} from '@/contexts/UserAuthContext';

const DashboardScreen = () => {
  const {user, logout} = useUserAuthContext();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>¡Bienvenido!</Text>
      <Text style={styles.email}>{user?.email}</Text>
      <Button title="Cerrar Sesión" onPress={logout} color="#E53E3E" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#181818',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#fff',
  },
  email: {
    fontSize: 16,
    marginBottom: 20,
    color: '#ccc',
  },
});

export default DashboardScreen;

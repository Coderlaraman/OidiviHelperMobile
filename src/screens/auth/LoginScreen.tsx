// src/screens/auth/LoginScreen.tsx
import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  KeyboardAvoidingView,
  Platform,
  ActivityIndicator,
  Alert,
  Image,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {AuthStackParamList} from '@/navigation/AppNavigator';
import {useUserAuthContext} from '@/contexts/UserAuthContext';
import {useLanguage} from '@/contexts/LanguageProvider';

// Tipamos el hook de navegación para obtener autocompletado
type LoginScreenNavigationProp = StackNavigationProp<
  AuthStackParamList,
  'Login'
>;

const LoginScreen = () => {
  const navigation = useNavigation<LoginScreenNavigationProp>();
  const {t} = useLanguage();
  const {login, isLoading, error} = useUserAuthContext();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    // Validación básica
    if (!email || !password) {
      Alert.alert(t('error.title'), t('error.fillAllFields'));
      return;
    }

    const success = await login({email, password});

    if (!success && error) {
      // El hook ya maneja el estado del error, aquí solo lo mostramos
      Alert.alert(t('error.loginFailed'), error);
    }
    // Si es exitoso, el AppNavigator se encargará de cambiar de pantalla automáticamente.
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardView}>
        <Image
          source={require('@/assets/images/logo-dark.png')}
          style={styles.logo}
        />

        <TextInput
          style={styles.input}
          placeholder={t('auth.login.email')}
          placeholderTextColor="#888"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
        />
        <TextInput
          style={styles.input}
          placeholder={t('auth.login.password')}
          placeholderTextColor="#888"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />

        <TouchableOpacity
          style={styles.button}
          onPress={handleLogin}
          disabled={isLoading}>
          {isLoading ? (
            <ActivityIndicator color="#FFFFFF" />
          ) : (
            <Text style={styles.buttonText}>{t('auth.login.signIn')}</Text>
          )}
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate('Register')}>
          <Text style={styles.linkText}>
            {t('auth.login.noAccount')} {t('auth.login.createAccount')}
          </Text>
        </TouchableOpacity>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: '#121212'},
  keyboardView: {flex: 1, justifyContent: 'center', paddingHorizontal: 24},
  logo: {
    width: 200,
    height: 100,
    resizeMode: 'contain',
    alignSelf: 'center',
    marginBottom: 40,
  },
  input: {
    height: 50,
    backgroundColor: '#282828',
    borderRadius: 8,
    paddingHorizontal: 16,
    color: '#FFFFFF',
    marginBottom: 16,
    fontSize: 16,
  },
  button: {
    backgroundColor: '#E53E3E',
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 10,
  },
  buttonText: {color: '#FFFFFF', fontWeight: 'bold', fontSize: 16},
  linkText: {color: '#E53E3E', textAlign: 'center', marginTop: 20},
});

export default LoginScreen;

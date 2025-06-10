import React, {useState} from 'react';
import {View, TextInput} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {useUserAuthContext} from '../../contexts/UserAuthProvider';
import {Button} from '../../components/ui/Button';

export default function LoginScreen() {
  const navigation = useNavigation();
  const {login, isLoading} = useUserAuthContext(); // Obtenemos la función login del contexto
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    const success = await login({email, password});

    // AQUÍ vive la lógica de navegación
    if (success) {
      // No necesitamos navegar. El AppNavigator cambiará de stack automáticamente.
      // Si quisiéramos forzar una navegación a una pantalla específica del AppStack:
      // navigation.navigate('Dashboard');
      console.log('Login exitoso. El navegador se encargará.');
    } else {
      // El error se mostrará a través de un estado en el hook `useUserAuth`
      // y se puede mostrar en la UI.
      alert('Login fallido. Revisa tus credenciales.');
    }
  };

  return (
    <View>
      {/* ...tus inputs para email y password... */}
      <TextInput
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      <TextInput
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <Button
        label="Login"
        onPress={handleLogin}
        isLoading={isLoading} // El botón mostrará un spinner automáticamente
      />
    </View>
  );
}
function alert(arg0: string) {
  throw new Error('Function not implemented.');
}

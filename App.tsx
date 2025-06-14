// App.tsx (el archivo raíz de tu proyecto)
import React from 'react';
import {UserAuthProvider} from './src/contexts/UserAuthContext';
import {LanguageProvider} from './src/contexts/LanguageProvider';
import {AppNavigator} from './src/navigation/AppNavigator';

const App = () => {
  return (
    <LanguageProvider>
      <UserAuthProvider>
        <AppNavigator />
      </UserAuthProvider>
    </LanguageProvider>
  );
};

export default App;

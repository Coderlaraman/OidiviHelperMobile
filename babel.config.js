module.exports = {
  presets: ['module:@react-native/babel-preset', 'nativewind/babel'],
  plugins: [
    [
      'module:react-native-dotenv',
      {
        moduleName: '@env',
        path: '.env',
      },
    ],
    [
      'module-resolver', // Este es el nombre del plugin que acabas de instalar
      {
        root: ['./src'],
        extensions: ['.ios.js', '.android.js', '.js', '.ts', '.tsx', '.json'],
        alias: {
          // Aquí defines tus alias. '@' es una convención común.
          '@': './src',
          // También puedes definir alias más específicos
          '@/components': './src/components',
          '@/screens': './src/screens',
          '@/contexts': './src/contexts',
          '@/hooks': './src/hooks',
          '@/lib': './src/lib',
          '@/navigation': './src/navigation',
        },
      },
    ],
    // Aquí pueden ir otros plugins que uses, como react-native-dotenv
    [
      'module:react-native-dotenv',
      {
        /* ... tu config de dotenv ... */
      },
    ],
  ],
};

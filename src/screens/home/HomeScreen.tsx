// src/screens/home/HomeScreen.tsx

import React from 'react';
import {
  ScrollView,
  View,
  Text,
  ImageBackground,
  ActivityIndicator,
  StatusBar,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {MotiView, MotiText} from 'moti';
import {Search, Shield, Users, Clock, Star} from 'lucide-react-native';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';

// Nuestros hooks y componentes personalizados
import {useLanguage} from '../../contexts/LanguageProvider';
import {useUserAuthContext} from '../../contexts/UserAuthProvider';
import {useTheme} from '../../contexts/ThemeProvider';
import {PublicNavbar} from '../../components/navigation/PublicNavbar';
import {Card} from '../../components/ui/Card';
import {Button} from '../../components/ui/Button';

// Tipos para la navegación
// Asegúrate de tener este archivo y su contenido como te indiqué antes.
import {RootStackParamList} from '../../navigation/AppNavigator';

// Un componente pequeño para renderizar estrellas de calificación
const RatingStars = ({rating, size = 16}: {rating: number; size?: number}) => (
  <View className="flex-row gap-x-1">
    {[...Array(5)].map((_, i) => (
      <Star
        key={i}
        size={size}
        className={
          i < rating
            ? 'text-red-600 dark:text-red-400'
            : 'text-neutral-300 dark:text-neutral-600'
        }
        fill={i < rating ? '#DC2626' : 'transparent'}
      />
    ))}
  </View>
);

export default function HomeScreen() {
  const {t} = useLanguage();
  const {theme} = useTheme();
  const {user, isInitialized} = useUserAuthContext();
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  // Datos para las secciones, directamente desde tu implementación web
  const features = [
    {
      icon: Shield,
      title: t('home.feature.verifiedHelpers.title'),
      description: t('home.feature.verifiedHelpers.description'),
    },
    {
      icon: Users,
      title: t('home.feature.largeCommunity.title'),
      description: t('home.feature.largeCommunity.description'),
    },
    {
      icon: Clock,
      title: t('home.feature.quickResponse.title'),
      description: t('home.feature.quickResponse.description'),
    },
    {
      icon: Search,
      title: t('home.feature.easyToUse.title'),
      description: t('home.feature.easyToUse.description'),
    },
  ];

  const testimonials = [
    {
      name: 'Sarah Johnson',
      role: 'Client',
      content: t('home.testimonials.client1'),
      rating: 5,
    },
    // Agrega más testimonios si lo deseas
  ];

  // Pantalla de carga mientras se verifica la autenticación
  if (!isInitialized) {
    return (
      <View className="flex-1 items-center justify-center bg-neutral-100 dark:bg-neutral-900">
        <ActivityIndicator size="large" color="#F9322C" />
      </View>
    );
  }

  return (
    <SafeAreaView className="flex-1 bg-neutral-100 dark:bg-neutral-950">
      <StatusBar
        barStyle={theme === 'dark' ? 'light-content' : 'dark-content'}
      />
      <PublicNavbar />

      <ScrollView contentContainerStyle={{flexGrow: 1}}>
        {/* === Hero Section === */}
        <ImageBackground
          source={{
            uri: 'https://images.unsplash.com/photo-1521737711867-e3b97375f902?ixlib=rb-1.2.1&auto=format&fit=crop&w=1920&q=80',
          }}
          className="h-[60vh] justify-center items-center">
          <View className="absolute inset-0 bg-black/70" />
          <MotiView
            from={{opacity: 0}}
            animate={{opacity: 1}}
            transition={{type: 'timing', duration: 500}}
            className="p-4 items-center">
            <MotiText
              from={{opacity: 0, translateY: 20}}
              animate={{opacity: 1, translateY: 0}}
              transition={{type: 'timing', duration: 600}}
              className="text-4xl font-bold text-white text-center leading-tight">
              {t('home.title')}
            </MotiText>
            <MotiText
              from={{opacity: 0, translateY: 20}}
              animate={{opacity: 1, translateY: 0}}
              transition={{type: 'timing', duration: 600, delay: 200}}
              className="text-lg text-gray-200 text-center mt-6 max-w-md">
              {t('home.subtitle')}
            </MotiText>
          </MotiView>
        </ImageBackground>

        {/* === Features Section === */}
        <View className="py-16 px-4 bg-white dark:bg-neutral-900">
          <Text className="text-3xl font-bold text-center mb-12 text-neutral-800 dark:text-white">
            {t('home.features')}
          </Text>
          <View className="gap-y-8">
            {features.map((feature, index) => (
              <MotiView
                key={index}
                from={{opacity: 0, translateY: 20}}
                animate={{opacity: 1, translateY: 0}}
                transition={{
                  type: 'timing',
                  duration: 500,
                  delay: index * 100,
                }}>
                <Card className="p-6">
                  <View className="flex-row items-start gap-x-4">
                    <feature.icon
                      className="text-red-600 dark:text-red-400 mt-1"
                      size={32}
                    />
                    <View className="flex-1">
                      <Text className="text-xl font-semibold mb-2 text-neutral-800 dark:text-white">
                        {feature.title}
                      </Text>
                      <Text className="text-base leading-6 text-neutral-600 dark:text-neutral-300">
                        {feature.description}
                      </Text>
                    </View>
                  </View>
                </Card>
              </MotiView>
            ))}
          </View>
        </View>

        {/* === Testimonials Section === */}
        <View className="py-16 px-4 bg-neutral-50 dark:bg-neutral-800">
          <Text className="text-3xl font-bold text-center mb-12 text-neutral-800 dark:text-white">
            {t('home.testimonials.title')}
          </Text>
          <View className="gap-y-8">
            {testimonials.map((item, index) => (
              <MotiView
                key={index}
                from={{opacity: 0, scale: 0.95}}
                animate={{opacity: 1, scale: 1}}
                transition={{
                  type: 'timing',
                  duration: 500,
                  delay: index * 100,
                }}>
                <Card className="p-6">
                  <RatingStars rating={item.rating} />
                  <Text className="my-4 text-base italic text-neutral-600 dark:text-neutral-300">
                    "{item.content}"
                  </Text>
                  <Text className="font-bold text-right text-neutral-800 dark:text-white">
                    - {item.name}, {item.role}
                  </Text>
                </Card>
              </MotiView>
            ))}
          </View>
        </View>

        {/* === Final CTA Section === */}
        <View className="py-20 px-4 items-center bg-white dark:bg-neutral-900">
          <Text className="text-3xl font-bold mb-6 text-neutral-800 dark:text-white text-center">
            {t('home.cta.title')}
          </Text>
          <Text className="text-lg text-neutral-600 dark:text-neutral-300 mb-8 max-w-sm text-center">
            {t('home.cta.description')}
          </Text>
          {user ? (
            <Button
              label={t('home.cta.goToDashboard')}
              onPress={() => navigation.navigate('Dashboard' as never)}
              className="bg-red-600 w-full"
            />
          ) : (
            <Button
              label={t('home.cta.button')}
              onPress={() => navigation.navigate('Register' as never)}
              className="bg-red-600 w-full"
            />
          )}
        </View>

        {/* === Footer (opcional) === */}
        <View className="py-8 px-4 items-center border-t border-neutral-200 dark:border-neutral-700 bg-neutral-100 dark:bg-neutral-950">
          <Text className="text-neutral-500 dark:text-neutral-400">
            © {new Date().getFullYear()} OiDiVi Helper.{' '}
            {t('common.rightsReserved')}
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

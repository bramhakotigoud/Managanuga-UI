import React, {useEffect} from 'react';
import notifee, {
  AndroidImportance,
} from '@notifee/react-native';
import {
  getMessaging,
  onMessage,
} from '@react-native-firebase/messaging';
import {
  AuthProvider,
  useAuth,
} from './src/context/AuthContext';

import AppNavigator from './src/navigation/AppNavigator';
import {CartProvider} from './src/context/CartContext';
import Config from 'react-native-config';

function NotificationSetup() {
  const {user} = useAuth();
useEffect(() => {
  const messaging = getMessaging();

  const unsubscribe = onMessage(
    messaging,
    async remoteMessage => {
      console.log(
        '🔥 FOREGROUND FCM:',
        remoteMessage,
      );

      const title =
        remoteMessage.notification?.title ||
        'Mana Ganuga';

      const body =
        remoteMessage.notification?.body ||
        '';

      console.log('🔔 Showing foreground notification:', {
        title,
        body,
      });

      await notifee.requestPermission();

      await notifee.displayNotification({
        title,
        body,
        ios: {
          sound: 'default',
        },
      });
    },
  );

  return unsubscribe;
}, []);

  useEffect(() => {
    const setupNotifications = async () => {
      try {
        console.log('1️⃣ Firebase messaging started');

        if (!user?.id) {
          console.log('⏳ No logged-in user yet. Waiting...');
          return;
        }

        console.log('👤 Logged-in user ID:', user.id);

        const messaging = getMessaging();

        console.log('2️⃣ messaging() created');

        await messaging.registerDeviceForRemoteMessages();

        console.log('6️⃣ Device registered for remote messages');

        const authStatus = await messaging.requestPermission();

        console.log('7️⃣ Notification permission:', authStatus);

        const token = await messaging.getToken();

        console.log('8️⃣ 🔥 FCM TOKEN:', token);

        if (!token) {
          console.log('❌ No FCM token received');
          return;
        }

        const response = await fetch(
          `${Config.API_BASE_URL}/auth/fcm-token`,
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              userId: user.id,
              fcmToken: token,
            }),
          },
        );

        const result = await response.json();

        console.log('9️⃣ FCM token backend response:', result);

        if (!response.ok) {
          throw new Error(
            result?.message || 'Failed to save FCM token',
          );
        }

        console.log('✅ FCM TOKEN SAVED TO BACKEND');
      } catch (error) {
        console.error(
          '❌ Notification setup failed:',
          error,
        );
      }
    };

    setupNotifications();
  }, [user?.id]);

  return null;
}

export default function App() {
  return (
    <AuthProvider>
      <NotificationSetup />

      <CartProvider>
        <AppNavigator />
      </CartProvider>
    </AuthProvider>
  );
}
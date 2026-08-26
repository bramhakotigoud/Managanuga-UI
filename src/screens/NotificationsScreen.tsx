import React, {useCallback, useState} from 'react';
import styles from '../styles/NotificationsScreen.styles';
import {
  ActivityIndicator,
  FlatList,
  Image,
  RefreshControl,
  SafeAreaView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import {
  useFocusEffect,
  useNavigation,
} from '@react-navigation/native';
import {
  Bell,
  ShoppingCart,
  CircleChevronLeft,
} from 'lucide-react-native';

import {useAuth} from '../context/AuthContext';
import {useCart} from '../context/CartContext';

import {
  getNotifications,
  markAllNotificationsAsRead,
} from '../services/notificationService';

interface NotificationItem {
  id: number;
  user_id: number;
  title: string;
  message: string;
  type: string;
  reference_id: number | null;
  is_read: boolean;
  created_at: string;
}

export default function NotificationsScreen() {
  const navigation = useNavigation();
  const {user} = useAuth();
  const {cartItems} = useCart();

  const [notifications, setNotifications] = useState<
    NotificationItem[]
  >([]);

  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  // =====================================================
  // CART COUNT
  // =====================================================

  const cartCount = cartItems.reduce(
    (total: number, item: any) =>
      total + Number(item.quantity || 1),
    0,
  );

  // =====================================================
  // LOAD NOTIFICATIONS
  // =====================================================

  const loadNotifications = async () => {
    if (!user?.id) {
      setLoading(false);
      return;
    }

    try {
      const response = await getNotifications(user.id);

      if (response.success) {
        setNotifications(response.notifications || []);
      }
    } catch (error) {
      console.error(
        'Load Notifications Error:',
        error,
      );
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  // =====================================================
  // WHEN NOTIFICATION SCREEN OPENS
  // MARK ALL AS READ
  // =====================================================

  useFocusEffect(
    useCallback(() => {
      const openNotifications = async () => {
        if (!user?.id) {
          setLoading(false);
          return;
        }

        try {
          // First load notifications
          await loadNotifications();

          // Opening notification screen means
          // user has seen the notifications.
          await markAllNotificationsAsRead(user.id);

          // Update local state
          setNotifications(current =>
            current.map(item => ({
              ...item,
              is_read: true,
            })),
          );
        } catch (error) {
          console.error(
            'Notification Read Error:',
            error,
          );
        }
      };

      openNotifications();
    }, [user?.id]),
  );

  // =====================================================
  // REFRESH
  // =====================================================

  const handleRefresh = async () => {
    setRefreshing(true);

    await loadNotifications();

    // Since user is already on this screen,
    // refreshed notifications are also considered read.
    if (user?.id) {
      try {
        await markAllNotificationsAsRead(user.id);

        setNotifications(current =>
          current.map(item => ({
            ...item,
            is_read: true,
          })),
        );
      } catch (error) {
        console.error(
          'Refresh Notification Read Error:',
          error,
        );
      }
    }

    setRefreshing(false);
  };

  // =====================================================
  // NOTIFICATION ICON
  // =====================================================

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'PAYMENT_SUCCESS':
        return '💳';

      case 'ORDER_PLACED':
        return '📦';

      case 'MEMBERSHIP_ACTIVATED':
        return '⭐';

      case 'ORDER_SHIPPED':
        return '🚚';

      case 'OUT_FOR_DELIVERY':
        return '🛵';

      case 'ORDER_DELIVERED':
        return '✅';

      case 'ORDER_CANCELLED':
        return '❌';

      case 'REFUND_PROCESSED':
        return '💰';

      default:
        return '🔔';
    }
  };

  // =====================================================
  // DATE FORMAT
  // =====================================================

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);

    return date.toLocaleString([], {
      day: 'numeric',
      month: 'short',
      hour: 'numeric',
      minute: '2-digit',
    });
  };

  // =====================================================
  // NOTIFICATION ITEM
  // =====================================================

  const renderNotification = ({
    item,
  }: {
    item: NotificationItem;
  }) => {
    return (
      <View style={styles.notificationCard}>
        {/* ICON */}

        <View style={styles.iconContainer}>
          <Text style={styles.icon}>
            {getNotificationIcon(item.type)}
          </Text>
        </View>

        {/* CONTENT */}

        <View style={styles.content}>
          <Text style={styles.title}>
            {item.title}
          </Text>

          <Text style={styles.message}>
            {item.message}
          </Text>

          <Text style={styles.date}>
            {formatDate(item.created_at)}
          </Text>
        </View>
      </View>
    );
  };

  // =====================================================
  // LOADING
  // =====================================================

  if (loading) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.center}>
          <ActivityIndicator
            size="large"
            color="#A84B21"
          />

          <Text style={styles.loadingText}>
            Loading notifications...
          </Text>
        </View>
      </SafeAreaView>
    );
  }

  // =====================================================
  // MAIN SCREEN
  // =====================================================

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
              <TouchableOpacity
                onPress={() => navigation.goBack()}
                hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}>
                  <CircleChevronLeft 
                    size={24}
                    color="#000000"
                    strokeWidth={2}
                    />
              </TouchableOpacity>
      
              <View style={styles.brandContainer}>
                <Image
                  source={require('../assets/images/logo.png')}
                  style={styles.logo}
                />
                <View style={styles.brandTextContainer}>
                  <Text style={styles.brandTitle}>Mana Ganuga</Text>
                  <Text style={styles.brandSubtitle}>Pure Tradition • Healthy Future</Text>
                </View>
              </View>
      
              <View style={styles.headerRightPlaceholder} />
            </View>
      

      

      {/* =================================================
          NOTIFICATION LIST
          ================================================= */}

      {notifications.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyIcon}>
            🔔
          </Text>

          <Text style={styles.emptyTitle}>
            No notifications
          </Text>

          <Text style={styles.emptyMessage}>
            You're all caught up!
          </Text>
        </View>
      ) : (
        <FlatList
          data={notifications}
          keyExtractor={item =>
            item.id.toString()
          }
          renderItem={renderNotification}
          contentContainerStyle={styles.list}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={handleRefresh}
              tintColor="#A84B21"
            />
          }
          showsVerticalScrollIndicator={false}
        />
      )}
    </SafeAreaView>
  );
}

// =====================================================
// STYLES
// =====================================================


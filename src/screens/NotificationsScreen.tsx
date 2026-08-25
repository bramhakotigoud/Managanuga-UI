import React, {useCallback, useState} from 'react';
import {
  ActivityIndicator,
  FlatList,
  Image,
  RefreshControl,
  SafeAreaView,
  StyleSheet,
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F4EC',
  },

  // ===================================================
  // HEADER
  // ===================================================

  header: {
    backgroundColor: '#F8F4EC',
    paddingHorizontal: 16,
    paddingVertical: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    zIndex: 10,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
  },

  logoSection: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },

  logo: {
    width: 42,
    height: 42,
    resizeMode: 'contain',
    marginRight: 8,
  },

  appName: {
    fontSize: 20,
    fontWeight: '700',
    color: '#2D341F',
  },

  tagline: {
    marginTop: 1,
    fontSize: 9,
    color: '#8A8A8A',
    letterSpacing: 0.2,
  },

  headerRightActions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },

  iconButton: {
    width: 42,
    height: 42,
    alignItems: 'center',
    justifyContent: 'center',
  },

  cartIconWrapper: {
    width: 42,
    height: 42,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },

  headerIconText: {
    fontSize: 24,
  },

  // ===================================================
  // BADGE
  // ===================================================

  badgeContainer: {
    position: 'absolute',

    top: -2,
    right: -2,

    minWidth: 19,
    height: 19,

    borderRadius: 10,

    backgroundColor: '#A84B21',

    alignItems: 'center',
    justifyContent: 'center',

    paddingHorizontal: 4,

    borderWidth: 1.5,
    borderColor: '#FFFFFF',
  },

  badgeText: {
    color: '#FFFFFF',
    fontSize: 10,
    fontWeight: '800',
    textAlign: 'center',
  },

  // ===================================================
  // LIST
  // ===================================================

  list: {
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 30,
  },

  notificationCard: {
    flexDirection: 'row',

    backgroundColor: '#FFFFFF',

    borderRadius: 16,

    padding: 15,

    marginBottom: 12,

    borderWidth: 1,
    borderColor: '#EEEEEE',
  },

  iconContainer: {
    width: 46,
    height: 46,

    borderRadius: 23,

    backgroundColor: '#F4EBDD',

    alignItems: 'center',
    justifyContent: 'center',

    marginRight: 12,
  },

  icon: {
    fontSize: 22,
  },

  content: {
    flex: 1,
  },

  title: {
    fontSize: 16,
    fontWeight: '700',
    color: '#333333',
  },

  message: {
    marginTop: 5,

    fontSize: 14,
    lineHeight: 20,

    color: '#666666',
  },

  date: {
    marginTop: 7,

    fontSize: 11,

    color: '#999999',
  },

  // ===================================================
  // LOADING
  // ===================================================

  center: {
    flex: 1,

    alignItems: 'center',
    justifyContent: 'center',

    backgroundColor: '#F8F4EC',
  },

  loadingText: {
    marginTop: 10,
    color: '#777777',
  },

  // ===================================================
  // EMPTY
  // ===================================================

  emptyContainer: {
    flex: 1,

    alignItems: 'center',
    justifyContent: 'center',

    paddingBottom: 100,
  },

  emptyIcon: {
    fontSize: 55,
    marginBottom: 15,
  },

  emptyTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#2D341F',
  },

  emptyMessage: {
    marginTop: 6,
    fontSize: 14,
    color: '#777777',
  },
  brandTextContainer: {
    justifyContent: 'center',
  },
  brandTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#2D341F',
  },
  brandSubtitle: {
    fontSize: 9,
    color: '#8C8C8C',
    fontWeight: '500',
  },
  headerRightPlaceholder: {
    width: 36,
  },
   brandContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});
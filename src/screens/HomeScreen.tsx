import React, { useCallback, useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  Dimensions,
  Share,
  Animated,
} from 'react-native';
import { Search } from 'lucide-react-native';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import ProductCard from '../components/ProductCard';
import { useCart } from '../context/CartContext';
import { useFocusEffect } from '@react-navigation/native';
import { useAuth } from '../context/AuthContext';
import { getUnreadCount } from '../services/notificationService';
// Get screen width dynamically (Subtract 30 to account for container padding: 15 left + 15 right)
const { width: SCREEN_WIDTH } = Dimensions.get('window');
const BANNER_WIDTH = SCREEN_WIDTH - 30;

// Header Cart Button Sub-component
export const HeaderCartButton = () => {
  const navigation = useNavigation();
  const { cartItems } = useCart();

  const cartCount = cartItems.reduce(
    (total: number, item: any) => total + (item.quantity || item.qty || 1),
    0
  );

  return (
    <TouchableOpacity
      style={styles.cartIconContainer}
      onPress={() => navigation.navigate('Cart' as never)}>
      <Text style={styles.icon}>🛒</Text>
      {cartCount > 0 && (
        <View style={styles.cartBadge}>
          <Text style={styles.cartBadgeText}>
            {cartCount > 99 ? '99+' : cartCount}
          </Text>
        </View>
      )}
    </TouchableOpacity>
  );
};

// Main HomeScreen component
const HomeScreen = () => {
  const navigation = useNavigation();
  const {user} = useAuth();
  const [unreadNotificationCount, setUnreadNotificationCount] =
  useState(0);
  const [defaultAddress, setDefaultAddress] = useState<any>(null);
  const [activeBanner, setActiveBanner] = useState(0);
  // Animation state for continuous pulsing effect
  // Animation value tracking translation on X-axis
  const slideAnim = React.useRef(new Animated.Value(150)).current; // Starts 150px off-screen to the right
useFocusEffect(
  useCallback(() => {
    const loadUnreadCount = async () => {
      if (!user?.id) {
        setUnreadNotificationCount(0);
        return;
      }

      try {
        const response = await getUnreadCount(user.id);

        if (response.success) {
          setUnreadNotificationCount(response.count || 0);
        }
      } catch (error) {
        console.error('Unread Notification Error:', error);
      }
    };

    loadUnreadCount();
  }, [user?.id]),
);
  useEffect(() => {
    // Loop: Slide in from right -> Pause -> Slide out to right -> Pause 2s
    const slideAnimation = Animated.loop(
      Animated.sequence([
        Animated.timing(slideAnim, {
          toValue: 0, // Slide onto the screen
          duration: 400,
          useNativeDriver: true,
        }),
        Animated.delay(2000), // Stay visible for 2 seconds
        Animated.timing(slideAnim, {
          toValue: 150, // Slide back off-screen
          duration: 400,
          useNativeDriver: true,
        }),
        Animated.delay(1000), // Wait 1 second before coming back
      ])
    );

    slideAnimation.start();

    return () => slideAnimation.stop();
  }, [slideAnim]);

  const featuredProducts = [
    {
      id: 1,
      name: 'Sunflower Oil',
      price: 299,
      rating: 4.8,
      image: require('../assets/images/sunflower.png'),
    },
    {
      id: 2,
      name: 'Groundnut Oil',
      price: 349,
      rating: 4.9,
      image: require('../assets/images/groundnut.png'),
    },
    {
      id: 3,
      name: 'Coconut Oil',
      price: 399,
      rating: 4.9,
      image: require('../assets/images/coconut.png'),
    },
    {
      id: 4,
      name: 'Sesame Oil',
      price: 329,
      rating: 4.8,
      image: require('../assets/images/sesame.png'),
    },
  ];
  const handleShareReferral = async () => {
    try {
      await Share.share({
        message:
          'Try 100% pure wood-pressed oils from Mana Ganuga! Download the app here: https://managanuga.com/download?ref=USER123',
      });
    } catch (error: any) {
      console.error(error.message);
    }
  };

  useEffect(() => {
    loadAddress();
  }, []);

  const loadAddress = async () => {
    const data = await AsyncStorage.getItem('addresses');
    if (data) {
      const addresses = JSON.parse(data);
      const address = addresses.find((item: any) => item.isDefault);
      setDefaultAddress(address);
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      {/* FIXED TOP HEADER */}
      <View style={styles.header}>
        <View style={styles.brandSection}>
          <Image
            source={require('../assets/images/logo.png')}
            style={styles.logo}
          />
          <View>
            <Text style={styles.logoText}>Mana Ganuga</Text>
            <Text style={styles.tagline}>
              Pure Tradition • Healthy Future
            </Text>
          </View>
        </View>

        <View style={styles.headerIcons}>
          <TouchableOpacity
  onPress={() => navigation.navigate('Subscription' as never)}>
  <Image
    source={require('../assets/images/membership_wallet.png')}
    style={styles.membershipIcon}
  />
</TouchableOpacity>

         <TouchableOpacity
  onPress={() => navigation.navigate('Notifications' as never)}
  style={styles.notificationButton}>
  
  <Text style={styles.icon}>🔔</Text>

  {unreadNotificationCount > 0 && (
    <View style={styles.notificationBadge}>
      <Text style={styles.notificationBadgeText}>
        {unreadNotificationCount > 99
          ? '99+'
          : unreadNotificationCount}
      </Text>
    </View>
  )}
</TouchableOpacity>

          {/* Cart Icon with Live Badge */}
          <HeaderCartButton />
        </View>
      </View>

      {/* SCROLLABLE CONTENT */}
      <ScrollView
        style={styles.container}
        showsVerticalScrollIndicator={false}>

        

        {/* Search */}
        <View style={styles.searchContainer}>
  <Search
    size={20}
    color="#777"
    strokeWidth={2}
  />

  <TextInput
    placeholder="Search oils"
    placeholderTextColor="#777"
    style={styles.searchInput}
  />

  <Text style={styles.searchEmoji}>🛒</Text>
</View>

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.topCategoryContainer}>
          <TouchableOpacity style={styles.topCategoryItem}>
            <Text style={styles.topCategoryIcon}>🛍️</Text>
            <Text style={styles.activeCategoryText}>For You</Text>
            <View style={styles.activeCategoryLine} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.topCategoryItem}>
            <Text style={styles.topCategoryIcon}>🔥</Text>
            <Text style={styles.categoryLabel}>Trending</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.topCategoryItem}>
            <Text style={styles.topCategoryIcon}>⭐</Text>
            <Text style={styles.categoryLabel}>Best Sellers</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.topCategoryItem}>
            <Text style={styles.topCategoryIcon}>🆕</Text>
            <Text style={styles.categoryLabel}>New Arrivals</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.topCategoryItem}>
            <Text style={styles.topCategoryIcon}>💎</Text>
            <Text style={styles.categoryLabel}>Premium</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.topCategoryItem}>
            <Text style={styles.topCategoryIcon}>🎁</Text>
            <Text style={styles.categoryLabel}>Combo</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.topCategoryItem}>
            <Text style={styles.topCategoryIcon}>☰</Text>
            <Text style={styles.categoryLabel}>More</Text>
          </TouchableOpacity>
        </ScrollView>

        {/* BANNER CAROUSEL (RESPONSIVE & CLEAN SINGLE SNAP) */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          snapToInterval={BANNER_WIDTH}
          snapToAlignment="center"
          decelerationRate="fast"
          onMomentumScrollEnd={(event) => {
            const index = Math.round(
              event.nativeEvent.contentOffset.x / BANNER_WIDTH
            );
            setActiveBanner(index);
          }}>
          <Image
            source={require('../assets/images/banner.jpeg')}
            style={styles.heroBanner}
          />
          <Image
            source={require('../assets/images/banner2.jpeg')}
            style={styles.heroBanner}
          />
          <Image
            source={require('../assets/images/banner3.jpeg')}
            style={styles.heroBanner}
          />
          <Image
            source={require('../assets/images/banner4.jpeg')}
            style={styles.heroBanner}
          />
        </ScrollView>

        <View style={styles.dotContainer}>
          {[0, 1, 2, 3].map((index) => (
            <View
              key={index}
              style={[
                styles.dot,
                activeBanner === index && styles.activeDot,
              ]}
            />
          ))}
        </View>

        
        
        {/* Categories */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.categoryContainer}>
          <TouchableOpacity
            style={styles.category}
            onPress={() =>
              navigation.navigate('Products' as never, { category: 'Sunflower' } as never)
            }>
            <Image
              source={require('../assets/images/sunflower.png')}
              style={styles.categoryImage}
            />
            <Text style={styles.categoryText}>Sunflower</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.category}
            onPress={() =>
              navigation.navigate('Products' as never, { category: 'Groundnut' } as never)
            }>
            <Image
              source={require('../assets/images/groundnut.png')}
              style={styles.categoryImage}
            />
            <Text style={styles.categoryText}>Groundnut</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.category}
            onPress={() =>
              navigation.navigate('Products' as never, { category: 'Coconut' } as never)
            }>
            <Image
              source={require('../assets/images/coconut.png')}
              style={styles.categoryImage}
            />
            <Text style={styles.categoryText}>Coconut</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.category}
            onPress={() =>
              navigation.navigate('Products' as never, { category: 'Sesame' } as never)
            }>
            <Image
              source={require('../assets/images/sesame.png')}
              style={styles.categoryImage}
            />
            <Text style={styles.categoryText}>Sesame</Text>
          </TouchableOpacity>
        </ScrollView>
        {/* Best Sellers */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Best Sellers</Text>
          <TouchableOpacity onPress={() => navigation.navigate('Products' as never)}>
            <Text style={styles.viewAll}>View All</Text>
          </TouchableOpacity>
        </View>

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.productsRow}>
          {featuredProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              navigation={navigation}
            />
          ))}
        </ScrollView>

        {/* Benefits */}
        <Text style={styles.sectionTitle}>Why Mana Ganuga?</Text>

        <View style={styles.featuresGrid}>
          <View style={styles.featureCard}>
            <Text style={styles.featureIcon}>🌿</Text>
            <Text style={styles.featureTitle}>100% Natural</Text>
            <Text style={styles.featureDesc}>
              No artificial additives, 100% pure
            </Text>
          </View>

          <View style={styles.featureCard}>
            <Text style={styles.featureIcon}>🪵</Text>
            <Text style={styles.featureTitle}>Wood Pressed</Text>
            <Text style={styles.featureDesc}>
              Traditional wooden cold-press method
            </Text>
          </View>

          <View style={styles.featureCard}>
            <Text style={styles.featureIcon}>🧪</Text>
            <Text style={styles.featureTitle}>Chemical Free</Text>
            <Text style={styles.featureDesc}>
              No chemicals or refined processing
            </Text>
          </View>

          <View style={styles.featureCard}>
            <Text style={styles.featureIcon}>🚚</Text>
            <Text style={styles.featureTitle}>Free Delivery</Text>
            <Text style={styles.featureDesc}>
              Safe and fast delivery at your doorstep
            </Text>
          </View>
        </View>

        <View style={{ height: 40 }} />
      </ScrollView>
      

    
      {/* Floating Slide-in Referral Button */}
    
    </SafeAreaView>
  );
};
   

export default HomeScreen;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#F8F4EC',
  },
  container: {
    flex: 1,
    backgroundColor: '#F8F4EC',
    paddingHorizontal: 15,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 15,
    paddingVertical: 10,
    backgroundColor: '#F8F4EC',
    zIndex: 10,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
  },
  brandSection: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  logo: {
    width: 40,
    height: 40,
    resizeMode: 'contain',
    marginRight: 8,
  },
  logoText: {
    fontSize: 20,
    fontWeight: '700',
    color: '#2D341F',
  },
  tagline: {
    color: '#777',
    fontSize: 10,
    marginTop: 1,
  },
  headerIcons: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    fontSize: 20,
    marginLeft: 12,
  },
  cartIconContainer: {
    position: 'relative',
    marginLeft: 12,
  },
  cartBadge: {
    position: 'absolute',
    top: -4,
    right: -8,
    backgroundColor: '#A84B21',
    borderRadius: 9,
    minWidth: 18,
    height: 18,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 3,
  },
  cartBadgeText: {
    color: '#FFFFFF',
    fontSize: 10,
    fontWeight: '700',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF',
    borderRadius: 15,
    paddingHorizontal: 15,
    height: 50,
    marginTop: 13,
    marginBottom: 11,
  },
  searchInput: {
    flex: 1,
    fontSize: 14,
    color: '#222',
  },
  searchEmoji: {
    fontSize: 18,
  },
  heroBanner: {
    width: BANNER_WIDTH,
    height: 180,
    borderRadius: 20,
    marginBottom: 20,
    resizeMode: 'cover',
  },
  categoryContainer: {
    paddingBottom: 10,
  },
  category: {
    alignItems: 'center',
    marginRight: 20,
  },
  categoryImage: {
    width: 75,
    height: 75,
    borderRadius: 40,
  },
  categoryText: {
    marginTop: 6,
    fontSize: 13,
    fontWeight: '600',
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 15,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: '700',
    color: '#2D341F',
  },
  viewAll: {
    color: '#A84B21',
    fontWeight: '700',
  },
  productsRow: {
    flexDirection: 'row',
    paddingHorizontal: 4,
    gap: 12,
  },
  addressCard: {
    backgroundColor: '#FFF',
    borderRadius: 15,
    paddingHorizontal: 15,
    height: 50,
    marginTop: 10,
    marginBottom: 15,
    flexDirection: 'row',
    alignItems: 'center',
  },
  addressText: {
    flex: 1,
    fontSize: 14,
    color: '#333',
    fontWeight: '500',
  },
  addressArrow: {
    fontSize: 18,
    color: '#777',
    marginLeft: 8,
  },
  topCategoryContainer: {
    paddingVertical: 15,
  },
  topCategoryItem: {
    alignItems: 'center',
    marginRight: 28,
  },
  topCategoryIcon: {
    fontSize: 26,
    marginBottom: 6,
  },
  activeCategoryText: {
    fontSize: 14,
    fontWeight: '700',
    color: '#2D341F',
  },
  categoryLabel: {
    fontSize: 14,
    color: '#2D341F',
  },
  activeCategoryLine: {
    marginTop: 6,
    width: 36,
    height: 3,
    borderRadius: 10,
    backgroundColor: '#2D341F',
  },
  dotContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 5,
    marginBottom: 15,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#D3D3D3',
    marginHorizontal: 4,
  },
  activeDot: {
    backgroundColor: '#A84B21',
    width: 20,
  },
  featuresGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  featureCard: {
    width: '48%',
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 15,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 3,
  },
  featureIcon: {
    fontSize: 28,
    marginBottom: 8,
  },
  featureTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#2D341F',
    marginBottom: 4,
  },
  featureDesc: {
    fontSize: 12,
    color: '#666',
    lineHeight: 18,
  },
  floatingShareBtn: {
    position: 'absolute',
    bottom: 25,
    right: 15,
    zIndex: 999,
  },
  floatingInner: {
    backgroundColor: '#A84B21',
    borderRadius: 25,
    paddingVertical: 10,
    paddingHorizontal: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
  },
  floatingShareIcon: {
    fontSize: 20,
    marginRight: 6,
  },
  floatingShareText: {
    color: '#FFF',
    fontSize: 13,
    fontWeight: '700',
  },
  membershipIcon: {
  width: 30,
  height: 30,
  resizeMode: 'contain',
},
notificationButton: {
  position: 'relative',
  width: 40,
  height: 40,
  alignItems: 'center',
  justifyContent: 'center',
},

notificationBadge: {
  position: 'absolute',
  top: -2,
  right: -2,
  minWidth: 18,
  height: 18,
  borderRadius: 9,
  backgroundColor: '#A84B21',
  alignItems: 'center',
  justifyContent: 'center',
  paddingHorizontal: 4,
  borderWidth: 2,
  borderColor: '#FFFFFF',
},

notificationBadgeText: {
  color: '#FFFFFF',
  fontSize: 9,
  fontWeight: '800',
},
});
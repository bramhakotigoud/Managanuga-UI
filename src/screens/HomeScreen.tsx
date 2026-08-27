import React, { useCallback, useEffect, useRef, useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  Image,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  Share,
  Animated,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useGifAnimation} from '../context/GifAnimationContext';
import ProductCard from '../components/ProductCard';
import { useCart } from '../context/CartContext';
import { useFocusEffect } from '@react-navigation/native';
import { useAuth } from '../context/AuthContext';
import { getUnreadCount } from '../services/notificationService';
import styles, {bannerWidth} from '../styles/HomeScreen.styles';
// Get screen width dynamically (Subtract 30 to account for container padding: 15 left + 15 right)
import {
  Bell,
  ShoppingCart,
  Search,
  FlaskConicalOff,
  Truck,
  Leaf,
  PackageSearch,
  Sprout,
  Handbag,
  Flame,
  Sparkles,
  TagPlus,
  Gem,
  Gift,
  List,
} from 'lucide-react-native';

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
      <ShoppingCart
  size={24}
  color="rgb(0, 0, 0)"
  strokeWidth={2}
/>
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
  const {restartGif} = useGifAnimation();
  const navigation = useNavigation();
  const {user} = useAuth();
  const hideMembership = String(user?.mobile_no) === '9347499591';
  const [unreadNotificationCount, setUnreadNotificationCount] =
  useState(0);
  const [defaultAddress, setDefaultAddress] = useState<any>(null);
  const [activeBanner, setActiveBanner] = useState(0);
  const searchInputRef = useRef<TextInput>(null);
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
    <SafeAreaView
  style={styles.safeArea}
  onTouchStart={restartGif}>
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
     {user &&
  !['9347499591', '9494661235', '9848283838'].includes(
    String(user.mobile).replace(/\D/g, '')
  ) && (
    <TouchableOpacity
      onPress={() => navigation.navigate('Subscription' as never)}
    >
      <Image
        source={require('../assets/images/membership_wallet.png')}
        style={styles.membershipIcon}
      />
    </TouchableOpacity>
  )}

         <TouchableOpacity
  onPress={() => navigation.navigate('Notifications' as never)}
  style={styles.notificationButton}>
  
  <Bell
  size={24}
  color="#000000"
  strokeWidth={2}
/>
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
  showsVerticalScrollIndicator={false}
  onScroll={restartGif}
  scrollEventThrottle={16}>

        

        {/* Search */}
        <View style={styles.searchContainer}>
  <TextInput
    ref={searchInputRef}
    placeholder="Search Products"
    placeholderTextColor="#777"
    style={styles.searchInput}
  />
  <TouchableOpacity
    onPress={() => searchInputRef.current?.focus()}
    hitSlop={10}
  >
    <Search
      size={26}
      color="#000000"
      strokeWidth={2}
    />
  </TouchableOpacity>
</View>

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.topCategoryContainer}>

          <TouchableOpacity
            style={styles.topCategoryItem}
            onPress={() =>
              navigation.navigate(
                'Products' as never,
                {category: 'All'} as never,
              )
            }>
            <Handbag
            size={20}
            color="#2D341F"
            strokeWidth={2}/>
            <Text style={styles.activeCategoryText}>For You</Text>
            <View style={styles.activeCategoryLine} />
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.category}
            onPress={() =>
              navigation.navigate('Products' as never, { category: 'Sunflower' } as never)
            }>
            <Flame
            size={20}
            color="#2D341F"
            strokeWidth={2}/>

            <Text style={styles.categoryLabel}>Trending</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.category}
            onPress={() =>
              navigation.navigate('Products' as never, { category: 'Groundnut' } as never)
            }>
            <Sparkles
            size={20}
            color="#2D341F"
            strokeWidth={2}/>
            <Text style={styles.categoryLabel}>Best Sellers</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.category}
            onPress={() =>
              navigation.navigate('Products' as never, { category: 'Coconut' } as never)
            }>
            <TagPlus
            size={20}
            color="#2D341F"
            strokeWidth={2}/>
            <Text style={styles.categoryLabel}>New Arrivals</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.category}
            onPress={() =>
              navigation.navigate('Products' as never, { category: 'Sesame' } as never)
            }>
            <Gem
            size={20}
            color="#2D341F"
            strokeWidth={2}/>
            <Text style={styles.categoryLabel}>Premium</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.topCategoryItem}
            onPress={() => navigation.navigate('Products' as never)}>
            <Gift
            size={20}
            color="#2D341F"
            strokeWidth={2}/>
            <Text style={styles.categoryLabel}>Combo</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.topCategoryItem}
            onPress={() => navigation.navigate('Products' as never)}>
            <List
            size={20}
            color="#2D341F"
            strokeWidth={2}/>
            <Text style={styles.categoryLabel}>More</Text>
          </TouchableOpacity>

        </ScrollView>

        {/* BANNER CAROUSEL (RESPONSIVE & CLEAN SINGLE SNAP) */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          snapToInterval={bannerWidth}
          snapToAlignment="center"
          decelerationRate="fast"
          onMomentumScrollEnd={(event) => {
            const index = Math.round(
              event.nativeEvent.contentOffset.x / bannerWidth
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
        <Text style={[styles.sectionTitle, styles.benefitsTitle]}>
          Why Mana Ganuga?
        </Text>

        <View style={styles.featuresGrid}>
          <View style={styles.featureCard}>
             <Leaf
               size={22}
               color="#130a05"
               strokeWidth={2}/>
            <Text style={styles.featureTitle}>100% Natural</Text>
            <Text style={styles.featureDesc}>
              No artificial additives, 100% pure
            </Text>
          </View>

          <View style={styles.featureCard}>
            <View style={{ marginBottom: 8, alignItems: 'center' }}>
            </View>
             <Sprout
               size={22}
               color="#130a05"
               strokeWidth={2}/>
            <Text style={styles.featureTitle}>Wood Pressed</Text>
            <Text style={styles.featureDesc}>
              Traditional wooden cold-press method
            </Text>
          </View>

          <View style={styles.featureCard}>
            <FlaskConicalOff
              size={24}
              color="#1a0c05"
              strokeWidth={2}
               />
            <Text style={styles.featureTitle}>Chemical Free</Text>
            <Text style={styles.featureDesc}>
              No chemicals or refined processing
            </Text>
          </View>

          <View style={styles.featureCard}>
            <Truck
                size={22}
                color="#130a05"
                strokeWidth={2}
              />
            <Text style={styles.featureTitle}>Free Delivery</Text>
            <Text style={styles.featureDesc}>
              Safe and fast delivery at your doorstep
            </Text>
          </View>
        </View>

        <View style={styles.bottomSpacing} />
      </ScrollView>
      

    
      {/* Floating Slide-in Referral Button */}
    
    </SafeAreaView>
  );
};
   

export default HomeScreen;
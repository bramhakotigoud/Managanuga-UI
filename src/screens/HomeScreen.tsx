//import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {useNavigation} from '@react-navigation/native';
import ProductCard from '../components/ProductCard';
import {useCart} from '../context/CartContext';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';
const HomeScreen = () => {
  const [defaultAddress, setDefaultAddress] = useState<any>(null);
  const {addToCart} = useCart();
  const navigation = useNavigation();
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
  const [activeBanner, setActiveBanner] = useState(0);
  useEffect(() => {
  loadAddress();
}, []);

const loadAddress = async () => {
  const data = await AsyncStorage.getItem("addresses");

  if (data) {
    const addresses = JSON.parse(data);

    const address = addresses.find(
      (item: any) => item.isDefault
    );

    setDefaultAddress(address);
  }
};
  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView
        style={styles.container}
        showsVerticalScrollIndicator={false}>

        {/* Header */}
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
              onPress={() => navigation.navigate('Subscription' as never)}
              >
              <Text style={styles.icon}>🪪</Text>
              </TouchableOpacity>
              
            <Text style={styles.icon}>🔔</Text>
            <TouchableOpacity 
             onPress={() => navigation.navigate('Cart' as never)}>
            <Text style={styles.icon}>🛒</Text>
            </TouchableOpacity>
          </View>
        </View>
        <TouchableOpacity style={styles.addressCard}>
         <Text
          style={styles.addressText}
          numberOfLines={1}>
            🏠 {defaultAddress
            ? `${defaultAddress.type} ${defaultAddress.name}, ${defaultAddress.city}, ${defaultAddress.state} ${defaultAddress.pincode}`
            : 'Select Address'}
        </Text>
        <Text style={styles.addressArrow}>⌄</Text>
       </TouchableOpacity>

        {/* Search */}
        <View style={styles.searchContainer}>
          <Text style={styles.searchEmoji}>🔍</Text>

          <TextInput
            placeholder="Search oils, ghee, jaggery..."
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
        

        <ScrollView
         horizontal
         pagingEnabled
         showsHorizontalScrollIndicator={false}
         onMomentumScrollEnd={(event) => {
          const index = Math.round(
           event.nativeEvent.contentOffset.x /
           event.nativeEvent.layoutMeasurement.width,
          );
          setActiveBanner(index);
         }}
        >    
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
          {[0, 1, 2, 3].map(index => (
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

          <View style={styles.category}>
            <Image
              source={require('../assets/images/sunflower.png')}
              style={styles.categoryImage}
            />
            <Text style={styles.categoryText}>Sunflower</Text>
          </View>

          <View style={styles.category}>
            <Image
              source={require('../assets/images/groundnut.png')}
              style={styles.categoryImage}
            />
            <Text style={styles.categoryText}>Groundnut</Text>
          </View>

          <View style={styles.category}>
            <Image
              source={require('../assets/images/coconut.png')}
              style={styles.categoryImage}
            />
            <Text style={styles.categoryText}>Coconut</Text>
          </View>

          <View style={styles.category}>
            <Image
              source={require('../assets/images/sesame.png')}
              style={styles.categoryImage}
            />
            <Text style={styles.categoryText}>Sesame</Text>
          </View>
        </ScrollView>

        {/* Best Sellers */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>
            Best Sellers
          </Text>

          <TouchableOpacity>
            <Text style={styles.viewAll}>
              View All
            </Text>
          </TouchableOpacity>
        </View>

        <ScrollView
         horizontal
         showsHorizontalScrollIndicator={false}
         contentContainerStyle={styles.productsRow}
        >
        {featuredProducts.map(product => (
          <ProductCard
           key={product.id}
           product={product}
           navigation={navigation}
          />
        ))}
       </ScrollView>
        {/* Benefits */}
        <Text style={styles.sectionTitle}>
          Why Mana Ganuga?
        </Text>

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

        <View style={{height: 40}} />
      </ScrollView>
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
    padding: 15,
  },

  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 5,
    marginBottom: 15,
  },

  brandSection: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  logo: {
    width: 50,
    height: 50,
    resizeMode: 'contain',
    marginRight: 10,
  },

  logoText: {
    fontSize: 24,
    fontWeight: '700',
    color: '#2D341F',
  },

  tagline: {
    color: '#777',
    fontSize: 12,
    marginTop: 2,
  },

  headerIcons: {
    flexDirection: 'row',
  },

  icon: {
    fontSize: 22,
    marginLeft: 15,
  },

  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF',
    borderRadius: 15,
    paddingHorizontal: 15,
    height: 55,
    marginBottom: 15,
  },

  searchInput: {
    flex: 1,
    fontSize: 15,
  },

  searchEmoji: {
    fontSize: 18,
  },

  heroBanner: {
    width: '370',
    height: 190,
    borderRadius: 20,
    marginBottom: 20,
    marginRight:0,
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

  productCard: {
  width: 140,
  backgroundColor: '#fff',
  borderRadius: 16,
  padding: 10,
  marginRight: 12,
  alignItems: 'center',
  },
  productImage: {
  width: 80,
  height: 110,
  resizeMode: 'contain',
  marginBottom: 8,
  },

  productName: {
  fontSize: 15,
  fontWeight: '600',
  textAlign: 'center',
  },

  rating: {
    marginTop: 2,
    color: '#666',
    fontSize: 13,
  },

  price: {
  fontSize: 20,
  fontWeight: '700',
  color: '#A0522D',
  },

  cartButton: {
    marginTop: 8,
    backgroundColor: '#A84B21',
    borderRadius: 12,
    paddingVertical: 8,
    paddingHorizontal: 15,
  },

  cartText: {
    color: '#FFF',
    fontWeight: '600',
  },

  benefitsCard: {
    backgroundColor: '#FFF',
    borderRadius: 20,
    padding: 20,
    marginTop: 10,
  },

  benefit: {
    marginBottom: 10,
    fontSize: 16,
    color: '#2D341F',
  },
  addressCard: {
  backgroundColor: '#FFF',
  borderRadius: 15,
  paddingHorizontal: 15,
  height: 55,
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
  marginTop: 10,
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
});
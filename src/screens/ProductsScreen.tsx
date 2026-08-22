import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Image,
} from 'react-native';
import {
  Bell,
  ShoppingCart,
  CircleChevronLeft,
  Search,
} from 'lucide-react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { useCart } from '../context/CartContext';
import { HeaderCartButton } from './HomeScreen';

const ProductsScreen = () => {
  const { addToCart } = useCart();
  const navigation: any = useNavigation();
  const route = useRoute<any>();

  // Extract category parameter passed from HomeScreen
  const initialCategory = route.params?.category || 'All';

  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState(initialCategory);

  useEffect(() => {
    if (route.params?.category) {
      setSelectedCategory(route.params.category);
    }
  }, [route.params?.category]);

  const categories = ['All', 'Sunflower', 'Groundnut', 'Coconut', 'Sesame'];

  const products = [
    {
      id: 1,
      name: 'Sunflower Oil',
      category: 'Sunflower',
      price: 299,
      oldPrice: 349,
      rating: 4.8,
      badge: 'Best Seller',
      image: require('../assets/images/sunflower.png'),
    },
    {
      id: 2,
      name: 'Groundnut Oil',
      category: 'Groundnut',
      price: 349,
      oldPrice: 399,
      rating: 4.9,
      badge: 'Popular',
      image: require('../assets/images/groundnut.png'),
    },
    {
      id: 3,
      name: 'Coconut Oil',
      category: 'Coconut',
      price: 399,
      oldPrice: 449,
      rating: 4.9,
      badge: 'Premium',
      image: require('../assets/images/coconut.png'),
    },
    {
      id: 4,
      name: 'Sesame Oil',
      category: 'Sesame',
      price: 329,
      oldPrice: 379,
      rating: 4.8,
      badge: 'Traditional',
      image: require('../assets/images/sesame.png'),
    },
  ];

  const filteredProducts = products.filter((item) => {
    const matchesCategory =
      selectedCategory === 'All' || item.category === selectedCategory;
    const matchesSearch = item.name
      .toLowerCase()
      .includes(search.toLowerCase());
    return matchesCategory && matchesSearch;
  });

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
        <View style={styles.logoSection}>
          <Image
            source={require('../assets/images/logo.png')}
            style={styles.logo}
          />
          <View>
            <Text style={styles.brandName}>Mana Ganuga</Text>
            <Text style={styles.tagline}>Pure Tradition • Healthy Future</Text>
          </View>
        </View>

        <View style={styles.headerIcons}>
          <TouchableOpacity
            onPress={() => navigation.navigate('Notifications')}>
                 <Bell
              size={24}
              color="#000000"
              strokeWidth={2}
            />
          </TouchableOpacity>
          <HeaderCartButton />
        </View>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.searchContainer}>
          
          <TextInput
            placeholder="Search products..."
            placeholderTextColor="#888"
            value={search}
            onChangeText={setSearch}
            style={styles.searchInput}
          />
          <Search
            size={22}
            color="#000000"
            strokeWidth={2}
           />
        </View>

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.categoryContainer}>
          {categories.map((category) => (
            <TouchableOpacity
              key={category}
              onPress={() => setSelectedCategory(category)}
              style={[
                styles.categoryChip,
                selectedCategory === category && styles.activeCategoryChip,
              ]}>
              <Text
                style={[
                  styles.categoryText,
                  selectedCategory === category && styles.activeCategoryText,
                ]}>
                {category}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        <View style={styles.productsGrid}>
          {filteredProducts.length > 0 ? (
            filteredProducts.map((item) => (
              <TouchableOpacity
                key={item.id}
                style={styles.productCard}
                onPress={() => {
                  navigation.navigate('ProductDetails', { product: item });
                }}>
                <View style={styles.badge}>
                  <Text style={styles.badgeText}>{item.badge}</Text>
                </View>

                <Text style={styles.heart}>♡</Text>

                <Image source={item.image} style={styles.productImage} />

                <Text style={styles.productName}>{item.name}</Text>

                <Text style={styles.rating}>⭐ {item.rating}</Text>

                <View style={styles.priceRow}>
                  <Text style={styles.price}>₹{item.price}</Text>
                  <Text style={styles.oldPrice}>₹{item.oldPrice}</Text>
                </View>

                <TouchableOpacity
                  style={styles.cartButton}
                  onPress={() => {
                    addToCart(item);
                  }}>
                  <Text style={styles.cartText}>Add To Cart</Text>
                </TouchableOpacity>
              </TouchableOpacity>
            ))
          ) : (
            <View style={{ flex: 1, alignItems: 'center', marginTop: 40 }}>
              <Text style={{ fontSize: 16, color: '#777' }}>
                No products found
              </Text>
            </View>
          )}
        </View>

        <View style={{ height: 30 }} />
      </ScrollView>
    </SafeAreaView>
  );
};

export default ProductsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F4EC',
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
  logoSection: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  logo: {
    width: 40,
    height: 40,
    resizeMode: 'contain',
    marginRight: 8,
  },
  brandName: {
    fontSize: 20,
    fontWeight: '700',
    color: '#2D341F',
  },
  tagline: {
    fontSize: 10,
    color: '#777',
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
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF',
    marginHorizontal: 15,
    marginTop: 15,
    borderRadius: 15,
    paddingHorizontal: 15,
    height: 55,
  },
  searchIcon: {
    fontSize: 18,
  },
  searchInput: {
    flex: 1,
    marginLeft: 10,
  },
  categoryContainer: {
    paddingHorizontal: 15,
    paddingVertical: 15,
  },
  categoryChip: {
    backgroundColor: '#FFF',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 20,
    marginRight: 10,
  },
  activeCategoryChip: {
    backgroundColor: '#A84B21',
  },
  categoryText: {
    color: '#333',
    fontWeight: '600',
  },
  activeCategoryText: {
    color: '#FFF',
  },
  productsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    paddingHorizontal: 15,
  },
  productCard: {
    width: '48%',
    backgroundColor: '#FFF',
    borderRadius: 18,
    padding: 12,
    marginBottom: 15,
    position: 'relative',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.08,
    shadowRadius: 5,
    elevation: 4,
  },
  badge: {
    backgroundColor: '#E8F5E9',
    alignSelf: 'flex-start',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 10,
  },
  badgeText: {
    fontSize: 10,
    color: '#2E7D32',
    fontWeight: '700',
  },
  heart: {
    position: 'absolute',
    top: 12,
    right: 12,
    fontSize: 18,
  },
  productImage: {
    width: 90,
    height: 120,
    resizeMode: 'contain',
    alignSelf: 'center',
    marginTop: 10,
  },
  productName: {
    textAlign: 'center',
    fontWeight: '700',
    marginTop: 10,
    color: '#2D341F',
  },
  rating: {
    textAlign: 'center',
    marginTop: 5,
    color: '#666',
  },
  priceRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 8,
  },
  price: {
    fontSize: 18,
    fontWeight: '700',
    color: '#A84B21',
  },
  oldPrice: {
    marginLeft: 8,
    textDecorationLine: 'line-through',
    color: '#999',
  },
  cartButton: {
    marginTop: 12,
    backgroundColor: '#A84B21',
    borderRadius: 12,
    paddingVertical: 10,
    alignItems: 'center',
  },
  cartText: {
    color: '#FFF',
    fontWeight: '700',
  },
});
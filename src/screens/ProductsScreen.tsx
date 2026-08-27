import React, { useRef, useState, useEffect } from 'react';
import styles from '../styles/ProductsScreen.styles';
import {
  View,
  Text,
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
import {getProductImage} from '../utils/productImage';
import Config from 'react-native-config';

const ProductsScreen = () => {
  const { addToCart } = useCart();
  const navigation: any = useNavigation();
  const route = useRoute<any>();

  // Extract category parameter passed from HomeScreen
  const initialCategory = route.params?.category || 'All';

  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState(initialCategory);
  const searchInputRef = useRef<TextInput>(null);

  useEffect(() => {
    if (route.params?.category) {
      setSelectedCategory(route.params.category);
    }
  }, [route.params?.category]);

  const categories = ['All', 'Sunflower', 'Groundnut', 'Coconut', 'Sesame'];

 const [products, setProducts] = useState<any[]>([]);
 useEffect(() => {
  const loadProducts = async () => {
    try {
      const response = await fetch(`${Config.API_BASE_URL}/products`);

      if (!response.ok) {
        throw new Error('Failed to fetch products');
      }

      const result = await response.json();

      console.log('PRODUCTS API RESPONSE:', result);
      console.log('GROUNDNUT PRODUCT:', result.data?.find((p: any) => p.id === 2));

      setProducts(result.data || []);
    } catch (error) {
      console.error('Failed to load products:', error);
    }
  };

  loadProducts();
}, []);

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
            ref={searchInputRef}
            placeholder="Search products..."
            placeholderTextColor="#888"
            value={search}
            onChangeText={setSearch}
            showSoftInputOnFocus
            style={styles.searchInput}
          />
          <TouchableOpacity
            onPressIn={() => searchInputRef.current?.focus()}
            style={styles.searchIconButton}
            accessibilityRole="button"
            accessibilityLabel="Search products"
          >
            <Search
              size={22}
              color="#000000"
              strokeWidth={2}
            />
          </TouchableOpacity>
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
                onPress={async () => {
  try {
    const response = await fetch(
      `${Config.API_BASE_URL}/products/${item.id}`,
    );

    const result = await response.json();

    navigation.navigate('ProductDetails', {
      product: result.data,
    });
  } catch (error) {
    console.error('Failed to load product details:', error);
  }
}}>
                <View style={styles.badge}>
                  <Text style={styles.badgeText}>{item.badge}</Text>
                </View>

                <Text style={styles.heart}>♡</Text>

                <Image
                  source={getProductImage(item.image)}
                  style={styles.productImage} 
                 />

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


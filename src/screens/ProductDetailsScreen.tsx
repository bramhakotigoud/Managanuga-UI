import {useNavigation} from '@react-navigation/native';
import {useCart} from '../context/CartContext';
import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  Image,
} from 'react-native';
import {
  Bell,
  ShoppingCart,
  CircleChevronLeft,
  Truck,
  ShieldCheck,
  Leaf,
  Star,
} from 'lucide-react-native';

const ProductDetailsScreen = ({route}: any) => {
  const {addToCart, cartItems} = useCart();
  const navigation = useNavigation<any>();

  // Calculate total item count in cart (handles quantity if present, fallback to length)
  // Safely sum total items checking all common quantity key names
  const cartCount =
    cartItems?.reduce((total: number, item: any) => {
      const q = item.quantity ?? item.qty ?? item.count ?? 1;
      return total + Number(q);
    }, 0) || cartItems?.length || 0;

  const product = route?.params?.product || {
    id: 1,
    name: 'Sunflower Oil',
    price: 299,
    oldPrice: 349,
    rating: 4.8,
    image: require('../assets/images/sunflower.png'),
  };

  const [selectedSize, setSelectedSize] = useState('500ml');
  const [quantity, setQuantity] = useState(1);

  const sizes = ['250ml', '500ml', '1L', '2L'];

  return (
    <SafeAreaView style={styles.container}>
      {/* --- TOP HEADER WITH BACK BUTTON, LOGO, BRAND NAME & ACTIONS --- */}
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          hitSlop={{top: 10, bottom: 10, left: 10, right: 10}}>
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

        <View style={styles.headerRightActions}>
          <TouchableOpacity 
            style={styles.iconButton}
            onPress={() => navigation.navigate('Notifications')}>
                  <Bell
              size={24}
              color="#000000"
              strokeWidth={2}
            />
          </TouchableOpacity>

          {/* Cart Icon with Dynamic Badge */}
        {/* Cart Icon with Dynamic Badge */}
          <TouchableOpacity
            style={styles.cartIconWrapper}
            onPress={() => navigation.navigate('Cart')}>
            <ShoppingCart
              size={24}
              color="#0c0502"
              strokeWidth={2}
            />
            {Boolean(cartCount) && cartCount > 0 ? (
              <View style={styles.badgeContainer}>
                <Text style={styles.badgeText}>
                  {cartCount > 99 ? '99+' : cartCount}
                </Text>
              </View>
            ) : null}
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Product Image */}
        <View style={styles.imageContainer}>
          <Image source={product.image} style={styles.productImage} />

          <View style={styles.discountBadge}>
            <Text style={styles.discountBadgeText}>15% OFF</Text>
          </View>
        </View>

        {/* Product Name */}
        <Text style={styles.productName}>{product.name}</Text>

        {/* Rating */}
        <Text style={styles.rating}>⭐ {product.rating} (125 Reviews)</Text>

        {/* Price */}
        <View style={styles.priceRow}>
          <Text style={styles.price}>₹{product.price}</Text>

          <Text style={styles.oldPrice}>₹{product.oldPrice}</Text>

          <Text style={styles.discount}>15% OFF</Text>
        </View>

        {/* Size Selection */}
        <Text style={styles.sectionTitle}>Select Size</Text>

        <View style={styles.sizeContainer}>
          {sizes.map(size => (
            <TouchableOpacity
              key={size}
              onPress={() => setSelectedSize(size)}
              style={[
                styles.sizeButton,
                selectedSize === size && styles.activeSizeButton,
              ]}>
              <Text
                style={[
                  styles.sizeText,
                  selectedSize === size && styles.activeSizeText,
                ]}>
                {size}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Quantity */}
        <Text style={styles.sectionTitle}>Quantity</Text>

        <View style={styles.quantityContainer}>
          <TouchableOpacity
            style={styles.qtyButton}
            onPress={() => quantity > 1 && setQuantity(quantity - 1)}>
            <Text style={styles.qtyText}>-</Text>
          </TouchableOpacity>

          <Text style={styles.quantity}>{quantity}</Text>

          <TouchableOpacity
            style={styles.qtyButton}
            onPress={() => setQuantity(quantity + 1)}>
            <Text style={styles.qtyText}>+</Text>
          </TouchableOpacity>
        </View>

        {/* Description */}
        <Text style={styles.sectionTitle}>Product Description</Text>

        <Text style={styles.description}>
          Premium wood pressed oil extracted using traditional Ganuga methods.
          No chemicals, no preservatives and no refined processing. Rich in
          nutrients and suitable for daily cooking.
        </Text>

        {/* Benefits */}
        <Text style={styles.sectionTitle}>Benefits</Text>

        <View style={styles.benefitCard}>
          <Text style={styles.benefitText}>🌿 100% Natural Ingredients</Text>
        </View>

        <View style={styles.benefitCard}>
          <Text style={styles.benefitText}>🪵 Traditional Wood Pressed</Text>
        </View>

        <View style={styles.benefitCard}>
          <Text style={styles.benefitText}>🧪 Chemical Free Processing</Text>
        </View>

        <View style={styles.benefitCard}>
          <Text style={styles.benefitText}>❤️ Rich in Essential Nutrients</Text>
        </View>

        {/* Nutrition */}
        <Text style={styles.sectionTitle}>Nutrition Highlights</Text>

        <View style={styles.nutritionCard}>
          <Text style={styles.nutritionItem}>• Rich in Healthy Fats</Text>

          <Text style={styles.nutritionItem}>• Natural Antioxidants</Text>

          <Text style={styles.nutritionItem}>• Vitamin E Source</Text>

          <Text style={styles.nutritionItem}>• No Artificial Additives</Text>
        </View>

        {/* Why Mana Ganuga */}
        <Text style={styles.sectionTitle}>Why Mana Ganuga?</Text>

        <View style={styles.whyCard}>
          <Text style={styles.whyText}>✓ Traditional Ganuga Extraction</Text>

          <Text style={styles.whyText}>✓ Farm Fresh Seeds</Text>

          <Text style={styles.whyText}>✓ Small Batch Production</Text>

          <Text style={styles.whyText}>✓ Quality Checked</Text>
        </View>

        {/* Trust Section */}
        <Text style={styles.sectionTitle}>Customer Trust</Text>

        <View style={styles.trustContainer}>
          <View style={styles.trustBox}>
            <Truck
    size={22}
    color="#130a05"
    strokeWidth={2}
  />

            <Text style={styles.trustText}>Fast Delivery</Text>
          </View>

          <View style={styles.trustBox}>
            <ShieldCheck
             size={22}
             color="#130a05"
             strokeWidth={2}/>


            <Text style={styles.trustText}>Secure Payments</Text>
          </View>

          <View style={styles.trustBox}>
            <Leaf
            size={22}
             color="#130a05"
             strokeWidth={2}/>


            <Text style={styles.trustText}>Pure & Natural</Text>
          </View>
        </View>

        {/* Customer Reviews */}
        <Text style={styles.sectionTitle}>Customer Reviews</Text>

        <View style={styles.reviewCard}>
          <Text style={styles.reviewStars}>⭐⭐⭐⭐⭐</Text>

          <Text style={styles.reviewText}>
            Excellent quality oil. Traditional taste and aroma. Highly
            recommended.
          </Text>

          <Text style={styles.reviewAuthor}>- Ravi Kumar</Text>
        </View>

        <View style={styles.reviewCard}>
          <Text style={styles.reviewStars}>⭐⭐⭐⭐⭐</Text>

          <Text style={styles.reviewText}>
            Pure and chemical free. My family loves it.
          </Text>

          <Text style={styles.reviewAuthor}>- Suresh</Text>
        </View>

        {/* Related Products */}
        <Text style={styles.sectionTitle}>Related Products</Text>

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{
            paddingHorizontal: 20,
          }}>
          <View style={styles.relatedCard}>
            <Image
              source={require('../assets/images/groundnut.png')}
              style={styles.relatedImage}
            />

            <Text style={styles.relatedTitle}>Groundnut Oil</Text>

            <Text style={styles.relatedPrice}>₹349</Text>
          </View>

          <View style={styles.relatedCard}>
            <Image
              source={require('../assets/images/coconut.png')}
              style={styles.relatedImage}
            />

            <Text style={styles.relatedTitle}>Coconut Oil</Text>

            <Text style={styles.relatedPrice}>₹399</Text>
          </View>

          <View style={styles.relatedCard}>
            <Image
              source={require('../assets/images/sesame.png')}
              style={styles.relatedImage}
            />

            <Text style={styles.relatedTitle}>Sesame Oil</Text>

            <Text style={styles.relatedPrice}>₹329</Text>
          </View>
        </ScrollView>

        <View style={{height: 120}} />
      </ScrollView>

      {/* Sticky Bottom Bar */}
      <View style={styles.bottomBar}>
        <TouchableOpacity
          style={styles.cartButton}
          onPress={() => addToCart({...product, quantity: quantity, qty: quantity, size: selectedSize})}>
          <Text style={styles.buttonText}>Add To Cart</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.buyButton}
          onPress={() => {
            navigation.navigate('Checkout', {
              buyNow: true,
              product: product,
            });
          }}>
          <Text style={styles.buttonText}>Buy Now</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default ProductDetailsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F4EC',
  },

  /* Header Styles */
  header: {
    height: 60,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    backgroundColor: '#F8F4EC',
  },
  backButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#FFF',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  backIcon: {
    fontSize: 24,
    fontWeight: '600',
    color: '#2D341F',
    marginTop: -2,
  },
  brandContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    marginLeft: 10,
  },
  logo: {
    width: 32,
    height: 32,
    resizeMode: 'contain',
    marginRight: 8,
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
  headerRightActions: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconButton: {
    marginLeft: 12,
    padding: 4,
  },
  cartIconWrapper: {
    marginLeft: 12,
    padding: 4,
    position: 'relative',
  },
  headerIconText: {
    fontSize: 18,
  },
  badgeContainer: {
    position: 'absolute',
    top: -2,
    right: -4,
    backgroundColor: '#A84B21',
    borderRadius: 9,
    minWidth: 18,
    height: 18,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 3,
  },
  badgeText: {
    color: '#FFFFFF',
    fontSize: 10,
    fontWeight: '700',
  },

  imageContainer: {
    alignItems: 'center',
    marginTop: 10,
    position: 'relative',
  },

  discountBadge: {
    position: 'absolute',
    top: 10,
    right: 30,
    backgroundColor: '#2E7D32',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },

  discountBadgeText: {
    color: '#fff',
    fontWeight: '700',
    fontSize: 12,
  },

  sectionTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#2D341F',
    marginHorizontal: 20,
    marginTop: 25,
    marginBottom: 12,
  },

  sizeContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: 20,
  },

  sizeButton: {
    borderWidth: 1,
    borderColor: '#D7C5AF',
    paddingHorizontal: 18,
    paddingVertical: 10,
    borderRadius: 12,
    marginRight: 10,
    marginBottom: 10,
    backgroundColor: '#fff',
  },

  activeSizeButton: {
    backgroundColor: '#A84B21',
    borderColor: '#A84B21',
  },

  sizeText: {
    color: '#333',
    fontWeight: '600',
  },

  activeSizeText: {
    color: '#fff',
  },

  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
  },

  qtyButton: {
    width: 45,
    height: 45,
    borderRadius: 12,
    backgroundColor: '#A84B21',
    justifyContent: 'center',
    alignItems: 'center',
  },

  qtyText: {
    color: '#fff',
    fontSize: 22,
    fontWeight: '700',
  },

  quantity: {
    fontSize: 20,
    fontWeight: '700',
    marginHorizontal: 20,
  },

  description: {
    color: '#666',
    lineHeight: 24,
    paddingHorizontal: 20,
    fontSize: 15,
  },

  benefitCard: {
    backgroundColor: '#fff',
    marginHorizontal: 20,
    marginBottom: 10,
    padding: 15,
    borderRadius: 14,
    elevation: 2,
  },

  benefitText: {
    fontSize: 15,
    color: '#333',
    fontWeight: '600',
  },

  nutritionCard: {
    backgroundColor: '#fff',
    marginHorizontal: 20,
    padding: 15,
    borderRadius: 14,
    elevation: 2,
  },

  nutritionItem: {
    fontSize: 15,
    color: '#444',
    marginBottom: 8,
  },

  whyCard: {
    backgroundColor: '#fff',
    marginHorizontal: 20,
    padding: 15,
    borderRadius: 14,
    elevation: 2,
  },

  whyText: {
    fontSize: 15,
    color: '#333',
    marginBottom: 10,
    fontWeight: '600',
  },

  trustContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
  },

  trustBox: {
    backgroundColor: '#fff',
    width: '30%',
    paddingVertical: 15,
    borderRadius: 14,
    alignItems: 'center',
    elevation: 2,
  },

  trustIcon: {
    fontSize: 24,
    marginBottom: 8,
  },

  trustText: {
    textAlign: 'center',
    fontSize: 12,
    color: '#444',
    fontWeight: '600',
  },

  reviewCard: {
    backgroundColor: '#fff',
    marginHorizontal: 20,
    marginBottom: 12,
    padding: 15,
    borderRadius: 14,
    elevation: 2,
  },

  reviewStars: {
    fontSize: 16,
  },

  reviewText: {
    marginTop: 8,
    color: '#555',
    lineHeight: 22,
  },

  reviewAuthor: {
    marginTop: 10,
    fontWeight: '700',
    color: '#2D341F',
  },

  relatedCard: {
    width: 140,
    backgroundColor: '#fff',
    borderRadius: 14,
    padding: 12,
    marginRight: 12,
    alignItems: 'center',
  },

  relatedImage: {
    width: 80,
    height: 80,
    resizeMode: 'contain',
  },

  relatedTitle: {
    marginTop: 10,
    fontWeight: '700',
    color: '#2D341F',
    textAlign: 'center',
  },

  relatedPrice: {
    marginTop: 5,
    color: '#A84B21',
    fontWeight: '700',
  },

  bottomBar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#fff',
    flexDirection: 'row',
    padding: 15,
    borderTopWidth: 1,
    borderTopColor: '#eee',
  },

  cartButton: {
    flex: 1,
    backgroundColor: '#A84B21',
    paddingVertical: 15,
    borderRadius: 12,
    alignItems: 'center',
    marginRight: 8,
  },

  buyButton: {
    flex: 1,
    backgroundColor: '#2D341F',
    paddingVertical: 15,
    borderRadius: 12,
    alignItems: 'center',
  },

  buttonText: {
    color: '#fff',
    fontWeight: '700',
    fontSize: 16,
  },

  productImage: {
    width: 250,
    height: 250,
    resizeMode: 'contain',
  },

  productName: {
    fontSize: 28,
    fontWeight: '700',
    color: '#2D341F',
    marginHorizontal: 20,
    marginTop: 15,
  },

  rating: {
    fontSize: 16,
    color: '#777',
    marginHorizontal: 20,
    marginTop: 8,
  },

  priceRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 20,
    marginTop: 12,
  },

  price: {
    fontSize: 30,
    fontWeight: '700',
    color: '#A84B21',
  },

  oldPrice: {
    fontSize: 18,
    color: '#999',
    textDecorationLine: 'line-through',
    marginLeft: 10,
  },

  discount: {
    fontSize: 16,
    fontWeight: '700',
    color: '#2E7D32',
    marginLeft: 10,
  },
});
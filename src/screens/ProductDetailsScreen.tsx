import {useNavigation} from '@react-navigation/native';
import styles from '../styles/ProductDetailsScreen.styles';
import {useCart} from '../context/CartContext';
import React, {useEffect, useState} from 'react';
import {getProductVariants} from '../services/productVariantService';
require('../assets/images/groundnut.png')
import {getProductImage} from '../utils/productImage';
import Config from 'react-native-config';
import {getProductReviews} from '../services/productReviewService';
import {
  View,
  Text,
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
  FlaskConicalOff,
    Heart,
      Sprout,
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
  discount: 15,
  rating: 4.8,
  image: require('../assets/images/sunflower.png'),
};
const [variants, setVariants] = useState<any[]>([]);
const [selectedVariant, setSelectedVariant] = useState<any>(null);
const [quantity, setQuantity] = useState(1);
const [averageRating, setAverageRating] = useState(0);
const [reviewCount, setReviewCount] = useState(0);
const [reviews, setReviews] = useState<any[]>([]);


const discount = Number(product.discount) || 0;

const sellingPrice = selectedVariant
  ? Number(selectedVariant.price)
  : Number(product.price) || 0;

const actualPrice =
  discount > 0
    ? sellingPrice / (1 - discount / 100)
    : sellingPrice;



 const [relatedProducts, setRelatedProducts] = useState<any[]>([]);
  useEffect(() => {
  const loadVariants = async () => {
    try {
      const data = await getProductVariants(Number(product.id));

      setVariants(data);

      if (data.length > 0) {
        setSelectedVariant(data[0]);
      }
    } catch (error) {
      console.error('Failed to load product variants:', error);
    }
  };

  loadVariants();
}, [product.id]);
useEffect(() => {
  const loadRelatedProducts = async () => {
    try {
      const response = await fetch(
        `${Config.API_BASE_URL}/products`,
      );

      if (!response.ok) {
        throw new Error('Failed to fetch related products');
      }

      const result = await response.json();

      const products = result.data || [];

      const related = products.filter(
        (item: any) => Number(item.id) !== Number(product.id),
      );

      setRelatedProducts(related);
    } catch (error) {
      console.error('Failed to load related products:', error);
    }
  };

  loadRelatedProducts();
}, [product.id]);
useEffect(() => {
  const loadReviews = async () => {
    try {
      const response = await getProductReviews(Number(product.id));

      if (response.success) {
        setAverageRating(
          Number(response.rating?.average_rating) || 0
        );

        setReviewCount(
          Number(response.rating?.review_count) || 0
        );

        setReviews(response.data || []);
      }
    } catch (error) {
      console.error('Failed to load product reviews:', error);
    }
  };

  loadReviews();
}, [product.id]);

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
          <Image
  source={getProductImage(product.image)}
  style={styles.productImage}
/>

          <View style={styles.discountBadge}>
            <Text style={styles.discountBadgeText}>
             {discount}% OFF
            </Text>
          </View>
        </View>

        {/* Product Name */}
        <Text style={styles.productName}>{product.name}</Text>

        {/* Rating */}
        <View style={styles.ratingSummary}>
  <Text style={styles.rating}>
    ⭐ {averageRating.toFixed(1)}
  </Text>

  <Text style={styles.reviewCount}>
    ({reviewCount} {reviewCount === 1 ? 'Review' : 'Reviews'})
  </Text>
</View>

        {/* Price */}
        <View style={styles.priceRow}>
          <Text style={styles.price}>
  ₹{sellingPrice.toFixed(0)}
</Text>

{discount > 0 && (
  <Text style={styles.oldPrice}>
    ₹{actualPrice.toFixed(0)}
  </Text>
)}

{discount > 0 && (
  <Text style={styles.discount}>
    {discount}% OFF
  </Text>
)}
        </View>

        {/* Size Selection */}
        <Text style={styles.sectionTitle}>Quantity</Text>

     <View style={styles.sizeContainer}>
  {variants.map(variant => (
    <TouchableOpacity
      key={variant.id}
      onPress={() => setSelectedVariant(variant)}
      style={[
        styles.sizeButton,
        selectedVariant?.id === variant.id &&
          styles.activeSizeButton,
      ]}>
      <Text
        style={[
          styles.sizeText,
          selectedVariant?.id === variant.id &&
            styles.activeSizeText,
        ]}>
        {variant.size}
      </Text>
    </TouchableOpacity>
  ))}
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
          <View style={styles.benefitRow}>
         <Leaf size={18} color="#5C7A45" strokeWidth={2} />
         <Text style={styles.benefitText}>
         100% Natural Ingredients
         </Text>
         </View>
        </View>

        <View style={styles.benefitCard}>
          <View style={styles.benefitRow}>
  <Sprout
    size={18}
    color="#5C7A45"
    strokeWidth={2}
  />
  <Text style={styles.benefitText}>
    Traditional Wood Pressed
  </Text>
</View>
        </View>

        <View style={styles.benefitCard}>
          <View style={styles.benefitRow}>
          <FlaskConicalOff
           size={18}
           color="#5C7A45"
          strokeWidth={2}
           />
  <Text style={styles.benefitText}>
    Chemical Free Processing
  </Text>
</View>
        </View>

        <View style={styles.benefitCard}>
          <View style={styles.benefitRow}>
  <Heart
    size={18}
    color="#5C7A45"
    strokeWidth={2}
  />
  <Text style={styles.benefitText}>
    Rich in Essential Nutrients
  </Text>
</View>
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
        {/* Customer Reviews */}
<Text style={styles.sectionTitle}>
  Customer Reviews ({reviewCount})
</Text>

{reviews.length === 0 ? (
  <View style={styles.reviewCard}>
    <Text style={styles.noReviewsText}>
      No reviews yet. Be the first to review this product.
    </Text>
  </View>
) : (
  reviews.map((review: any) => (
    <View key={review.id} style={styles.reviewCard}>

      <View style={styles.reviewHeader}>
        <Text style={styles.reviewAuthor}>
          {review.username || review.user_id || 'Customer'}
        </Text>

        <Text style={styles.reviewStars}>
          {'⭐'.repeat(Number(review.rating) || 0)}
        </Text>
      </View>

      {review.review ? (
        <Text style={styles.reviewText}>
          {review.review}
        </Text>
      ) : null}

      <Text style={styles.reviewDate}>
        {review.created_at
          ? new Date(review.created_at).toLocaleDateString()
          : ''}
      </Text>

    </View>
  ))
)}
        {/* Related Products */}
        <Text style={styles.sectionTitle}>Related Products</Text>

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{
            paddingHorizontal: 20,
          }}>
          {relatedProducts.map(relatedProduct => (
            <TouchableOpacity
              key={relatedProduct.id}
              style={styles.relatedCard}
              onPress={() =>
                navigation.push('ProductDetails', {
                  product: relatedProduct,
                })
              }
              activeOpacity={0.8}>
              <Image
  source={getProductImage(relatedProduct.image)}
  style={styles.relatedImage}
/>

              <Text style={styles.relatedTitle}>{relatedProduct.name}</Text>

              <Text style={styles.relatedPrice}>₹{relatedProduct.price}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        <View style={{height: 160}} />
      </ScrollView>

      {/* Sticky Bottom Bar */}
      <View style={styles.bottomBar}>
        <TouchableOpacity
          style={styles.cartButton}
          onPress={() => addToCart({...product, quantity: quantity, qty: quantity, size: selectedVariant?.size,
variantId: selectedVariant?.id,
price: sellingPrice,})}>
          <Text style={styles.buttonText}>Add To Cart</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.buyButton}
          onPress={() => {
         navigation.navigate('Checkout', {
  buyNow: true,
  product: {
    ...product,
    size: selectedVariant?.size,
    variantId: selectedVariant?.id,
    price: sellingPrice,
  },
});
          }}>
          <Text style={styles.buttonText}>Buy Now</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default ProductDetailsScreen;


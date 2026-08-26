import {StyleSheet} from 'react-native';

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

export default styles;

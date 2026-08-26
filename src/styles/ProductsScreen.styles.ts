import {StyleSheet} from 'react-native';

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
  searchIconButton: {
    padding: 8,
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

export default styles;

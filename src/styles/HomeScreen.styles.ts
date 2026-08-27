import {Dimensions, StyleSheet} from 'react-native';

const {width: screenWidth} = Dimensions.get('window');
const bannerWidth = screenWidth - 30;

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
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.05,
    shadowRadius: 2,
  },
  brandSection: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  logo: {
    width: 55,
    height: 55,
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
  heroBanner: {
    width: bannerWidth,
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
  benefitsTitle: {
    marginTop: 24,
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
  topCategoryContainer: {
    paddingVertical: 15,
  },
  topCategoryItem: {
    alignItems: 'center',
    marginRight: 28,
  },
  activeCategoryText: {
    fontSize: 14,
    fontWeight: '600',
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
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 3,
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
  bottomSpacing: {
    height: 110,
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

export {bannerWidth};
export default styles;

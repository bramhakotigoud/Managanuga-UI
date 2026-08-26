import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F4EC',
  },

  // ===================================================
  // HEADER
  // ===================================================

  header: {
    backgroundColor: '#F8F4EC',
    paddingHorizontal: 16,
    paddingVertical: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
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
    flex: 1,
  },

  logo: {
    width: 42,
    height: 42,
    resizeMode: 'contain',
    marginRight: 8,
  },

  appName: {
    fontSize: 20,
    fontWeight: '700',
    color: '#2D341F',
  },

  tagline: {
    marginTop: 1,
    fontSize: 9,
    color: '#8A8A8A',
    letterSpacing: 0.2,
  },

  headerRightActions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },

  iconButton: {
    width: 42,
    height: 42,
    alignItems: 'center',
    justifyContent: 'center',
  },

  cartIconWrapper: {
    width: 42,
    height: 42,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },

  headerIconText: {
    fontSize: 24,
  },

  // ===================================================
  // BADGE
  // ===================================================

  badgeContainer: {
    position: 'absolute',

    top: -2,
    right: -2,

    minWidth: 19,
    height: 19,

    borderRadius: 10,

    backgroundColor: '#A84B21',

    alignItems: 'center',
    justifyContent: 'center',

    paddingHorizontal: 4,

    borderWidth: 1.5,
    borderColor: '#FFFFFF',
  },

  badgeText: {
    color: '#FFFFFF',
    fontSize: 10,
    fontWeight: '800',
    textAlign: 'center',
  },

  // ===================================================
  // LIST
  // ===================================================

  list: {
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 30,
  },

  notificationCard: {
    flexDirection: 'row',

    backgroundColor: '#FFFFFF',

    borderRadius: 16,

    padding: 15,

    marginBottom: 12,

    borderWidth: 1,
    borderColor: '#EEEEEE',
  },

  iconContainer: {
    width: 46,
    height: 46,

    borderRadius: 23,

    backgroundColor: '#F4EBDD',

    alignItems: 'center',
    justifyContent: 'center',

    marginRight: 12,
  },

  icon: {
    fontSize: 22,
  },

  content: {
    flex: 1,
  },

  title: {
    fontSize: 16,
    fontWeight: '700',
    color: '#333333',
  },

  message: {
    marginTop: 5,

    fontSize: 14,
    lineHeight: 20,

    color: '#666666',
  },

  date: {
    marginTop: 7,

    fontSize: 11,

    color: '#999999',
  },

  // ===================================================
  // LOADING
  // ===================================================

  center: {
    flex: 1,

    alignItems: 'center',
    justifyContent: 'center',

    backgroundColor: '#F8F4EC',
  },

  loadingText: {
    marginTop: 10,
    color: '#777777',
  },

  // ===================================================
  // EMPTY
  // ===================================================

  emptyContainer: {
    flex: 1,

    alignItems: 'center',
    justifyContent: 'center',

    paddingBottom: 100,
  },

  emptyIcon: {
    fontSize: 55,
    marginBottom: 15,
  },

  emptyTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#2D341F',
  },

  emptyMessage: {
    marginTop: 6,
    fontSize: 14,
    color: '#777777',
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
  headerRightPlaceholder: {
    width: 36,
  },
   brandContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});

export default styles;

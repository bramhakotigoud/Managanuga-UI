import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF8EE',
  },
  loader: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFF8EE',
  },
  /* Header Styles */
  header: {
    backgroundColor: '#FFF8EE',
    paddingHorizontal: 18,
    paddingVertical: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    zIndex: 10,
    elevation: 2,
    shadowColor: '#000000',
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.05,
    shadowRadius: 2,
  },
  backButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 2,
    shadowColor: '#000000',
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  backIcon: {
    fontSize: 24,
    fontWeight: '600',
    color: '#222222',
    marginTop: -2,
  },
  logoSection: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 10,
  },
  logo: {
    width: 34,
    height: 34,
    resizeMode: 'contain',
    marginRight: 8,
  },
  appName: {
    fontSize: 16,
    fontWeight: '700',
    color: '#111111',
  },
  tagline: {
    fontSize: 9,
    color: '#777777',
    marginTop: 1,
  },
  /* Right Actions & Badge Styles */
  headerRightActions: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconButton: {
    marginLeft: 10,
    padding: 4,
  },
  cartIconWrapper: {
    marginLeft: 10,
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
});

export default styles;

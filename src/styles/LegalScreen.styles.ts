import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F4EC',
  },

  header: {
    backgroundColor: '#F8F4EC',
    paddingHorizontal: 16,
    paddingVertical: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',

    elevation: 2,

    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.05,
    shadowRadius: 2,
  },

  backButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#FFF',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 2,
  },

  backIcon: {
    fontSize: 24,
    fontWeight: '600',
    color: '#2D341F',
    marginTop: -2,
  },

  headerTitle: {
    flex: 1,
    textAlign: 'center',
    fontSize: 18,
    fontWeight: '700',
    color: '#2D341F',
    marginHorizontal: 10,
  },

  headerPlaceholder: {
    width: 36,
  },

  content: {
    paddingHorizontal: 20,
    paddingTop: 24,
    paddingBottom: 50,
  },

  title: {
    fontSize: 24,
    fontWeight: '800',
    color: '#2D341F',
    marginBottom: 18,
  },

  legalText: {
    fontSize: 15,
    lineHeight: 24,
    color: '#444',
  },

  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 30,
  },

  loadingText: {
    marginTop: 10,
    color: '#666',
    fontSize: 14,
  },

  errorText: {
    color: '#D32F2F',
    fontSize: 15,
    textAlign: 'center',
    lineHeight: 22,
  },

  retryButton: {
    marginTop: 18,
    backgroundColor: '#A84B21',
    paddingHorizontal: 25,
    paddingVertical: 12,
    borderRadius: 10,
  },

  retryText: {
    color: '#FFF',
    fontWeight: '700',
  },
  brandContainer: {
  flexDirection: 'row',
  alignItems: 'center',
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
});

export default styles;

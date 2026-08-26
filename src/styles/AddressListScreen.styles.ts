import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F4EC',
  },

  /* Fixed Top Header Styles */
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

  backButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#FFF',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
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

  headerRightPlaceholder: {
    width: 36,
  },

  titleCenter: {
    fontSize: 20,
    fontWeight: '700',
    textAlign: 'center',
    color: '#2D341F',
    marginVertical: 15,
  },

  titleCenterEmpty: {
    marginBottom: 5,
  },

  /* Content & Card Styles */
  scrollContent: {
    paddingHorizontal: 20,
    paddingBottom: 40,
  },

  card: {
    backgroundColor: '#FFF',
    borderRadius: 16,
    padding: 16,
    marginBottom: 15,
  },

  topRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },

  homeTag: {
    backgroundColor: '#F5E6DD',
    color: '#A84B21',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 20,
    fontWeight: '700',
    fontSize: 12,
  },

  defaultTag: {
    color: 'green',
    fontWeight: '700',
    fontSize: 13,
  },

  name: {
    fontSize: 18,
    fontWeight: '700',
    color: '#222',
  },

  address: {
    color: '#666',
    marginTop: 4,
    lineHeight: 20,
  },

  mobile: {
    marginTop: 4,
    fontWeight: '600',
    color: '#444',
  },

  cardActionsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
    marginTop: 12,
  },

  edit: {
    color: '#A84B21',
    marginRight: 20,
    fontWeight: '700',
  },

  delete: {
    color: 'red',
    fontWeight: '700',
  },

  defaultText: {
    color: 'green',
    marginLeft: 20,
    fontWeight: '700',
    fontSize: 14,
  },

  addButton: {
    backgroundColor: '#A84B21',
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 10,
  },

  addText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: '700',
  },
  deleteMessageContainer: {
  marginHorizontal: 20,
  marginBottom: 8,
  paddingHorizontal: 12,
  paddingVertical: 9,
  backgroundColor: '#FFF4E8',
  borderRadius: 8,
  borderWidth: 1,
  borderColor: '#F1D2B5',
},

deleteMessageText: {
  fontSize: 12,
  color: '#8A4B20',
  textAlign: 'center',
  fontWeight: '500',
},
});

export default styles;

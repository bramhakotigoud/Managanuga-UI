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

  formContainer: {
    paddingHorizontal: 20,
    paddingBottom: 40,
  },

  input: {
    backgroundColor: '#FFF',
    paddingHorizontal: 15,
    height: 48,
    borderRadius: 12,
    marginBottom: 12,
    fontSize: 14,
    color: '#222',
    elevation: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
  },

  sectionTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: '#2D341F',
    marginTop: 10,
    marginBottom: 10,
  },

  typeRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 25,
  },

  radioOption: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
    paddingVertical: 10,
    paddingHorizontal: 12,
  },

  saveButton: {
    backgroundColor: '#A84B21',
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 10,
  },

  saveText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: '700',
  },
addressRow: {
  flexDirection: 'row',
  alignItems: 'stretch',
  marginBottom: 12,
},

addressSearchContainer: {
  flex: 7,
  position: 'relative',
  marginRight: 6,
},

addressInput: {
  backgroundColor: '#FFF',
  height: 48,
  borderRadius: 12,
  paddingLeft: 15,
  paddingRight: 70,
  fontSize: 14,
  color: '#222',

  elevation: 1,

  shadowColor: '#000',
  shadowOffset: {
    width: 0,
    height: 1,
  },
  shadowOpacity: 0.05,
  shadowRadius: 2,
},

addressIcons: {
  position: 'absolute',
  right: 12,
  top: 0,
  height: 48,
  flexDirection: 'row',
  alignItems: 'center',
  gap: 8,
},

searchIcon: {
  fontSize: 18,
},

clearIcon: {
  fontSize: 17,
  color: '#777',
  fontWeight: '600',
},

currentLocationButton: {
  flex: 3,
  backgroundColor: '#D6E4FF',
  borderRadius: 12,
  justifyContent: 'center',
  alignItems: 'center',
  minHeight: 48,
},

currentLocationText: {
  fontSize: 17,
},

currentLocationLabel: {
  color: '#1D4ED8',
  fontSize: 10,
  fontWeight: '700',
  textAlign: 'center',
  marginTop: 2,
},
suggestionsContainer: {
  backgroundColor: '#FFF',
  borderRadius: 12,
  marginTop: -6,
  marginBottom: 12,
  elevation: 5,
  shadowColor: '#000',
  shadowOffset: {
    width: 0,
    height: 2,
  },
  shadowOpacity: 0.12,
  shadowRadius: 5,
  zIndex: 100,
},

suggestionItem: {
  paddingHorizontal: 15,
  paddingVertical: 13,
  borderBottomWidth: 1,
  borderBottomColor: '#EEE',
},

suggestionMain: {
  fontSize: 14,
  fontWeight: '600',
  color: '#2D341F',
},

suggestionSecondary: {
  fontSize: 12,
  color: '#777',
  marginTop: 3,
},  
});

export default styles;

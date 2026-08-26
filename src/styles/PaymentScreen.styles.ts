import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F4EC',
  },

  header: {
    padding: 20,
  },

  stepText: {
    color: '#666',
  },

  title: {
    fontSize: 30,
    fontWeight: '700',
  },

  amountCard: {
    backgroundColor: '#EEF1FF',
    margin: 20,
    padding: 20,
    borderRadius: 14,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  amountLabel: {
    fontSize: 18,
  },

  amount: {
    fontSize: 28,
    fontWeight: '700',
    color: '#1E40AF',
  },

  offerCard: {
    backgroundColor: '#E7F8EA',
    marginHorizontal: 20,
    padding: 18,
    borderRadius: 14,
    marginBottom: 20,
  },

  offerTitle: {
    fontSize: 22,
    fontWeight: '700',
    color: 'green',
  },

  offerText: {
    marginTop: 5,
    color: '#444',
  },

  section: {
    fontSize: 22,
    fontWeight: '700',
    marginHorizontal: 20,
    marginBottom: 15,
  },

  paymentCard: {
    backgroundColor: '#FFF',
    marginHorizontal: 20,
    marginBottom: 15,
    borderRadius: 16,
    padding: 20,
    elevation: 2,
  },

  paymentTitle: {
    fontSize: 18,
    fontWeight: '700',
  },

  paymentSub: {
    color: '#666',
    marginTop: 5,
  },

  radio: {
    position: 'absolute',
    right: 20,
    top: 25,
    fontSize: 22,
  },

  bottomBar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#FFF',
    padding: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    alignItems: 'center',
    elevation: 10,
  },

  bottomAmount: {
    fontSize: 28,
    fontWeight: '700',
  },

  payButton: {
  backgroundColor: '#F59E0B',
  width: 220,
  height: 50,
  borderRadius: 10,
  justifyContent: 'center',
  alignItems: 'center',
},

  payText: {
    fontSize: 18,
    fontWeight: '700',
  },
  cancelButton: {
  flex: 1,
  backgroundColor: "#FFFFFF",
  borderWidth: 1,
  borderColor: "#C8942E",
  height: 50,
  borderRadius: 10,
  justifyContent: "center",
  alignItems: "center",
  marginRight: 10,
},

cancelText: {
  color: "#C8942E",
  fontSize: 18,
  fontWeight: "700",
},
priceRow:{
  flexDirection:"row",
  justifyContent:"space-between",
  marginVertical:8,
},
totalText: {
  fontSize: 18,
  fontWeight: "700",
  color: "#1F3A24",
},

totalAmount: {
  fontSize: 22,
  fontWeight: "800",
  color: "#2E7D32",
},
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
    /* ================================
     SUBSCRIPTION TERMS MODAL
  ================================= */

  termsOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.55)',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 18,
  },

  termsModal: {
    width: '100%',
    maxHeight: '90%',
    backgroundColor: '#FFFFFF',
    borderRadius: 22,
    padding: 20,

    elevation: 12,

    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.25,
    shadowRadius: 12,
  },

  termsTitle: {
    textAlign: 'center',
    fontSize: 21,
    fontWeight: '800',
    color: '#6B4F2A',
  },

  termsSubtitle: {
    textAlign: 'center',
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginTop: 4,
    marginBottom: 15,
  },

  termsScroll: {
    maxHeight: 430,
  },

  termsSection: {
    fontSize: 16,
    fontWeight: '700',
    color: '#3E2B1F',
    marginTop: 14,
    marginBottom: 7,
  },

  termsText: {
    fontSize: 14,
    lineHeight: 21,
    color: '#555',
    marginBottom: 7,
  },

  termsCheckboxRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginTop: 12,
    marginBottom: 15,
  },

  termsCheckbox: {
    width: 23,
    height: 23,
    borderWidth: 2,
    borderColor: '#6B4F2A',
    borderRadius: 5,
    marginRight: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },

  termsCheckboxChecked: {
    backgroundColor: '#6B4F2A',
  },

  termsCheckmark: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '800',
  },

  termsCheckboxText: {
    flex: 1,
    fontSize: 14,
    lineHeight: 20,
    color: '#333',
  },

  termsContinueButton: {
    height: 50,
    backgroundColor: '#6B4F2A',
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },

  termsContinueDisabled: {
    backgroundColor: '#B8B8B8',
  },

  termsContinueText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '700',
  },
  

});

export default styles;

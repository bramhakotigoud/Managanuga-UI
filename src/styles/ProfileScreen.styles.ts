import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F4EC',
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingBottom: 40,
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
  button: {
    backgroundColor: '#A84B21',
    padding: 15,
    borderRadius: 12,
    marginTop: 10,
    marginBottom: 30,
  },
  buttonText: {
    color: '#FFF',
    textAlign: 'center',
    fontWeight: '700',
    fontSize: 16,
  },
  menuItem: {
    backgroundColor: '#FFF',
    padding: 18,
    borderRadius: 12,
    marginBottom: 12,
  },
  menuText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#2D341F',
  },
  name: {
    fontSize: 22,
    fontWeight: '700',
    textAlign: 'center',
    marginBottom: 5,
    color: '#2D341F',
  },
  mobile: {
    color: '#666',
    textAlign: 'center',
    marginBottom: 20,
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 15,
  },
  statCard: {
    flex: 1,
    backgroundColor: '#FFF',
    padding: 15,
    borderRadius: 12,
    alignItems: 'center',
    marginHorizontal: 4,
  },
  statNumber: {
    fontSize: 20,
    fontWeight: '700',
    color: '#A84B21',
  },
  statLabel: {
    fontSize: 12,
    color: '#555',
    marginTop: 2,
  },
  avatar: {
    width: 90,
    height: 90,
    borderRadius: 45,
    backgroundColor: '#A84B21',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    marginTop: 20,
    marginBottom: 10,
  },
  avatarText: {
    color: '#FFF',
    fontSize: 32,
    fontWeight: '700',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    marginTop: 15,
    marginBottom: 10,
    color: '#2D341F',
  },
  guestHeader: {
    alignItems: 'center',
    marginTop: 40,
    marginBottom: 30,
  },
  guestAvatar: {
    fontSize: 70,
  },
  guestTitle: {
    fontSize: 24,
    fontWeight: '700',
    marginTop: 10,
  },
  guestSubtitle: {
    color: '#666',
    marginTop: 8,
    textAlign: 'center',
  },
  membershipIcon: {
  width: 22,
  height: 22,
  resizeMode: 'contain',
},
  popupOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 25,
  },

  popupContainer: {
    width: '100%',
    backgroundColor: '#FFF',
    borderRadius: 20,
    padding: 25,
    elevation: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.25,
    shadowRadius: 8,
  },

  popupTitle: {
    fontSize: 22,
    fontWeight: '700',
    color: '#2D341F',
    textAlign: 'center',
    marginBottom: 8,
  },

  popupSubtitle: {
    fontSize: 15,
    color: '#666',
    textAlign: 'center',
    marginBottom: 20,
  },

  nameInput: {
    borderWidth: 1,
    borderColor: '#DDD',
    borderRadius: 12,
    paddingHorizontal: 15,
    paddingVertical: 13,
    fontSize: 16,
    color: '#2D341F',
    backgroundColor: '#FAFAFA',
    marginBottom: 15,
  },

  saveNameButton: {
    backgroundColor: '#A84B21',
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center',
  },

  saveNameButtonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: '700',
  },
  accountHeader: {
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'space-between',
  marginTop: 15,
},

changePasswordLink: {
  color: '#A84B21',
  fontSize: 13,
  fontWeight: '700',
},

passwordOverlay: {
  position: 'absolute',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  backgroundColor: 'rgba(0,0,0,0.45)',
  justifyContent: 'center',
  alignItems: 'center',
  paddingHorizontal: 25,
  zIndex: 2000,
},

passwordModal: {
  width: '100%',
  backgroundColor: '#FFF',
  borderRadius: 20,
  padding: 22,
  elevation: 10,
  shadowColor: '#000',
  shadowOffset: {
    width: 0,
    height: 4,
  },
  shadowOpacity: 0.25,
  shadowRadius: 8,
},

passwordTitle: {
  fontSize: 21,
  fontWeight: '700',
  color: '#2D341F',
  textAlign: 'center',
  marginBottom: 20,
},

passwordInput: {
  height: 50,
  backgroundColor: '#FAFAFA',
  borderWidth: 1,
  borderColor: '#E0E0E0',
  borderRadius: 12,
  paddingHorizontal: 15,
  fontSize: 15,
  color: '#222',
  marginBottom: 12,
},

resetPasswordButton: {
  backgroundColor: '#A84B21',
  height: 50,
  borderRadius: 12,
  justifyContent: 'center',
  alignItems: 'center',
  marginTop: 5,
},

resetPasswordText: {
  color: '#FFF',
  fontSize: 15,
  fontWeight: '700',
},

cancelPasswordButton: {
  alignItems: 'center',
  marginTop: 14,
},

cancelPasswordText: {
  color: '#666',
  fontSize: 14,
  fontWeight: '600',
},
changePasswordButton: {
  backgroundColor: '#F5E6DD',
  paddingHorizontal: 12,
  paddingVertical: 7,
  borderRadius: 20,
},

changePasswordButtonText: {
  color: '#A84B21',
  fontSize: 12,
  fontWeight: '700',
},
avatarWrapper: {
  position: 'relative',
  width: 100,
  height: 100,
  alignSelf: 'center',
  marginBottom: 10,
},

avatarImage: {
  width: '100%',
  height: '100%',
  borderRadius: 50,
},

cameraButton: {
  position: 'absolute',
  right: -2,
  bottom: -2,
  width: 34,
  height: 34,
  borderRadius: 17,
  backgroundColor: 'transparent',
  alignItems: 'center',
  justifyContent: 'center',
  borderWidth: 3,
  borderColor: '#FFFFFF',
  elevation: 4,
  shadowColor: '#000',
  shadowOffset: {
    width: 0,
    height: 2,
  },
  shadowOpacity: 0.2,
  shadowRadius: 3,
},

avatarLoading: {
  position: 'absolute',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  borderRadius: 50,
  backgroundColor: 'rgba(0,0,0,0.4)',
  alignItems: 'center',
  justifyContent: 'center',
},
});

export default styles;

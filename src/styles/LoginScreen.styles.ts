import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({

  background: {
    flex: 1,
  },

  bgImage: {
    opacity: 0.88,
  },

  scrollContent: {
    paddingBottom: 80,
  },

  logoContainer: {
    alignItems: 'center',
    marginTop: 40,
    marginBottom: 10,
  },

  logo: {
    width: 220,
    height: 220,
    resizeMode: 'contain',
  },

  card: {
    backgroundColor:
      'rgba(255,255,255,0.95)',

    marginHorizontal: 18,
    marginTop: 20,
    padding: 18,
    borderRadius: 28,

    shadowColor: '#000',

    shadowOffset: {
      width: 0,
      height: 6,
    },

    shadowOpacity: 0.12,
    shadowRadius: 10,
    elevation: 8,
  },

  heading: {
    fontSize: 28,
    fontWeight: '800',
    color: '#2D341F',
  },

  subHeading: {
    fontSize: 14,
    color: '#666',
    marginTop: 5,
    marginBottom: 18,
  },

  input: {
    height: 50,
    backgroundColor: '#FFFDF8',
    borderWidth: 1,
    borderColor: '#E7D9C1',
    borderRadius: 15,
    paddingHorizontal: 15,
    marginBottom: 12,
    fontSize: 15,
  },

  loginButton: {
    backgroundColor: '#A84B21',
    height: 50,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },

  loginButtonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: '700',
  },

  errorText: {
    color: '#D32F2F',
    fontSize: 13,
    textAlign: 'center',
    marginTop: 6,
    marginBottom: 10,
    fontWeight: '600',
  },

  loginAgainButton: {
    marginTop: 12,
    backgroundColor: '#A84B21',
    height: 42,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },

  loginAgainText: {
    color: '#FFF',
    fontSize: 15,
    fontWeight: '700',
  },
resendContainer: {
  flexDirection: 'row',
  justifyContent: 'center',
  alignItems: 'center',
  marginTop: 2,
  marginBottom: 15,
},

resendText: {
  color: '#666',
  fontSize: 13,
},

resendActive: {
  color: '#A84B21',
  fontSize: 13,
  fontWeight: '700',
  marginLeft: 5,
},

resendDisabled: {
  color: '#999',
  fontSize: 13,
  fontWeight: '600',
  marginLeft: 5,
},
forgotPasswordText: {
  textAlign: 'right',
  color: '#A84B21',
  fontSize: 14,
  fontWeight: '700',
  marginTop: -5,
  marginBottom: 14,
},

});

export default styles;

import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F4EC',
  },

  header: {
    height: 58,
    backgroundColor: '#F8F4EC',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#eeeeee',
  },

  backButton: {
    width: 40,
    alignItems: 'flex-start',
    justifyContent: 'center',
  },

  headerTitle: {
    flex: 1,
    fontSize: 20,
    fontWeight: '700',
    color: '#222',
  },

  headerPlaceholder: {
    width: 40,
  },

  content: {
    paddingHorizontal: 20,
    paddingTop: 22,
    paddingBottom: 40,
  },

  question: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 12,
  },

  reasonSelector: {
    minHeight: 52,
    borderWidth: 1,
    borderColor: '#dddddd',
    borderRadius: 6,
    paddingHorizontal: 15,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#fff',
  },

  reasonText: {
    flex: 1,
    fontSize: 15,
    color: '#333',
  },

  placeholderText: {
    color: '#888',
  },

  reasonList: {
    borderWidth: 1,
    borderColor: '#dddddd',
    borderRadius: 6,
    marginTop: 5,
    backgroundColor: '#fff',
    overflow: 'hidden',
  },

  reasonItem: {
    paddingHorizontal: 15,
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: '#eeeeee',
  },

  reasonItemText: {
    fontSize: 15,
    color: '#333',
  },

  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#333',
    marginTop: 28,
    marginBottom: 12,
  },

  paragraph: {
    fontSize: 14,
    lineHeight: 21,
    color: '#666',
    marginBottom: 13,
  },

  infoBox: {
    marginTop: 8,
    padding: 16,
    backgroundColor: '#faf8f4',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#eee7dc',
  },

  infoTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: '#333',
    marginBottom: 10,
  },

  bullet: {
    fontSize: 14,
    lineHeight: 21,
    color: '#666',
    marginBottom: 7,
  },

  checkboxRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 24,
    paddingVertical: 8,
  },

  checkbox: {
    width: 22,
    height: 22,
    borderWidth: 1.5,
    borderColor: '#999',
    borderRadius: 3,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 11,
  },

  checkboxChecked: {
    backgroundColor: '#8B5E3C',
    borderColor: '#8B5E3C',
  },

  checkboxText: {
    flex: 1,
    fontSize: 14,
    lineHeight: 20,
    color: '#444',
  },

  deleteButton: {
    height: 52,
    borderRadius: 7,
    backgroundColor: '#8B5E3C',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 25,
  },

  deleteButtonDisabled: {
    backgroundColor: '#d8d8d8',
  },

  deleteButtonText: {
    fontSize: 15,
    fontWeight: '700',
    color: '#fff',
  },

  deleteButtonTextDisabled: {
    color: '#999',
  },
   logo: {
    width: 32,
    height: 32,
    resizeMode: 'contain',
    marginRight: 8,
  },
  brandContainer: {
    flexDirection: 'row',
    alignItems: 'center',
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
});

export default styles;
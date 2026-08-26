import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF8EE",
  },

  header: {
    height: 60,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 18,
    backgroundColor: "#F8F4EC",
  },

  back: {
    fontSize: 38,
    color: "#A84B21",
    lineHeight: 40,
  },

  headerTitle: {
    fontSize: 19,
    fontWeight: "800",
    color: "#2D341F",
  },

  content: {
    padding: 20,
  },

  walletCard: {
    backgroundColor: "#FFF",
    borderRadius: 22,
    paddingVertical: 35,
    paddingHorizontal: 20,
    alignItems: "center",

    borderWidth: 2,
    borderColor: "#D4AF37",

    shadowColor: "#D4AF37",
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.25,
    shadowRadius: 10,

    elevation: 6,
  },

  walletIcon: {
    fontSize: 42,
    marginBottom: 12,
  },

  label: {
    fontSize: 14,
    color: "#777",
    fontWeight: "600",
  },

  balance: {
    fontSize: 36,
    fontWeight: "900",
    color: "#A84B21",
    marginTop: 8,
  },

  walletId: {
    marginTop: 12,
    color: "#888",
    fontSize: 12,
  },
});

export default styles;

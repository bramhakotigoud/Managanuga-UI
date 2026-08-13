import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Alert,
  Share,
  Clipboard,
  StyleSheet,
} from "react-native";

interface Props {
  resellerId: number | string;
}

export default function ReferralContent({
  resellerId = "001",
}: Props) {
  const referralUrl = `https://managanuga.store/register?reseller=${resellerId}`;

  // Copy Referral Link
  const handleCopyLink = () => {
    Clipboard.setString(referralUrl);

    Alert.alert(
      "Success",
      "Referral link copied"
    );
  };

  // Share Referral Link
  const handleShare = async () => {
    try {
      await Share.share({
        message: `Register on Mana Ganuga using my referral link: ${referralUrl}`,
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View style={styles.container}>

      {/* ================= MAIN REFERRAL CARD ================= */}

      <View style={styles.mainCard}>

        {/* Title */}

        <View style={styles.titleSection}>
          <Text style={styles.title}>
            Referral Module
          </Text>

          <View style={styles.titleUnderline} />
        </View>


        {/* ================= RESELLER ID ================= */}

        <View style={styles.idBox}>

          <View style={styles.idAvatar}>
            <Text style={{ fontSize: 20 }}>
              👤
            </Text>
          </View>

          <View>
            <Text style={styles.label}>
              Reseller ID
            </Text>

            <Text style={styles.id}>
              {resellerId}
            </Text>
          </View>

        </View>


        {/* ================= REFERRAL LINK ================= */}

        <Text style={styles.linkLabel}>
          Your Referral Link
        </Text>

        <View style={styles.linkBox}>

          <Text style={styles.linkIcon}>
            🔗
          </Text>

          <Text
            style={styles.link}
            numberOfLines={1}
          >
            {referralUrl}
          </Text>

          <TouchableOpacity
            onPress={handleCopyLink}
            style={styles.smallCopyButton}
          >
            <Text style={{ fontSize: 16 }}>
              📋
            </Text>
          </TouchableOpacity>

        </View>


        {/* ================= COPY BUTTON ================= */}

        <TouchableOpacity
          style={styles.copyBtn}
          onPress={handleCopyLink}
        >
          <Text style={styles.copyIcon}>
            📤
          </Text>

          <Text style={styles.copyText}>
            Copy Referral Link
          </Text>
        </TouchableOpacity>

      </View>


      {/* ================= SHARE CARD ================= */}

      <View style={styles.shareCard}>

        <View style={styles.shareLeft}>

          <View style={styles.networkIconBg}>
            <Text style={{ fontSize: 18 }}>
              👥
            </Text>
          </View>

          <View style={{ flex: 1 }}>

            <Text style={styles.shareTitle}>
              Grow your network
            </Text>

            <Text style={styles.subtitle}>
              Share your link and earn more
            </Text>

          </View>

        </View>


        {/* Share Button */}

        <TouchableOpacity
          style={styles.shareBtn}
          onPress={handleShare}
        >
          <Text style={styles.shareIcon}>
            🔗
          </Text>

          <Text style={styles.shareBtnText}>
            Share Now
          </Text>
        </TouchableOpacity>

      </View>

    </View>
  );
}


/* ========================================================= */
/* STYLES                                                     */
/* ========================================================= */

const styles = StyleSheet.create({

  /* ================= CONTAINER ================= */

  container: {
    paddingHorizontal: 16,
    paddingBottom: 24,
  },


  /* ================= MAIN CARD ================= */

  mainCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 20,
    padding: 20,
    elevation: 3,

    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.06,
    shadowRadius: 8,

    marginBottom: 16,
  },


  /* ================= TITLE ================= */

  titleSection: {
    marginBottom: 16,
  },

  title: {
    fontSize: 22,
    fontWeight: "800",
    color: "#1F2617",
  },

  titleUnderline: {
    width: 36,
    height: 3,
    backgroundColor: "#2B3A23",
    marginTop: 4,
    borderRadius: 2,
  },


  /* ================= RESELLER ID ================= */

  idBox: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FAF6F0",
    borderRadius: 14,
    paddingHorizontal: 12,
    paddingVertical: 10,
    marginBottom: 16,
  },

  idAvatar: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: "#EFE8DC",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 10,
  },

  label: {
    fontSize: 11,
    color: "#777",
    fontWeight: "500",
  },

  id: {
    fontSize: 16,
    fontWeight: "800",
    color: "#222",
    marginTop: 2,
  },


  /* ================= REFERRAL LINK ================= */

  linkLabel: {
    fontSize: 12,
    color: "#666",
    marginBottom: 6,
    fontWeight: "500",
  },

  linkBox: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FAF6F0",
    borderRadius: 12,
    paddingHorizontal: 10,
    paddingVertical: 10,
    borderWidth: 1,
    borderColor: "#EFE5D8",
    marginBottom: 16,
  },

  linkIcon: {
    fontSize: 16,
    marginRight: 6,
  },

  link: {
    flex: 1,
    fontSize: 11,
    color: "#8C2D04",
    fontWeight: "600",
    marginRight: 6,
  },

  smallCopyButton: {
    padding: 2,
  },


  /* ================= COPY BUTTON ================= */

  copyBtn: {
    backgroundColor: "#8C2D04",
    borderRadius: 12,
    paddingVertical: 12,
    paddingHorizontal: 14,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },

  copyIcon: {
    fontSize: 16,
    marginRight: 6,
    color: "#FFFFFF",
  },

  copyText: {
    color: "#FFFFFF",
    fontSize: 13,
    fontWeight: "700",
  },


  /* ================= SHARE CARD ================= */

  shareCard: {
    backgroundColor: "#F5F2EA",
    borderRadius: 16,
    padding: 16,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  shareLeft: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
    marginRight: 8,
  },

  networkIconBg: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#E2DDD0",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 10,
  },

  shareTitle: {
    fontSize: 14,
    fontWeight: "700",
    color: "#1F2617",
  },

  subtitle: {
    fontSize: 11,
    color: "#666",
    marginTop: 2,
  },


  /* ================= SHARE BUTTON ================= */

  shareBtn: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#3A4B2D",
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 8,
    backgroundColor: "transparent",
  },

  shareIcon: {
    fontSize: 14,
    marginRight: 4,
  },

  shareBtnText: {
    fontSize: 12,
    fontWeight: "700",
    color: "#2B3A23",
  },

});
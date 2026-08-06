import React from "react";
import {
  Alert,
  TouchableOpacity,
  View,
  Text,
  Clipboard,
  StyleSheet,
  Share,
} from "react-native";

interface Props {
  vendorId: number | string;
}

export default function ReferralContent({ vendorId = 100 }: Props) {
  const referralUrl = `https://managanuga.store/register?vendor=${vendorId}`;
;

  // Copy Link Handler
  const handleCopyLink = () => {
    Clipboard.setString(referralUrl);
    Alert.alert("Success", "Referral link copied.");
  };

  // Native Share Handler
  const handleShare = async () => {
    try {
      await Share.share({
        message: `Register on Mana Ganuga using my referral link: ${referralUrl}`,
      });
    } catch (error) {
      console.log("Error sharing link:", error);
    }
  };

  return (
    <View style={styles.container}>
      {/* ========================================================= */}
      {/* MAIN REFERRAL MODULE CARD                                 */}
      {/* ========================================================= */}
      <View style={styles.mainCard}>
        {/* Title Header with Accent Underline */}
        <View style={styles.titleSection}>
          <Text style={styles.titleText}>Referral Module</Text>
          <View style={styles.titleUnderline} />
        </View>

        <View style={styles.cardContentRow}>
          {/* FULL WIDTH COLUMN */}
          <View style={styles.fullWidthColumn}>
            {/* Vendor ID Box */}
            <View style={styles.vendorIdBox}>
              <View style={styles.idAvatar}>
                <Text style={{ fontSize: 20 }}>👤</Text>
              </View>
              <View>
                <Text style={styles.vendorIdLabel}>Vendor ID</Text>
                <Text style={styles.vendorIdValue}>{vendorId}</Text>
              </View>
            </View>

            {/* Referral Link Label & Input Box */}
            <Text style={styles.linkLabel}>Your Referral Link</Text>

            <View style={styles.linkContainer}>
              <Text style={{ fontSize: 16, marginRight: 6 }}>🔗</Text>
              <Text style={styles.linkText} numberOfLines={1}>
                {referralUrl}
              </Text>
              <TouchableOpacity onPress={handleCopyLink} style={{ padding: 2 }}>
                <Text style={{ fontSize: 16 }}>📋</Text>
              </TouchableOpacity>
            </View>

            {/* Copy Button */}
            <TouchableOpacity style={styles.copyBtn} onPress={handleCopyLink}>
              <Text style={{ fontSize: 16, marginRight: 6, color: "#FFF" }}>
                📤
              </Text>
              <Text style={styles.copyBtnText}>Copy Referral Link</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>

      {/* ========================================================= */}
      {/* BOTTOM CARD: GROW YOUR NETWORK                            */}
      {/* ========================================================= */}
      <View style={styles.shareCard}>
        <View style={styles.shareLeft}>
          <View style={styles.networkIconBg}>
            <Text style={{ fontSize: 18 }}>👥</Text>
          </View>
          <View style={{ flex: 1 }}>
            <Text style={styles.shareTitle}>Grow your network</Text>
            <Text style={styles.shareSubtitle}>
              Share your link and earn more
            </Text>
          </View>
        </View>

        <TouchableOpacity style={styles.shareBtn} onPress={handleShare}>
          <Text style={{ fontSize: 14, marginRight: 4 }}>🔗</Text>
          <Text style={styles.shareBtnText}>Share Now</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    paddingBottom: 24,
  },
  /* Main Card */
  mainCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 20,
    padding: 20,
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    marginBottom: 16,
  },
  titleSection: {
    marginBottom: 16,
  },
  titleText: {
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
  cardContentRow: {
    flexDirection: "row",
  },
  fullWidthColumn: {
    flex: 1,
  },

  /* Vendor ID Box */
  vendorIdBox: {
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
  vendorIdLabel: {
    fontSize: 11,
    color: "#777",
    fontWeight: "500",
  },
  vendorIdValue: {
    fontSize: 16,
    fontWeight: "800",
    color: "#222",
  },

  /* Link Container */
  linkLabel: {
    fontSize: 12,
    color: "#666",
    marginBottom: 6,
    fontWeight: "500",
  },
  linkContainer: {
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
  linkText: {
    flex: 1,
    fontSize: 11,
    color: "#8C2D04",
    fontWeight: "600",
    marginRight: 6,
  },

  /* Copy Button */
  copyBtn: {
    backgroundColor: "#8C2D04",
    borderRadius: 12,
    paddingVertical: 12,
    paddingHorizontal: 14,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  copyBtnText: {
    color: "#FFFFFF",
    fontSize: 13,
    fontWeight: "700",
  },

  /* Bottom Share Card */
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
  shareSubtitle: {
    fontSize: 11,
    color: "#666",
    marginTop: 2,
  },
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
  shareBtnText: {
    fontSize: 12,
    fontWeight: "700",
    color: "#2B3A23",
  },
});
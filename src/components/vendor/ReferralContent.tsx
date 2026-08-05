import React from "react";
import Clipboard from "@react-native-clipboard/clipboard";
import { Alert, TouchableOpacity } from "react-native";
import {
  View,
  Text,
} from "react-native";
interface Props {
  vendorId: number;
}

export default function ReferralContent({
  vendorId,
}: Props) {

  return (
  <View style={{ padding: 20 }}>

    <Text
      style={{
        fontSize: 26,
        fontWeight: "700",
      }}
    >
      Referral Module
    </Text>

    <Text
      style={{
        marginTop: 20,
        fontSize: 18,
      }}
    >
      Vendor ID : {vendorId}
    </Text>

    <Text
      style={{
        marginTop: 20,
        fontSize: 16,
        color: "#666",
      }}
    >
      Referral Link
    </Text>

    <Text
      selectable
      style={{
        marginTop: 10,
        color: "#A84B21",
        fontWeight: "700",
      }}
    >
      {`https://managanuga.store/register?vendor=${vendorId}`}
    </Text>

    <TouchableOpacity
      style={{
        marginTop: 25,
        backgroundColor: "#A84B21",
        paddingVertical: 12,
        borderRadius: 10,
        alignItems: "center",
      }}
      onPress={() => {
        Clipboard.setString(
          `https://managanuga.store/register?vendor=${vendorId}`
        );

        Alert.alert(
          "Success",
          "Referral link copied."
        );
      }}
    >
      <Text
        style={{
          color: "#FFF",
          fontWeight: "700",
          fontSize: 16,
        }}
      >
        Copy Referral Link
      </Text>
    </TouchableOpacity>

  </View>
);
}
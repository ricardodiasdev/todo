import React from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import styles from "./styles";

//Ícones

import logo from "../../assets/logo.png";
import bell from "../../assets/bell.png";
import qrcode from "../../assets/qrcode.png";
import back from "../../assets/back.png";

export default function Header({
  showNotification,
  showBack,
  late,
  pressNotification,
  navigation,
}) {

  function BackToHome() {
    navigation.navigate("Home");
  }

  function OpenQrCode(){
    navigation.navigate("QRCode");
  }

  return (
    <View style={styles.header}>
      {showBack ? (
        <TouchableOpacity style={styles.leftIcon} onPress={BackToHome}>
          <Image source={back} style={styles.leftIconImage} />
        </TouchableOpacity>
      ) : (
        <TouchableOpacity style={styles.leftIcon} onPress={OpenQrCode}>
          <Image source={qrcode} style={styles.leftIconImage} />
        </TouchableOpacity>
      )}
      <Image style={styles.logoMarca} source={logo} />
      {showNotification && late > 0 && (
        <TouchableOpacity
          style={styles.notification}
          onPress={pressNotification}
        >
          <Image source={bell} style={styles.notificationImage} />
          <View style={styles.circle}>
            <Text style={styles.notificationText}>{late}</Text>
          </View>
        </TouchableOpacity>
      )}
    </View>
  );
}

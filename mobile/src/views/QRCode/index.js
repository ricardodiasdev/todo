import React, { useState, useEffect } from "react";
import { Text, View, TouchableOpacity, Alert, StyleSheet } from "react-native";

import { BarCodeScanner } from "expo-barcode-scanner";
import * as Application from "expo-application";

import styles from "./styles";

export default function QrCode({ navigation }) {
  const [hasPermission, sethasPermission] = useState(null);
  const [scanned, setScanned] = useState();

  async function getMacAddress() {
    if (Platform.OS === "ios") {
      Application.getIosIdForVendorAsync().then((id) => {
        Alert.alert(`Seu número é: ${id}`);
      });
    } else {
      Alert.alert(`Seu número é: ${Application.androidId}`);
    }
  }

  useEffect(() => {
    async function getPermission() {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      sethasPermission(status === "granted");
    }
    getPermission();
  }, []);

  function handleBarCodeScanned({ data }) {
    setScanned(true);
    if (data === "getmacaddress") {
      getMacAddress();
    } else {
      Alert.alert("QrCode inválido.");
    }
  }

  return (
    <View style={styles.container}>
      <BarCodeScanner
        onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
        style={StyleSheet.absoluteFillObject}
      />
      <View style={styles.header}>
        <Text style={styles.headerText}>Conectar com minha conta na web</Text>
      </View>
      <View style={styles.containerButtons}>
        <TouchableOpacity
          style={styles.buttonBack}
          onPress={() => navigation.navigate("Home")}
        >
          <Text style={styles.textButton}>VOLTAR</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={scanned ? styles.buttonScanActive : styles.buttonScanInative}
          onPress={() => setScanned(false)}
        >
          <Text style={styles.textButton}>SCAN NOVAMENTE</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

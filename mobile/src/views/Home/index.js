import React from "react";
import { View, Text } from "react-native";

import styles from "./styles";

import Header from "../../components/Header";

//Componentes


export default function Home() {
  return (
    <View style={styles.container}>
      <Header showNotification={true} showBack={false}/>
      <Text>Bem vindo a tela Home</Text>
    </View>
  );
}

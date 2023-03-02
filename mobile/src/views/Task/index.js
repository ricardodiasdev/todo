import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  KeyboardAvoidingView,
  TouchableOpacity,
  Switch,
  Image,
  ScrollView,
  Alert,
} from "react-native";

import Header from "../../components/Header";
import Footer from "../../components/Footer";
import DateTimeInput from "../../components/DateTimeInput";

import styles from "./styles";

import typeIcons from "../../utils/typeIcons";

import api from "../../services/api";

export default function Task({ navigation }) {
  const [done, setDone] = useState(false);
  const [type, setType] = useState();
  const [title, setTitle] = useState();
  const [description, setDescription] = useState();
  const [date, setDate] = useState();
  const [hour, setHour] = useState();
  const [macaddress, setMacaddress] = useState("22:22:22:22:22:22");

  async function NewTask() {
    if (!title) return Alert.alert("Defina o nome da tarefa");
    if (!description) return Alert.alert("Defina a descrição da tarefa");
    if (!type) return Alert.alert("Defina o tipo da tarefa");
    if (!date) return Alert.alert("Defina a data da tarefa");
    if (!hour) return Alert.alert("Defina a hora da tarefa");

    await api
      .post("/task", {
        macaddress: macaddress,
        type: type,
        title: title,
        description: description,
        when: `${date}T${hour}.000`,
      })
      .then(() => navigation.navigate("Home"))
      .catch((error) => console.log(error));
  }

  return (
    <KeyboardAvoidingView behavior="padding" style={styles.container}>
      <Header showBack={true} navigation={navigation} />
      <ScrollView style={{ width: "100%" }}>
        <ScrollView
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          style={{ marginVertical: 10 }}
        >
          {typeIcons.map(
            (icon, index) =>
              icon !== null && (
                <TouchableOpacity key={index} onPress={() => setType(index)}>
                  <Image
                    source={icon}
                    style={[
                      styles.imageIcon,
                      type && type != index && styles.typeIconInative,
                    ]}
                    setType={index}
                  />
                </TouchableOpacity>
              )
          )}
        </ScrollView>
        <Text style={styles.label}>Título</Text>
        <TextInput
          style={styles.input}
          maxLength={30}
          placeholder="Lembre-me de fazer..."
          onChangeText={(text) => setTitle(text)}
          value={title}
        />
        <Text style={styles.label}>Detalhes</Text>
        <TextInput
          style={styles.inputArea}
          maxLength={200}
          multiline={true}
          placeholder="Detalhes da atividade que eu tenho que lembrar..."
          onChangeText={(text) => setDescription(text)}
          value={description}
        />
        <DateTimeInput type={"date"} save={setDate} />
        <DateTimeInput type={"time"} save={setHour} />
        <View style={styles.inLine}>
          <View style={styles.inputInline}>
            <Switch
              onValueChange={() => setDone(!done)}
              value={done}
              thumbColor={done ? "#00761B" : "#EE6B26"}
            />
            <Text style={styles.switchLabel}>Concluído</Text>
          </View>
          <TouchableOpacity>
            <Text style={styles.removeLabel}>EXCLUIR</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
      <Footer icon={"save"} onPress={NewTask} />
    </KeyboardAvoidingView>
  );
}

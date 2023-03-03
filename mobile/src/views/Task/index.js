import React, { useEffect, useState } from "react";
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
  ActivityIndicator,
} from "react-native";

import Header from "../../components/Header";
import Footer from "../../components/Footer";
import DateTimeInput from "../../components/DateTimeInput";

import styles from "./styles";

import typeIcons from "../../utils/typeIcons";

import api from "../../services/api";

import * as Application from "expo-application";

export default function Task({ navigation }) {
  const [id, setId] = useState();
  const [done, setDone] = useState(false);
  const [type, setType] = useState();
  const [title, setTitle] = useState();
  const [description, setDescription] = useState();
  const [date, setDate] = useState();
  const [hour, setHour] = useState();
  const [macaddress, setMacaddress] = useState();
  const [load, setLoad] = useState(true);

  useEffect(() => {
    async function getMacAddress() {
      if (Platform.OS === "ios") {
        Application.getIosIdForVendorAsync().then((id) => {
          setMacaddress(id);
          setLoad(false);
        });
      } else {
        setMacaddress(Application.androidId);
        setLoad(false);
      }
    }
    getMacAddress();
    if (navigation.state.params) {
      setId(navigation.state.params.idtask);
    }
  }, [macaddress]);

  useEffect(() => {
    async function LoadTask() {
      setLoad(true);
      await api.get(`task/${id}`).then((response) => {
        setDone(response.data.done);
        setType(response.data.type);
        setTitle(response.data.title);
        setDescription(response.data.description);
        setDate(response.data.when);
        setHour(response.data.when);
      });
    }
    LoadTask()
    .then(() =>  setLoad(false))
    .catch((error) => console.log(error));

  }, [id]);

  async function handleSaveTask() {
    if (!title) return Alert.alert("Defina o nome da tarefa");
    if (!description) return Alert.alert("Defina a descrição da tarefa");
    if (!type) return Alert.alert("Defina o tipo da tarefa");
    if (!date) return Alert.alert("Defina a data da tarefa");
    if (!hour) return Alert.alert("Defina a hora da tarefa");

    if(id){
      await api
      .put(`/task/${id}`, {
        macaddress: macaddress,
        done: done,
        type: type,
        title: title,
        description: description,
        when: `${date}T${hour}.000`,
      })
      .then(() => navigation.navigate("Home"))
      .catch((error) => console.log(error));
    } else {
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
  }

  async function removeTask(){
    await api.delete(`/task/${id}`)
    .then(() => navigation.navigate("Home"))
    .catch((error) => console.log(error));
  }

  async function handleRemoveTask(){
    Alert.alert(
      'Remover Tarefa',
      'A tarefa será removida',
      [
        {text: 'Cancelar'},
        {text: 'Confirmar', onPress: () => removeTask()},
      ],
      {cancelable: true}
    )
  }

  return (
    <KeyboardAvoidingView behavior="padding" style={styles.container}>
      <Header showBack={true} navigation={navigation} />
      {load ? (
        <ActivityIndicator color="#EE6B26" size={50} />
      ) : (
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
          <DateTimeInput type={"date"} save={setDate} date={date} />
          <DateTimeInput type={"time"} save={setHour} hour={hour} />
          {id && (
            <View style={styles.inLine}>
              <View style={styles.inputInline}>
                <Switch
                  onValueChange={() => setDone(!done)}
                  value={done}
                  thumbColor={done ? "#00761B" : "#EE6B26"}
                />
                <Text style={styles.switchLabel}>Concluído</Text>
              </View>
              <TouchableOpacity onPress={handleRemoveTask}>
                <Text style={styles.removeLabel}>EXCLUIR</Text>
              </TouchableOpacity>
            </View>
          )}
        </ScrollView>
      )}
      <Footer icon={"save"} onPress={handleSaveTask} />
    </KeyboardAvoidingView>
  );
}

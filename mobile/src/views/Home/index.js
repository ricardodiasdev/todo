import React, { useState, useEffect } from "react";
import { View, Text, ScrollView, ActivityIndicator, TouchableOpacity } from "react-native";

import styles from "./styles";

//Componentes
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import TaskCard from "../../components/TaskCard";


import api from "../../services/api";

import * as Application from "expo-application";


export default function Home({ navigation }) {
  const [filter, setFilter] = useState();
  const [tasks, setTasks] = useState([]);
  const [load, setLoad] = useState(false);
  const [lateCount, setLateCount] = useState();
  const [macaddress, setMacaddress] = useState();

  useEffect(() => {
    async function getMacAddress() {
      if (Platform.OS === "ios") {
        Application.getIosIdForVendorAsync().then((id) => {
          setMacaddress(id);
        });
      } else {
        setMacaddress(Application.androidId);
      }
    }
    getMacAddress().then(() => setFilter('today'));
  },[]);

  useEffect(() => {
    async function loadTasks() {
      setLoad(true);
      await api
        .get(`/task/filter/${filter}/${macaddress}`)
        .then((response) => {
          setTasks(response.data);
          setLoad(false);
        })
        .catch((error) => console.log(error));
    }
    loadTasks();
  }, [filter]);

  useEffect(() => {
    async function lateVerify() {
      setLoad(true);
      await api
        .get(`/task/filter/late/${macaddress}`)
        .then((response) => {
          setLateCount(response.data.length);
          setLoad(false);
        })
        .catch((error) => console.log(error));
    }
    lateVerify();
  }, [filter]);

  function Notification() {
    setFilter("late");
  }

  function NewTask() {
    navigation.navigate("Task");
  }

  function ShowTask(id){
    navigation.navigate("Task", {idtask: id});
  }

  return (
    <View style={styles.container}>
      <Header
        showNotification={true}
        showBack={false}
        pressNotification={Notification}
        late={lateCount}
      />
      <View style={styles.filter}>
        <TouchableOpacity onPress={() => setFilter("all")}>
          <Text
            style={
              filter === "all"
                ? styles.filterTextActived
                : styles.filterTextInactived
            }
          >
            Todos
          </Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setFilter("today")}>
          <Text
            style={
              filter === "today"
                ? styles.filterTextActived
                : styles.filterTextInactived
            }
          >
            Hoje
          </Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setFilter("week")}>
          <Text
            style={
              filter === "week"
                ? styles.filterTextActived
                : styles.filterTextInactived
            }
          >
            Semana
          </Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setFilter("month")}>
          <Text
            style={
              filter === "month"
                ? styles.filterTextActived
                : styles.filterTextInactived
            }
          >
            Mês
          </Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setFilter("year")}>
          <Text
            style={
              filter === "year"
                ? styles.filterTextActived
                : styles.filterTextInactived
            }
          >
            Ano
          </Text>
        </TouchableOpacity>
      </View>
      <View style={styles.title}>
        <Text style={styles.titleText}>
          TAREFAS {filter == "late" && " ATRASADAS"}
        </Text>
      </View>
      <ScrollView
        style={styles.content}
        contentContainerStyle={{ alignItems: "center" }}
      >
        {load ? (
          <ActivityIndicator color="#EE6B26" size={50} />
        ) : (
          tasks.map((task) => (
            <TaskCard
              done={task.done}
              title={task.title}
              when={task.when}
              type={task.type}
              onPress={() => ShowTask(task._id)}
            />
          ))
        )}
      </ScrollView>
      <Footer icon={"add"} onPress={NewTask} />
    </View>
  );
}

import React, { useState, useEffect } from "react";
import { TouchableOpacity, Image, TextInput, Alert } from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";

import { format, isPast } from "date-fns";

import styles from "./styles";

import iconCalendar from "../../assets/calendar.png";
import iconClock from "../../assets/clock.png";

export default function DateTimeInput({ type, save, date, hour }) {
  const [dateTime, setDateTime] = useState();
  const [show, setShow] = useState(false);
  const [mode, setMode] = useState("date");

  const newTime = (event, value) => {
    const currentDate = value || dateTime;
    if (type == "date") {
      if(isPast(new Date(currentDate))){
        Alert.alert('Você não pode escolher uma data passada')
      } else {
        setShow(false);
        setDateTime(format(new Date(currentDate), "dd/MM/yyyy"));
        save(format(new Date(currentDate), "yyyy-MM-dd"));
      }
    } else  {
      setShow(false);
      setDateTime(format(new Date(currentDate), "HH:mm"));
      save(format(new Date(currentDate), "HH:mm:ss"));
    }
  };

  async function selectDataOrHour() {

    if (type == "date") {
      setShow(true);
      setMode("date");
    } else {
      setShow(true);
      setMode("time");
    }
  }

  useEffect(() => {
    async function showDateAndHour() {
      if (type === "date" && date) {
        setDateTime(format(new Date(date), "dd/MM/yyyy"));
        save(format(new Date(date), "yyyy-MM-dd"));
      }
      if (type === "time" && hour) {
        setDateTime(format(new Date(hour), "HH:mm"));
        save(format(new Date(hour), "HH:mm:ss"));
      }
    }
    showDateAndHour();
  });

  return (
    <TouchableOpacity onPress={selectDataOrHour}>
      <TextInput
        style={styles.input}
        placeholder={
          type == "date"
            ? "Clique aqui para definir a data..."
            : "Clique aqui para definir a hora..."
        }
        editable={false}
        value={dateTime}
      />
      {show && (
        <DateTimePicker
          value={new Date()}
          mode={mode}
          is24Hour={true}
          display="default"
          onChange={newTime}
        />
      )}
      <Image
        style={styles.iconTextInput}
        source={type == "date" ? iconCalendar : iconClock}
      />
    </TouchableOpacity>
  );
}

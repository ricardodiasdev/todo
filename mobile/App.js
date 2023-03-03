import React from "react";
import { createAppContainer, createSwitchNavigator } from "react-navigation";

import { LogBox} from 'react-native';
LogBox.ignoreAllLogs();

import Home from "./src/views/Home";
import Task from "./src/views/Task";



const Routes = createAppContainer(
  createSwitchNavigator({
    Home,
    Task,
  })
);

export default function App() {
  return (
    <>
      <Routes />
    </>
  );
}

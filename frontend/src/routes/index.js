import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "../views/Home";
import Task from "../views/Task";

export default function Path() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" exact element={<Home/>} />
        <Route path="/task"  element={<Task/>} />
        <Route path="/task/:id"  element={<Task/>} />

      </Routes>
    </BrowserRouter>
  );
}

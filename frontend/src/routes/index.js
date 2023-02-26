import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "../views/Home";
import Task from "../views/Task";
import QrCode from "../views/QrCode";

export default function Path() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/task"  exact element={<Task/>} />
        <Route path="/task/:id"  element={<Task/>} />
        <Route path="/qrcode"  element={<QrCode/>} />
      </Routes>
    </BrowserRouter>
  );
}

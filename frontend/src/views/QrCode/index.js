import React, { useState } from "react";
import * as S from "./styles";

import Qr from "qrcode.react";

import Header from "../../components/Header";
import Footer from "../../components/Footer";

import { useNavigate } from "react-router-dom";

import { toast } from "react-toastify";

function QrCode() {
  const [mac, setMac] = useState();
  const navigate = useNavigate();

  function handleSaveMac() {
    if (!mac) {
      toast.warn("Você precisa digitar o número que apareceu no celular!");
    } else {
      localStorage.setItem("@todo/macaddress", mac);
      toast.success("Mac Address salvo com sucesso!");
      navigate("/");
      setTimeout(() => window.location.reload(), 2000);
      ;
    }
  }

  return (
    <S.Container>
      <Header />
      <S.Content>
        <h1>CAPTURE O QRCODE PELO APP</h1>
        <p>Suas atividades serão sincronizadas com as do seu celular</p>
        <S.QrCodeArea>
          <Qr value="getmacaddress" size={350} />
        </S.QrCodeArea>
        <S.ValidationCode>
          <span>Digite a numeração que apareceu no celular</span>
          <input
            type="text"
            onChange={(e) => setMac(e.target.value)}
            value={mac}
          />
          <button onClick={handleSaveMac}>Sincronizar</button>
        </S.ValidationCode>
      </S.Content>
      <Footer />
    </S.Container>
  );
}

export default QrCode;

import React, { useEffect, useState } from "react";
import * as S from "./styles";

import api from "../../services/api";

import { Link } from "react-router-dom";

import logo from "../../assets/logo.png";
import bell from "../../assets/bell.png";

import isConnected from "../../utils/IsConnected";

function Header({ clickBell }) {
  const [lateCount, setLateCount] = useState();

  useEffect(() => {
    async function lateVerify() {
      await api.get(`/task/filter/late/22:22:22:22:22:22`).then((response) => {
        setLateCount(response.data.length);
      });
    }
    lateVerify();
  }, []);

  async function Logout() {
    localStorage.removeItem("@todo/macaddress");
    window.location.reload();
  }

  return (
    <S.Container>
      <S.LeftSide>
        <img src={logo} alt="Logomarca" />
      </S.LeftSide>
      <S.RightSide>
        <Link to={"/"}>INÍCIO</Link>
        <span className="divider">|</span>
        <Link to={"/task"}>NOVA TAREFA</Link>
        <span className="divider">|</span>
        {!isConnected ? (
          <Link to={"/qrcode"}>SINCRONIZAR TAREFA</Link>
        ) : (
          <button onClick={Logout}>SAIR</button>
        )}
        {lateCount && (
          <>
            <span className="divider">|</span>
            <button id="notification" onClick={clickBell}>
              <img src={bell} alt="Notificação" />
              <span>{lateCount}</span>
            </button>
          </>
        )}
      </S.RightSide>
    </S.Container>
  );
}

export default Header;

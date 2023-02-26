import React from "react";
import * as S from "./styles";

import { Link } from "react-router-dom";

import logo from "../../assets/logo.png";
import bell from "../../assets/bell.png";

function Header({lateCount, clickBell}) {
  return (
    <S.Container>
      <S.LeftSide>
        <img src={logo} alt="Logomarca" />
      </S.LeftSide>
      <S.RightSide>
        <Link to={'/'}>INÍCIO</Link>
        <span className="divider">|</span>
        <Link to={'/task'}>NOVA TAREFA</Link>
        <span className="divider">|</span>
        <Link to={'/qrcode'}>SINCRONIZAR TAREFA</Link>
        <span className="divider">|</span>
        <button id="notification" onClick={clickBell}>
          <img src={bell} alt="Notificação" />
          <span>{lateCount}</span>
        </button>
      </S.RightSide>
    </S.Container>
  );
}

export default Header;

import React from "react";
import * as S from "./styles";

import logo from "../../assets/logo.png";
import bell from "../../assets/bell.png";

function Header({lateCount, clickBell}) {
  return (
    <S.Container>
      <S.LeftSide>
        <img src={logo} alt="Logomarca" />
      </S.LeftSide>
      <S.RightSide>
        <a href="#">INÍCIO</a>
        <span className="divider">|</span>
        <a href="#">NOVA TAREFA</a>
        <span className="divider">|</span>
        <a href="#">SINCRONIZAR TAREFA</a>
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

import React from "react";
import * as S from "./styles";

import iconDefault from '../../assets/default.png'

function TaskCard() {
  return (
    <S.Container>
      <S.TopCard>
        <img src={iconDefault} alt="Icone da tarefa" />
        <h3>Título da Tarefa</h3>
      </S.TopCard>
      <S.BottomCard>
        <strong>01/01/2023</strong>
        <span>10:00</span>
      </S.BottomCard>
    </S.Container>
  );
}

export default TaskCard;

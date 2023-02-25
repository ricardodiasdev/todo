import React, { useState, useEffect } from "react";
import * as S from "./styles";

import api from "../../services/api";

import Header from "../../components/Header";
import Footer from "../../components/Footer";

import TypeIcons from "../../utils/typeIcons";

import iconCalender from "../../assets/calendar.png";
import iconClock from "../../assets/clock.png";

function Task() {
  const [lateCount, setLateCount] = useState();
  const [type, setType] = useState();

  useEffect(() => {
    async function lateVerify() {
      await api.get(`/task/filter/late/22:22:22:22:22:22`).then((response) => {
        setLateCount(response.data.length);
      });
    }
    lateVerify();
  }, []);

  return (
    <S.Container>
      <Header lateCount={lateCount} />
      <S.Form>
        <S.TypeIcons>
          {TypeIcons.map(
            (icon, index) =>
              index > 0 && (
                <button type="button" onClick={() => setType(index)}>
                  <img
                    src={icon}
                    alt="Tipo da Tarefa"
                    className={type && type !== index && "inative"}
                  />
                </button>
              )
          )}
        </S.TypeIcons>
        <S.Input>
          <span>Título</span>
          <input type="text" placeholder="Título da tarefa"></input>
        </S.Input>
        <S.TextArea>
          <span>Título</span>
          <textarea rows={5} placeholder="Detalhes da tarefa"></textarea>
        </S.TextArea>
        <S.Input>
          <span>Data</span>
          <input type="date"  placeholder="Título da tarefa"></input>
        {/* <img src={iconCalender} alt="Calendário" /> */}
        </S.Input>
        <S.Input>
          <span>Hora</span>
          <input type="time" placeholder="Título da tarefa"></input>
        { /* <img src={iconClock} alt="Relógio" /> */}
        </S.Input>
        <S.Options>
          <div>
            <input type="checkbox" />
            <span>CONCLUÍDO</span>    
          </div>
          <button>EXCLUIR</button>
        </S.Options>
        <S.Save>
          <button>SALVAR</button>
        </S.Save>
      </S.Form>
      <Footer />
    </S.Container>
  );
}

export default Task;

import React, { useState, useEffect } from "react";
import * as S from "./styles";

import api from "../../services/api";

import Header from "../../components/Header";
import Footer from "../../components/Footer";
import FilterCard from "../../components/FilterCard";
import TaskCard from "../../components/TaskCards";

function Home() {
  const [filterActived, setFilterActived] = useState('all');
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    async function loadTasks() {
      await api
        .get(`/task/filter/${filterActived}/22:22:22:22:22:22`)
        .then((response) => {
          setTasks(response.data);
          console.log(response.data);
        });
    }
    loadTasks();
  }, [filterActived]);

  return (
    <S.Container>
      <Header />
      <S.FilterArea>
        <FilterCard
          title="Todos"
          actived={filterActived === "all"}
          onClick={() => setFilterActived("all")}
        />
        <FilterCard
          title="Hoje"
          actived={filterActived === "today"}
          onClick={() => setFilterActived("today")}
        />
        <FilterCard
          title="Semana"
          actived={filterActived === "week"}
          onClick={() => setFilterActived("week")}
        />
        <FilterCard
          title="Mês"
          actived={filterActived === "month"}
          onClick={() => setFilterActived("month")}
        />
        <FilterCard
          title="Ano"
          actived={filterActived === "year"}
          onClick={() => setFilterActived("year")}
        />
      </S.FilterArea>
      <S.Title>
        <h3>TAREFAS</h3>
      </S.Title>
      <S.Content>
        {tasks.map((t) => (
          <TaskCard type={t.type} title={t.title} when={t.when} />
        ))}
      </S.Content>
      <Footer />
    </S.Container>
  );
}

export default Home;

import React, { useState, useEffect } from "react";
import * as S from "./styles";
import { Link } from "react-router-dom";

import api from "../../services/api";

import Header from "../../components/Header";
import Footer from "../../components/Footer";
import FilterCard from "../../components/FilterCard";
import TaskCard from "../../components/TaskCards";
import isConnected from "../../utils/IsConnected";

function Home() {
  const [filterActived, setFilterActived] = useState("all");
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    async function loadTasks() {
      await api
        .get(`/task/filter/${filterActived}/${isConnected}`)
        .then((response) => {
          setTasks(response.data);
        });
    }
    loadTasks();
  }, [filterActived]);

 

  function handleClickBell() {
    setFilterActived("late");
  }

  return (
    <S.Container>
      <Header  clickBell={handleClickBell} />
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
        <h3>{filterActived === "late" ? "TAREFAS ATRASADAS" : "TAREFAS"}</h3>
      </S.Title>
      <S.Content>
        {tasks.map((t) => (
          <Link  to={`/task/${t._id}`}>
            <TaskCard type={t.type} title={t.title} when={t.when} done={t.done}/>
          </Link>
        ))}
      </S.Content>
      <Footer />
    </S.Container>
  );
}

export default Home;

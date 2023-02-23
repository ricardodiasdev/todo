import React, { useState } from "react";
import * as S from "./styles";

import Header from "../../components/Header";
import Footer from "../../components/Footer";
import FilterCard from "../../components/FilterCard";
import TaskCard from "../../components/TaskCards";

function Home() {
  const [filterActived, setFilterActived] = useState();
  return (
    <S.Container>
      <Header />
      <S.FilterArea>
        <FilterCard
          title="Todos"
          actived={filterActived === "all" ? true : false}
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
        <TaskCard />
        <TaskCard />
        <TaskCard />
        <TaskCard />
        <TaskCard />
        <TaskCard />
        <TaskCard />
        <TaskCard />
        <TaskCard />
        <TaskCard />
      </S.Content>
      <Footer />
    </S.Container>
  );
}

export default Home;

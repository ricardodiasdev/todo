import React, { useState, useEffect } from "react";

import { useParams, useNavigate } from "react-router-dom";
import * as S from "./styles";

import api from "../../services/api";

import Header from "../../components/Header";
import Footer from "../../components/Footer";

import TypeIcons from "../../utils/typeIcons";
import { toast } from "react-toastify";
import { format } from "date-fns";
import swal from "sweetalert";

// import iconCalender from "../../assets/calendar.png";
// import iconClock from "../../assets/clock.png";

function Task() {
  const [lateCount, setLateCount] = useState();
  const [type, setType] = useState();
  const [id, setId] = useState();
  const [done, setDone] = useState(false);
  const [title, setTitle] = useState();
  const [description, setDescription] = useState();
  const [date, setDate] = useState();
  const [hour, setHour] = useState();
  const [macaddress, setMacaddress] = useState("22:22:22:22:22:22");

  let params = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    async function lateVerify() {
      await api.get(`/task/filter/late/22:22:22:22:22:22`).then((response) => {
        setLateCount(response.data.length);
      });
    }
    lateVerify();
  });

  useEffect(() => {
    async function LoadTaskDetail() {
      await api.get(`/task/${params.id}`).then((response) => {
        setType(response.data.type);
        setTitle(response.data.title);
        setDone(response.data.done);
        setDescription(response.data.description);
        setDate(format(new Date(response.data.when), "yyyy-MM-dd"));
        setHour(format(new Date(response.data.when), "HH:mm"));
      });
    }
    LoadTaskDetail();
  }, [params.id]);

  async function handleUpdateButton() {
    await api
      .put(`/task/${params.id}`, {
        macaddress,
        done,
        type,
        title,
        description,
        when: `${date}T${hour}:00.000`,
      })
      .then(() => {
        toast.success("Tarefa atualizada com sucesso!");
        navigate("/");
      })
      .catch(() => {
        toast.warn(
          "Clique na tarefa e preencha todos os campos corretamente..."
        );
      });
  }

  async function handleSaveButton() {
    await api
      .post(`/task`, {
        macaddress,
        type,
        title,
        description,
        when: `${date}T${hour}:00.000`,
      })
      .then(() => {
        toast.success("Tarefa cadastrada com sucesso!");
        navigate("/");
      })
      .catch(() => {
        toast.warn(
          "Clique na tarefa e preencha todos os campos corretamente..."
        );
      });
  }

  async function DeleteTask() {
    await api.delete(`/task/${params.id}`);
  }

  function HandleDeleteButton() {
    // await api.delete(`/task/${params.id}`)
    swal({
      title: "Você tem certeza?",
      text: "Uma vez apagada, você não pode recuperar a tarefa!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        swal("Tarefa apagada com sucesso!", {
          icon: "success",
        });
        DeleteTask();
        navigate("/");
      } else {
        swal("Continue atualizando!");
      }
    });
  }

  return (
    <S.Container>
      <Header lateCount={lateCount} />
      <S.Form>
        <S.TypeIcons>
          {TypeIcons.map(
            (icon, index) =>
              index > 0 && (
                <button key={id} type="button" onClick={() => setType(index)}>
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
          <input
            type="text"
            placeholder="Título da tarefa"
            onChange={(e) => setTitle(e.target.value)}
            value={title}
          />
        </S.Input>
        <S.TextArea>
          <span>Descrição</span>
          <textarea
            rows={5}
            placeholder="Detalhes da tarefa"
            onChange={(e) => setDescription(e.target.value)}
            value={description}
          />
        </S.TextArea>
        <S.Input>
          <span>Data</span>
          <input
            type="date"
            placeholder="Título da tarefa"
            onChange={(e) => setDate(e.target.value)}
            value={date}
          />
          {/* <img src={iconCalender} alt="Calendário" /> */}
        </S.Input>
        <S.Input>
          <span>Hora</span>
          <input
            type="time"
            placeholder="Título da tarefa"
            onChange={(e) => setHour(e.target.value)}
            value={hour}
          />
          {/* <img src={iconClock} alt="Relógio" /> */}
        </S.Input>
        <S.Options>
          <div>
            <input
              type="checkbox"
              checked={done}
              onChange={() => setDone(!done)}
            />
            <span>CONCLUÍDO</span>
          </div>
          {params.id && <button onClick={HandleDeleteButton}>EXCLUIR</button>}
        </S.Options>
        {!params.id ? (
          <S.Save onClick={handleSaveButton}>
            <button>SALVAR</button>
          </S.Save>
        ) : (
          <S.Save onClick={handleUpdateButton}>
            <button>ATUALIZAR</button>
          </S.Save>
        )}
      </S.Form>
      <Footer />
    </S.Container>
  );
}

export default Task;

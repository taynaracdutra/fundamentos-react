import React, { useState, useEffect } from "react";
import "./style.css";
import { Card } from "../../components/Card";

export function Home() {
  const [studentName, setStudentName] = useState("");
  const [students, setStudents] = useState([]);
  const [user, setUser] = useState({ name: "", avatar: "" });

  function handleAddStudent() {
    const newStudent = {
      name: studentName,
      time: new Date().toLocaleTimeString("pt-br", {
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
      }),
    };

    setStudents((prevState) => [...prevState, newStudent]);
  }

  useEffect(() => {
    async function fetchData() {
      const response = await fetch(
        "https://api.github.com/users/taynaracdutra"
      );
      const data = await response.json();

      setUser({
        name: data.name,
        avatar: data.avatar_url,
      });
    }
    fetchData();
  }, []);
  /*
  --- estrutura useEffect ---
  -- é executado assim que a interface é renderizada

  useEffect((
    corpo do useEffect
  ) => {}, [
    array de dependência. 
    Toda vez que o estado muda, o useEffect é executado.
    Aqui irão os estados que o useEffect depende. 
    Se deixar vazio, executa uma única vez
  ]);  
  */

  return (
    <>
      <div className="container">
        <header>
          <h1>Lista de Presença</h1>

          <div>
            <img src={user.avatar} alt="Foto de Perfil" />
            <strong>{user.name}</strong>{" "}
          </div>
        </header>

        <div className="body-insert">
          <input
            type="text"
            name=""
            id=""
            placeholder="Digite o nome"
            onChange={(e) => setStudentName(e.target.value)}
          />
          <button type="button" onClick={handleAddStudent}>
            Adicionar
          </button>
        </div>

        <div className="body-list">
          {students.map((student) => (
            <Card key={student.time} name={student.name} time={student.time} />
          ))}
        </div>
      </div>
    </>
  );
}

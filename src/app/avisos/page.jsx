"use client";

import { useState, useEffect } from "react";
import { io } from "socket.io-client";

const socket = io("https://backend-avisos-port4000.up.railway.app");

export default function Home() {
  const [avisos, setAvisos] = useState([]);

  useEffect(() => {
    socket.on("avisos", (novosAvisos) => {
      // Verifica e converte a data antes de ordenar
      const avisosOrdenados = [...novosAvisos]
        .map(aviso => ({
          ...aviso,
          data: parseDate(aviso.data) // Converte a data corretamente
        }))
        .sort((a, b) => b.data - a.data); // Ordena do mais novo para o mais antigo

      setAvisos(avisosOrdenados);
    });

    return () => {
      socket.off("avisos");
    };
  }, []);

  // Função para converter diferentes formatos de data
  function parseDate(dateString) {
    if (!dateString) return new Date(0); // Se não houver data, retorna uma data padrão

    // Se já for um formato válido, retorna a data
    let date = new Date(dateString);
    if (!isNaN(date.getTime())) return date;

    // Se estiver no formato DD/MM/YYYY, precisamos converter
    const parts = dateString.split("/");
    if (parts.length === 3) {
      const [day, month, year] = parts;
      return new Date(`${year}-${month}-${day}`);
    }

    return new Date(0); // Retorna uma data inválida se não conseguir converter
  }

  return (
    <div className="flex flex-col items-center justify-start h-screen bg-white">
      {/* Cabeçalho com fundo vermelho */}
      <div style={{ backgroundImage: 'url(/BG1.svg)' }} className="w-full h-40 flex items-center justify-center relative bg-center">
        <h1 className="text-white text-[3rem] font-extrabold">AVISOS</h1>
      </div>

      {/* Texto de Avisos */}
      <div className="mt-10 text-center">
        <p className="text-lg text-black font-medium">Veja nossos avisos:</p>
        <div className="w-20 h-1 bg-black mt-1 mx-auto"></div>
      </div>

      <div className="flex flex-wrap justify-center gap-4 w-full max-w-5xl pt-10 pb-10">
        {avisos.length === 0 ? (
          <p className="text-gray-500 text-center w-full">Nenhum aviso disponível.</p>
        ) : (
          avisos.map((aviso, index) => (
            <div 
              key={index} 
              className="bg-white shadow-lg rounded-lg p-4 w-64 flex flex-col items-center"
            >
              <p className="text-lg text-center">{aviso.texto}</p>
              {aviso.imagem && <img src={aviso.imagem} alt="Aviso" className="mt-2 w-full rounded" />}
              <span className="text-sm text-gray-500 mt-2">
                {aviso.data.toLocaleString("pt-BR")}
              </span>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

"use client";

import { useState, useEffect } from "react";
import { io } from "socket.io-client";

const socket = io("https://backend-avisos-port4000.up.railway.app");

export default function VerEventos() {
  const [eventos, setEventos] = useState([]);

  useEffect(() => {
    // 🔹 1. Buscar eventos do backend ao carregar a página
    async function fetchEventos() {
      try {
        const response = await fetch("https://backend-avisos-port4000.up.railway.app/eventos");
        const data = await response.json();

        // Ordena os eventos pela data antes de salvar
        const eventosOrdenados = data
          .map(evento => ({
            ...evento,
            data: parseDate(evento.data)
          }))
          .sort((a, b) => b.data - a.data);

        setEventos(eventosOrdenados);
      } catch (error) {
        console.error("Erro ao buscar eventos:", error);
      }
    }

    fetchEventos();

    // 🔹 2. Escutar novos eventos via WebSocket
    socket.on("eventos", (novosEventos) => {
      setEventos((eventosAtuais) => {
        const todosEventos = [...eventosAtuais, ...novosEventos].map(evento => ({
          ...evento,
          data: parseDate(evento.data)
        }));
        
        return todosEventos.sort((a, b) => b.data - a.data);
      });
    });

    return () => {
      socket.off("eventos");
    };
  }, []);

  function parseDate(dateString) {
    if (!dateString) return new Date(0);

    let date = new Date(dateString);
    if (!isNaN(date.getTime())) return date;

    const parts = dateString.split("/");
    if (parts.length === 3) {
      const [day, month, year] = parts;
      return new Date(`${year}-${month}-${day}`);
    }

    return new Date(0);
  }

  return (
    <div className="flex flex-col items-center justify-start h-screen bg-white">
      <div 
        style={{ backgroundImage: 'url(/BG1.svg)' }} 
        className="w-full h-40 flex items-center justify-center relative bg-center"
      >
        <h1 className="text-white text-[3rem] font-extrabold">EVENTOS</h1>
      </div>

      <div className="mt-10 text-center">
        <p className="text-lg text-black font-medium">Veja nossos eventos:</p>
        <div className="w-20 h-1 bg-black mt-1 mx-auto"></div>
      </div>

      <div className="flex flex-wrap justify-center gap-4 w-full max-w-5xl pt-10 pb-10">
        {eventos.length === 0 ? (
          <p className="text-gray-500 text-center w-full">Nenhum evento disponível.</p>,
          <p className="text-gray-500 text-center w-full">Se não tiver aparecendo nenhum aviso, atualize a página.</p>
        ) : (
          eventos.map((evento, index) => (
            <div 
              key={index} 
              className="bg-white shadow-lg rounded-lg p-4 w-64 flex flex-col items-center"
            >
              <p className="text-lg text-center text-[#000]">{evento.texto}</p>
              {evento.imagem && <img src={evento.imagem} alt="Evento" className="mt-2 w-full rounded" />}
              <span className="text-sm text-gray-500 mt-2">
                {evento.data.toLocaleString("pt-BR")}
              </span>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

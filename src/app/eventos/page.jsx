"use client";

import { useState, useEffect } from "react";
import { io } from "socket.io-client";
import Link from "next/link";
import { Menu, X } from "lucide-react";

const socket = io("https://backend-avisos-port4000.up.railway.app");

export default function VerEventos() {
  const [eventos, setEventos] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [eventoSelecionado, setEventoSelecionado] = useState(null);

  useEffect(() => {
    async function fetchEventos() {
      try {
        const response = await fetch("https://backend-avisos-port4000.up.railway.app/eventos");
        if (!response.ok) throw new Error("Erro ao buscar eventos");
        const data = await response.json();
        atualizarEventos(data);
      } catch (error) {
        console.error("Erro ao buscar eventos:", error);
      }
    }
    fetchEventos();

    socket.on("eventos", (novosEventos) => {
      atualizarEventos(novosEventos);
    });

    return () => {
      socket.off("eventos");
    };
  }, []);

  function atualizarEventos(novosEventos) {
    if (!Array.isArray(novosEventos)) return;
    const eventosOrdenados = novosEventos
      .map((evento) => ({
        manchete: evento.manchete || "Evento sem título",
        resumo: evento.resumo || "Nenhum resumo disponível.",
        conteudo: evento.conteudo || "Nenhum conteúdo disponível.",
        imagem: evento.imagem || "",
        data: parseDate(evento.data),
      }))
      .sort((a, b) => b.data - a.data);
    setEventos(eventosOrdenados);
  }

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
    <div className="flex flex-col items-center bg-white min-h-screen">
      <div
        style={{ backgroundImage: "url(/BG1.svg)" }}
        className="w-full h-40 flex items-center justify-center relative bg-center"
      >
        <h1 className="text-white text-[3rem] font-extrabold">EVENTOS</h1>
        <button onClick={() => setIsOpen(!isOpen)} className="absolute top-4 left-4 text-white">
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
        <ul
          className={`absolute top-40 left-0 w-full bg-white shadow-md transition-all duration-300 ease-in-out ${
            isOpen ? "block" : "hidden"
          }`}
        >
          <li className="p-4 text-[#820202] border-b border-gray-300">
            <Link href="/">Início</Link>
          </li>
          <li className="p-4 text-[#820202] border-b border-gray-300">
            <Link href="/avisos">Avisos</Link>
          </li>
          <li className="p-4 text-[#820202] border-b border-gray-300">
            <Link href="/eventos">Eventos</Link>
          </li>
          <li className="p-4 text-[#820202] border-b border-gray-300">
            <Link href="/missas">Missas</Link>
          </li>
          <li className="p-4 text-[#820202] border-b border-gray-300">
            <Link href="/pastorais">Pastorais</Link>
          </li>
        </ul>
      </div>

      <div className="mt-10 text-center">
        <p className="text-lg text-black font-medium">Veja nossos eventos:</p>
        <div className="w-20 h-1 bg-black mt-1 mx-auto"></div>
      </div>

      <div className="w-full max-w-4xl space-y-6 p-6">
        {eventos.length === 0 ? (
          <p className="text-gray-500 text-center">
            Nenhum evento disponível.<br />Se não tiver aparecendo nenhum evento, atualize a página.
          </p>
        ) : (
          eventos.map((evento, index) => (
            <div key={index} className="bg-gray-100 p-4 rounded-lg shadow-md">
              <h2 className="text-xl font-bold text-[#000]">{evento.manchete}</h2>
              <p className="text-gray-600">{evento.resumo}</p>
              <button
                onClick={() => setEventoSelecionado(evento)}
                className="text-blue-600 mt-2 hover:underline"
              >
                Ver mais
              </button>
            </div>
          ))
        )}
      </div>

      {eventoSelecionado && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg w-96 shadow-lg">
            <h2 className="text-2xl font-bold text-[#000]">{eventoSelecionado.manchete}</h2>
            <p className="mt-2 text-[#000]">{eventoSelecionado.conteudo}</p>
            {eventoSelecionado.imagem && (
              <img
                src={eventoSelecionado.imagem}
                alt="Imagem do evento"
                className="mt-4 w-full rounded"
              />
            )}
            <span className="text-sm text-gray-500 mt-2 block">
              {eventoSelecionado.data.toLocaleString("pt-BR")}
            </span>
            <button
              onClick={() => setEventoSelecionado(null)}
              className="mt-4 bg-red-500 text-white px-4 py-2 rounded"
            >
              Fechar
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

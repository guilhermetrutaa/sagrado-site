"use client";

import React, { useState } from 'react'; 
import Link from "next/link";
import Image from 'next/image';
import { Menu, X } from "lucide-react";

const page = () => {

  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="flex flex-col items-center justify-start min-h-screen bg-white">
      {/* Cabeçalho com fundo vermelho */}
      <div style={{ backgroundImage: 'url(/BG2.svg)' }} className="w-full h-40 flex items-center justify-center relative bg-center lg:hidden">
        <h1 className="text-white text-[3rem] font-extrabold">PASTORAIS</h1>
      </div>
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

      <div style={{ backgroundImage: 'url(/BG2-LAPTOP.svg)' }} className="w-full h-40 flex items-center justify-center relative bg-center sm:hidden md:hidden lg:flex">
        <h1 className="text-white text-[3rem] font-extrabold">PASTORAIS</h1>
      </div>

     <div>
      <div className="mt-10 text-center">
        <p className="text-lg text-black font-medium">VEJA TODAS AS<br />NOSSAS PASTORAIS</p>
        <div className="w-20 h-1 bg-black mt-1 mx-auto"></div>
      </div>

      <div className='pt-[2rem]'>
        <Image src="/pascom.svg" alt="Pascom" width={267} height={208} className='rounded-[1rem]'/>
        <p className='text-[1.2rem] text-[#000] text-center font-semibold pt-[1rem]'>Pascom</p>
      </div>

      <div className='pt-[2rem] pb-[2rem]'>
        <Image src="/coroinhas.svg" alt="Coroinhas" width={266} height={168} className='rounded-[1rem]'/>
        <p className='text-[1.2rem] text-[#000] text-center font-semibold pt-[1rem]'>Coroinhas</p>
        <p className='text-[#000] text-[0.80rem] text-center'>@coroinhas.pscj_</p>
      </div>
    </div>
    </div>


  )
}

export default page

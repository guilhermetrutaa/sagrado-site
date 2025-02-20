'use client';

import React from 'react';
import { useState } from 'react';
import Link from 'next/link';
import { Menu, X } from 'lucide-react';
import Image from 'next/image';
import Inicio from './components/Inicio';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div>
      <nav className="bg-white shadow-md p-4">
        <div className="container mx-auto flex justify-between items-center">
          <div className="flex items-center">
            <Image src="/logo-sagrado.svg" alt="LogoSagrado" width={54} height={54} />
            <p className="ml-2 font-semibold text-[#820202]">Sagrado Coração de Jesus</p>
          </div>
          <button onClick={() => setIsOpen(!isOpen)} className="md:hidden text-[#820202]">
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
          <ul className={`md:flex md:space-x-6 absolute md:static top-16 left-0 w-full md:w-auto bg-white shadow-md md:shadow-none transition-all duration-300 ease-in-out ${isOpen ? 'block' : 'hidden'}`}>
            <li className="p-4 md:p-0 text-[#820202]"><Link href="/">Início</Link></li>
            <li className="p-4 md:p-0 text-[#820202]"><Link href="/avisos">Avisos</Link></li>
            <li className="p-4 md:p-0 text-[#820202]"><Link href="/eventos">Eventos</Link></li>
            <li className="p-4 md:p-0 text-[#820202]"><Link href="/missas">Missas</Link></li>
            <li className="p-4 md:p-0 text-[#820202]"><Link href="/pastorais">Pastorais</Link></li>
          </ul>
        </div>
      </nav>

      <div>
        <Inicio />
      </div>
    </div>
  );
}

export default Navbar;

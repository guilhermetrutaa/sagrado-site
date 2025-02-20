import React from 'react'

const page = () => {
  return (
    <div className="flex flex-col items-center justify-start min-h-screen bg-white">
      {/* Cabeçalho com fundo vermelho */}
      <div style={{ backgroundImage: 'url(/BG2.svg)' }} className="w-full h-40 flex items-center justify-center relative bg-center lg:hidden">
        <h1 className="text-white text-[3rem] font-extrabold">MISSAS</h1>
      </div>

      <div style={{ backgroundImage: 'url(/BG2-LAPTOP.svg)' }} className="w-full h-40 flex items-center justify-center relative bg-center sm:hidden md:hidden lg:flex">
        <h1 className="text-white text-[3rem] font-extrabold">MISSAS</h1>
      </div>

     <div className='lg:hidden'>
      {/* Texto de Avisos */}
      <div className="mt-10 text-center">
        <p className="text-lg text-black font-medium">HORÁRIOS MISSAS</p>
        <div className="w-20 h-1 bg-black mt-1 mx-auto"></div>
      </div>

      <div className='pt-5'>
        <div className='bg-[#820202] w-[20rem] flex py-3 text-[#fff] font-medium rounded-[1rem] justify-center items-center gap-8'>
            <p>SEGUNDA</p>
            <p className='font-bold'>NÃO TEM MISSA</p>
        </div>
      </div>

      <div className='pt-5'>
        <div className='bg-[#820202] w-[20rem] flex py-3 text-[#fff] font-medium rounded-[1rem] justify-center items-center gap-24'>
            <p>TERÇA</p>
            <p className='font-bold'>18:00 HORAS</p>
        </div>
      </div>

      <div className='pt-5'>
        <div className='bg-[#820202] w-[20rem] flex py-3 text-[#fff] font-medium rounded-[1rem] justify-center items-center gap-20'>
            <p>QUARTA</p>
            <p className='font-bold'>18:00 HORAS</p>
        </div>
      </div>

      <div className='pt-5'>
        <div className='bg-[#820202] w-[20rem] flex py-3 text-[#fff] font-medium rounded-[1rem] justify-center items-center gap-5'>
            <p>QUINTA <span className='text-[0.75rem]'>(Hora da Graça)</span></p>
            <p className='font-bold'>19:00 HORAS</p>
        </div>
      </div>

      <div className='pt-5'>
        <div className='bg-[#820202] w-[20rem] flex py-3 text-[#fff] font-medium rounded-[1rem] justify-center items-center gap-20'>
            <p>SEXTA</p>
            <p className='font-bold'>18:00 HORAS</p>
        </div>
      </div>

      <div className='mt-5 mb-10'>
        <button className=' border-[#820202] p-3 px-[2.7rem] rounded-[1rem] text-[1rem] text-[#820202] tracking-[0.15rem] font-medium border-[0.20rem]'>
            Baixar agenda do mês
        </button>
      </div>
      </div>

    <div className='sm:hidden md:hidden lg:block'>
        <div className="bg-gray-100 p-6 rounded-lg shadow-md w-[70rem] mx-auto mt-6 mb-6">
        <h2 className="text-xl font-bold mb-4 border-b-2 pb-2">CALENDÁRIO MISSAS</h2>
        <div className="grid grid-cols-2 gap-4 md:grid-cols-3">
          {[
            { dia: "SEGUNDA", horario: "NÃO TEM MISSA" },
            { dia: "TERÇA", horario: "18:00 HORAS" },
            { dia: "QUARTA", horario: "18:00 HORAS" },
            { dia: "QUINTA", horario: "19:00 HORAS" },
            { dia: "SEXTA", horario: "18:00 HORAS" },
            { dia: "SÁBADO", horario: "18:00 HORAS" },
            { dia: "DOMINGO", horario: "9:00 HORAS\n17:00 HORAS\n19:30 HORAS" },
          ].map((item, index) => (
            <div
              key={index}
              className="bg-red-800 text-white p-4 rounded-lg text-center font-semibold"
            >
              <p className="uppercase text-sm">{item.dia}</p>
              <p className="text-lg whitespace-pre-line">{item.horario}</p>
            </div>
          ))}
        </div>
        <button className="mt-4 w-full border border-red-800 text-red-800 py-2 rounded-lg hover:bg-red-800 hover:text-white transition">
          Baixar agenda do mês
        </button>
      </div>
    </div>
    </div>


  )
}

export default page

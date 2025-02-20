import React from 'react';
import Image from 'next/image';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const images = [
  '/image-1.svg',
  '/image-2.svg',
  '/image-3.svg',
];

const Inicio = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    arrows: false,
    appendDots: dots => (
      <div>
        <ul className="flex justify-center space-x-2 mt-4"> {dots} </ul>
      </div>
    ),
    customPaging: i => (
      <div className="w-3 h-3 bg-red-800 rounded-full"></div>
    )
  };

  return (
    <div className='pt-16 px-4 bg-[#fff]'>
      <h1 className='text-[2rem] font-medium text-center'>BEM VINDO(A) AO</h1>
      <div className='flex justify-center items-center pt-2'>
        <h2 className='text-[2.5rem] font-medium max-w-[20rem] text-center'>AO SITE DO <span className='font-bold text-[#820202]'>SAGRADO CORAÇÃO DE JESUS!</span></h2>
      </div>
      <div className='flex justify-center items-center pt-5'>
        <p className='font-medium text-[1rem] text-center max-w-[16rem]'>Aqui você encontrará atualizações sobre nossas missas, avisos, eventos e muito mais. Fique por dentro de tudo que acontece em nossa comunidade!</p>
      </div>
      <div className='flex justify-center items-center pt-5'>
        <button className=' border-[#820202] p-4 px-14 rounded-[1rem] text-[1.2rem] text-[#820202] tracking-[0.10rem] font-medium border-[0.20rem]'>
            Saiba Mais
        </button>
      </div>
      
      <div className='max-w-md mx-auto pt-8 px-4 mb-10'> 
        <Slider {...settings} className='outline-none'>
          {images.map((src, index) => (
            <div key={index} className='flex justify-center'>
              <Image src={src} alt={`Imagem ${index + 1}`} width={500} height={500} className='rounded-xl object-cover'/>
            </div>
          ))}
        </Slider>
      </div>
    </div>
  )
}

export default Inicio;

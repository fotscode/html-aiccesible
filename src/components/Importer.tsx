import React from 'react';
import { Button } from '@nextui-org/react'
import { roboto } from '@/app/fonts'
import Link from 'next/link'

interface Props {
  state: boolean;
  setState: (val: boolean) => void;
}

const Importer: React.FC<Props> = ({ state, setState }) => {

  const togglePopup = () => {
    setState(!state);
  };

  return (
    <div className="popup flex flex-col bg-gray-300 px-10 py-8 rounded-[10px] mx-3 my-3 md:max-w-[500px]">
      
      <h2 className={`${roboto.className} text-center card-title font-medium pb-3`}>
        Examinar página web
      </h2>


      <div className="px-3 md:px-0 flex flex-row justify-center">
        <Button
          style={{
            backgroundColor: '#E44D25',
            color: 'white',
            fontSize: '12pt',
          }}
          className='sm:px-5 mx-1 sm:text-xl'
          as={Link}
          href='/selection'
        >
          Obtener código HTML
        </Button>
        <Button
          style={{
            backgroundColor: '#E44D25',
            color: 'white',
            fontSize: '12pt',
          }}
          className='sm:px-5 mx-1 sm:text-xl'
          onClick={togglePopup}
        >
          Atrás
        </Button>
      </div>
    </div>
  );
};

export default Importer;

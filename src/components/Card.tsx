import React from 'react';
import { roboto } from '@/app/fonts'

interface CardProps {
  title: string;
  description: string;
  image?: string;
}

const Card: React.FC<CardProps> = ({ title, description, image }) => {
  return (
    <div className="card flex flex-row md:flex-col bg-gray-300 md:px-10 md:py-8 rounded-[20px] mx-3 my-3">
      {image && (
        <div className="md:w-1/4">
          <img src={image} alt={title} className="card-image md:pb-3 min-w-[50px]" />
        </div>
      )}

      <div className="px-3 md:px-0 flex flex-col justify-center">
        <h2 className={`${roboto.className} text-sm md:text-base card-title font-medium pb-3`}>{title}</h2>
        <p className="card-description text-sm md:text-base">{description}</p>
      </div>
    </div>
  );
};

export default Card;

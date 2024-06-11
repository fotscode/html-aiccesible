import React from 'react';
import { roboto } from '@/app/fonts'

interface CardProps {
  title: string;
  description: string;
  image?: string;
}

const Card: React.FC<CardProps> = ({ title, description, image }) => {
  return (
    <div className="card max-w-[300px] bg-gray-300 px-10 py-8 rounded-[20px]">
      {image && (
        <img src={image} alt={title} className="card-image max-w-[64px] pb-3" />
      )}
      <h2 className={`${roboto.className} card-title font-medium pb-3`}>{title}</h2>

      <p className="card-description">{description}</p>
    </div>
  );
};

export default Card;

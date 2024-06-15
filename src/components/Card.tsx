import React from 'react'
import { roboto } from '@/app/fonts'

interface CardProps {
  title: string
  description: string
  image?: string
  handleClick?: (event: React.MouseEvent<HTMLDivElement>) => void
}

const Card: React.FC<CardProps> = ({
  title,
  description,
  image,
  handleClick,
}) => {
  return (
    <article
      className={
        handleClick
          ? 'flex flex-row md:flex-col card bg-gray-300 md:px-10 md:py-8 rounded-[20px] mx-3 my-3 md:max-w-[300px] cursor-pointer'
          : '' + ' flex flex-row md:flex-col'
      }
      onClick={handleClick}
    >
      {image && (
        <section className='md:w-1/4'>
          <img
            src={image}
            alt={title}
            className='card-image md:pb-3 min-w-[50px]'
          />
        </section>
      )}

      <section className='px-3 md:px-0 flex flex-col justify-center'>
        <h2
          className={`${roboto.className} text-sm md:text-base card-title font-medium pb-3`}
        >
          {title}
        </h2>
        <p className='card-description text-sm md:text-base'>{description}</p>
      </section>
    </article>
  )
}

export default Card

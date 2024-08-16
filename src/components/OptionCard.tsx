import React from 'react'
import { roboto } from '@/app/fonts'
import {
  Card,
  CardBody,
} from '@nextui-org/react'

interface CardProps {
  title: string
  description: string
  image?: string
  alt: string
}

const OptionCard: React.FC<CardProps> = ({
  title,
  description,
  image,
  alt,
}) => {
  return (
    <Card className='card flex flex-row md:flex-col md:px-10 md:py-8 rounded-[20px] mx-3 my-3 md:max-w-[300px] cursor-pointer'>
      {image && (
        <img
          src={image}
          alt={alt}
          className='md:pb-3 min-w-[50px] md:w-1/4'
        />
      )}

      <CardBody className='px-3 md:px-0 flex flex-col justify-center'>
        <h2
          className={`${roboto.className} text-sm md:text-base font-medium pb-3`}
        >
          {title}
        </h2>
        <p className='text-sm md:text-base'>{description}</p>
      </CardBody>
    </Card>
  )
}

export default OptionCard;

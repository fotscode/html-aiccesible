import React from 'react'
import { roboto } from '@/app/fonts'
import {
  Button,
  Card,
  CardBody,
} from '@nextui-org/react'

interface CardProps {
  title: string
  description: string
  Icon: React.ElementType
  alt: string
}

const OptionCard: React.FC<CardProps> = ({
  title,
  description,
  Icon,
  alt,
}) => {
  return (
    <Card className='card flex flex-row md:flex-col md:px-10 md:py-8 rounded-[20px] mx-3 my-3 md:max-w-[300px] cursor-pointer'>
      <div className='flex justify-center items-center h-32 md:h-auto p-1 md:mb-3 min-w-[50px] md:w-1/4 bg-primary text-primary-foreground rounded' aria-label="Ícono">
        <Icon
          alt={alt}
          className='h-full w-full min-w-[50px] min-h-[50px]'
        />
      </div>    

      {/*
      {icon && (

        <img
          src={image}
          alt={alt}
          className='md:pb-3 min-w-[50px] md:w-1/4'
        />
      )}
      */}

      <CardBody className='px-3 md:px-0 flex flex-col justify-center'>
        <h2
          className={`${roboto.className} font-size-title-adjust-sm md:font-size-title-adjust-base font-medium pb-3`}
        >
          {title}
        </h2>
        <p className='text-sm md:text-base'>{description}</p>
      </CardBody>
    </Card>
  )
}

export default OptionCard;

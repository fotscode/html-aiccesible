'use client'

import { useState } from 'react'
import { poppins } from '@/app/fonts'
import { Header } from '@/components/Header'
import { getToken } from '@/utils/auth'
import { Button, Card, CardFooter, CardHeader, Input, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, Textarea, useDisclosure } from '@nextui-org/react'
import { useRouter } from 'next/navigation'
import { Post } from '@/interfaces/Community'
import { addPost } from '@/utils/ApiPosts'
import CodeBlock from '@/components/CodeBlock'


export default function Community() {
  const [title, setTitle] = useState<string>('')
  const [description, setDescription] = useState<string>('')
  const [before, setBefore] = useState<string>('')
  const [after, setAfter] = useState<string>('')
  const {isOpen, onOpen, onOpenChange} = useDisclosure();
  const router = useRouter()

  const errorMessage = "El código debe contener al menos 4 caracteres."


  const handleSubmit = async (e: any) => {
    e.preventDefault();

    try{
      const newPost: Post = {
        ID: 0,
        date: "",
        author: "",
        title: title,
        before: before,
        after: after,
        likes: [],
        description: description,
        comments: []
      }
      console.log(newPost)
      await addPost(getToken(), newPost);
      router.back();
    } catch (error: any) {
      console.error(`Error: ${error.message}`);
    }
  };

  const invalidLength = (value: string, length: number = 5) => {
    if (value) {
        return value.length < length;
    }
    return false;
  }

  return (
    <>
      <Header />
      <main className='flex flex-col justify-center items-center py-8 font-size-text-adjust'>

        <Modal //Modal for going back 
          backdrop="opaque" 
          isOpen={isOpen} 
          onOpenChange={onOpenChange}
          classNames={{
            backdrop: "bg-gradient-to-t from-zinc-900 to-zinc-900/10 backdrop-opacity-20"
          }}
        >
          <ModalContent>
            {(onClose) => (
              <>
                <ModalHeader className="flex flex-col gap-1">Volver atrás</ModalHeader>
                <ModalBody>
                  <p> 
                    ¿Estás segurx de que deseas salir? El artículo generado no se guardará.
                  </p>
                </ModalBody>
                <ModalFooter>
                  <Button 
                    className='font-size-text-adjust-sm'
                    color="danger" 
                    variant="light" 
                    onPress={onClose}
                  >
                    No
                  </Button>
                  <Button 
                    className='font-size-text-adjust-sm'
                    color="primary" 
                    onPress={() => {router.back()}}
                  >
                    Sí
                  </Button>
                </ModalFooter>
              </>
            )}
          </ModalContent>
        </Modal>
        <h1 className={poppins.className +' font-size-title-adjust-3xl md:font-size-title-adjust-3xl font-medium'}>Publicar</h1>
        <Card className='bg-transparent my-10 p-5 w-full md:w-3/4 lg:w-1/2'>
          <form id='post-form' className='flex flex-col gap-2' onSubmit={handleSubmit}>
            <CardHeader className='flex flex-row justify-end py-2 px-0 mt-2'>
              <Input 
                isRequired
                label='Título'
                placeholder='Ingrese un título...'
                className='w-full'
                variant='faded'
                radius='md'
                isInvalid={invalidLength(title)}
                errorMessage="El título del comentario debe tener al menos 5 caracteres."
                onChange={(e: any) => { setTitle(e.target.value)} }
                value={title}
              />
            </CardHeader>
            <Textarea
              isRequired
              label='Cuerpo'
              placeholder='Ingrese el contenido del artículo...'
              className='w-full'
              variant='faded'
              radius='md'
              isInvalid={invalidLength(description)}
              errorMessage="El contenido del comentario debe tener al menos 5 caracteres."
              onChange={(e) => { setDescription(e.target.value)} }
              value={description}
            />
            <div className='h-[40vh] w-full py-5'>
              <div className='flex flex-row'>
                <p className='font-size-title-adjust-base'>Antes</p>
                <p className='font-size-title-adjust-base text-danger'>*</p>
              </div>
              <CodeBlock code={before} setCode={setBefore} label="Código antes de ser accesible" readonly={false}/>
              { invalidLength(before, 4) && (
                <p className='text-danger font-size-text-adjust-xs my-1'>{errorMessage}</p>
              )}
            </div>

            <div className='h-[40vh] w-full py-5'>
              <div className='flex flex-row'>
                <p className='font-size-title-adjust-base'>Después</p>
                <p className='font-size-title-adjust-base text-danger'>*</p>
              </div>
              <CodeBlock code={after} setCode={setAfter} label="Código accesible" readonly={false}/>
              { invalidLength(after, 4) && (
                <p className='text-danger font-size-text-adjust-xs my-1'>{errorMessage}</p>
              )}
            </div>

            <CardFooter className='flex flex-row justify-end py-1 mb-2 gap-2'>
              <Button 
                onPress={onOpen}
                size="sm"
              > 
                Atrás
              </Button>
              <Button 
                id='post-form'
                isDisabled={invalidLength(title) || invalidLength(description) || invalidLength(before, 4) || invalidLength(after,4)}
                size="sm"
                color='primary'
                type='submit'
              > 
                Publicar
              </Button>
            </CardFooter>
          </form>
        </Card>
      </main>
    </>
  )
}

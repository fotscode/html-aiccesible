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
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.min.css';
import { IoArrowBackCircleSharp } from 'react-icons/io5'
import { useTranslations } from 'next-intl'


export default function Community() {
  const [title, setTitle] = useState<string>('')
  const [description, setDescription] = useState<string>('')
  const [before, setBefore] = useState<string>('')
  const [after, setAfter] = useState<string>('')
  const {isOpen, onOpen, onOpenChange} = useDisclosure();
  const router = useRouter()

  const t = useTranslations('PublishPage')

  const errorMessage = t('error_message')


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
      await addPost(getToken(), newPost);
      toast.success(t('toast_success'), {
        onClose: () => router.back(),
        autoClose: 3000,
      });
    } catch (error: any) {
      console.error(`Error: ${error.message}`);
      toast.error(t('toast_error'))
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
        <Modal 
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
                <ModalHeader className="flex flex-col gap-1">{t('modal_header')}</ModalHeader>
                <ModalBody>
                  <p> 
                    {t('modal_body')}
                  </p>
                </ModalBody>
                <ModalFooter>
                  <Button 
                    className='font-size-text-adjust-sm'
                    variant="light" 
                    onPress={onClose}
                  >
                    {t('modal_cancel')}
                  </Button>
                  <Button 
                    className='font-size-text-adjust-sm'
                    color="danger" 
                    variant="light" 
                    onPress={() => {router.back()}}
                  >
                    {t('modal_exit')}
                  </Button>
                </ModalFooter>
              </>
            )}
          </ModalContent>
        </Modal>
        <header className='flex flex-col w-full md:w-3/4 lg:w-1/2 justify-start'>
          <Button 
            isIconOnly 
            variant='light'
            className='h-10 w-10 font-size-text-adjust-base'
            radius='full'
            color='primary'
            onPress={onOpen}
          >
            <IoArrowBackCircleSharp className='h-full w-full' />
          </Button>
          <h1 className={`${poppins.className} font-size-title-adjust-3xl md:font-size-title-adjust-3xl font-medium my-2`}>
            {t('title')}
          </h1>
        </header>
        <Card className='bg-transparent my-10 p-5 w-full md:w-3/4 lg:w-1/2'>
          <form id='post-form' className='flex flex-col gap-2' onSubmit={handleSubmit}>
            <CardHeader className='flex flex-row justify-end py-2 px-0 mt-2'>
              <Input 
                isRequired
                label={t('input_title.label')}
                placeholder={t('input_title.placeholder')}
                className='w-full'
                variant='faded'
                radius='md'
                isInvalid={invalidLength(title)}
                errorMessage={t('input_title.error')}
                onChange={(e: any) => { setTitle(e.target.value)} }
                value={title}
              />
            </CardHeader>
            <Textarea
              isRequired
              label={t('input_content.label')}
              placeholder={t('input_content.placeholder')}
              className='w-full'
              variant='faded'
              radius='md'
              isInvalid={invalidLength(description)}
              errorMessage={t('input_content.error')}
              onChange={(e) => { setDescription(e.target.value)} }
              value={description}
            />
            <div className='h-[40vh] w-full py-5'>
              <div className='flex flex-row'>
                <p className='font-size-title-adjust-base'>{t('before')}</p>
                <p className='font-size-title-adjust-base text-danger'>*</p>
              </div>
              <CodeBlock code={before} setCode={setBefore} label={t('codeblock.before.label')} comments={t('codeblock_before.comments')} readonly={false}/>
              { invalidLength(before, 4) && (
                <p className='text-danger font-size-text-adjust-xs my-1'>{errorMessage}</p>
              )}
            </div>

            <div className='h-[40vh] w-full py-5'>
              <div className='flex flex-row'>
                <p className='font-size-title-adjust-base'>{t('after')}</p>
                <p className='font-size-title-adjust-base text-danger'>*</p>
              </div>
              <CodeBlock code={after} setCode={setAfter} label={t('codeblock_after.label')} comments={t('codeblock_after.comments')} readonly={false}/>
              { invalidLength(after, 4) && (
                <p className='text-danger font-size-text-adjust-xs my-1'>{errorMessage}</p>
              )}
            </div>

            <CardFooter className='flex flex-row justify-end py-1 mb-2 gap-2'>
              <Button 
                className='font-size-text-adjust-sm'
                onPress={onOpen}
              > 
                {t('back')}
              </Button>
              <Button 
                id='post-form'
                isDisabled={invalidLength(title) || invalidLength(description) || invalidLength(before, 4) || invalidLength(after,4)}
                className='font-size-text-adjust-sm'
                color='primary'
                type='submit'
              > 
                {t('publish')}
              </Button>
            </CardFooter>
          </form>
        </Card>
      </main>
    </>
  )
}

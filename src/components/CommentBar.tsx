import { Button, Card, CardBody, CardFooter, CardHeader, Input, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, Textarea, useDisclosure } from "@nextui-org/react";
import { isLoggedIn } from "@/utils/auth";
import { useTranslations } from "next-intl";

type CommentBarProps = {
  submitComment: (e: any) => Promise<void>
  title: string
  setTitle: React.Dispatch<React.SetStateAction<string>>;
  content: string
  setContent: React.Dispatch<React.SetStateAction<string>>;
  textAreaOpened: boolean
  setTextAreaOpened: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function CommentBar(props: CommentBarProps) {

  const {submitComment, title, setTitle, content, setContent, textAreaOpened, setTextAreaOpened} = props

  const {isOpen, onOpen, onOpenChange} = useDisclosure();

  const t = useTranslations('CommentBar')

  const invalidLength = (value: string) => {
    if (value) {
        return value.length < 5;
    }
    return false;
  }


  return (
    <>
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
                  onPress={() => {
                    setTitle('')
                    setContent('')
                    setTextAreaOpened(false)
                    onClose()
                  }}
                >
                  {t('modal_discard')}
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
      {isLoggedIn() ? (
        <Card className={`bg-transparent mb-10 ${textAreaOpened ? "px-2" : ""}`}>
          <form id='comment-form' className='flex flex-col gap-2' onSubmit={submitComment}>
            {textAreaOpened && (
              <CardHeader className='flex flex-row justify-end py-2 px-0 mt-2'>
                <Input 
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
            )}
            <Textarea
              placeholder={t('input_comment.placeholder')}
              className='w-full'
              variant='faded'
              radius='md'
              isInvalid={invalidLength(content)}
              errorMessage={textAreaOpened ? t('input_comment.error') : ""}
              onChange={(e) => { setContent(e.target.value)} }
              value={content}
              onClick={() => { 
                if (!textAreaOpened) 
                  setTextAreaOpened(true)
              }}
            />
            {textAreaOpened && (
              <CardFooter className='flex flex-row justify-end py-1 mb-2 gap-2'>
                <Button 
                  className='font-size-text-adjust-sm'
                  onPress={ title.length > 0 || content.length > 0 ? onOpen : () => {setTextAreaOpened(false)}}
                > 
                  {t('button_cancel')}
                </Button>
                <Button 
                  id='comment-form'
                  className='font-size-text-adjust-sm'
                  isDisabled={invalidLength(title) || invalidLength(content)}
                  color='primary'
                  type='submit'
                > 
                  {t('button_comment')}
                </Button>
              </CardFooter>
            )}
          </form>
        </Card>
      ) : (
        <Card className='bg-transparent mb-10'>
          <CardBody className='flex flex-row'>
            <p>{t('nonlogged.first')} &nbsp;</p>
            <a href='/login' className='link'>{t('nonlogged.second')}</a>
            <p>&nbsp; {t('nonlogged.third')}</p>
          </CardBody>
        </Card>
      )}
    </>
  );
}

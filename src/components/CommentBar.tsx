import { Button, Card, CardBody, CardFooter, CardHeader, Input, Textarea } from "@nextui-org/react";
import { isLoggedIn } from "@/utils/auth";

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

  const invalidLength = (value: string) => {
    if (value) {
        return value.length < 5;
    }
    return false;
  }


  return (
    <>
      {isLoggedIn() ? (
        <Card className={`bg-transparent mb-10 ${textAreaOpened ? "px-2" : ""}`}>
          <form id='comment-form' className='flex flex-col gap-2' onSubmit={submitComment}>
            {textAreaOpened && (
              <CardHeader className='flex flex-row justify-end py-2 px-0 mt-2'>
                <Input 
                  placeholder='Título del comentario'
                  className='w-full'
                  variant='faded'
                  radius='md'
                  isInvalid={invalidLength(title)}
                  errorMessage="El título del comentario debe tener al menos 5 caracteres."
                  onChange={(e: any) => { setTitle(e.target.value)} }
                  value={title}
                />
              </CardHeader>
            )}
            <Textarea
              placeholder='Añadir un comentario'
              className='w-full'
              variant='faded'
              radius='md'
              isInvalid={invalidLength(content)}
              errorMessage={textAreaOpened ? "El contenido del comentario debe tener al menos 5 caracteres." : ""}
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
                  onPress={() => {setTextAreaOpened(false)}}
                  size="sm"
                > 
                  Cancelar 
                </Button>
                <Button 
                  id='comment-form'
                  disabled={invalidLength(title) || invalidLength(content)}
                  size="sm"
                  color='primary'
                  type='submit'
                > 
                  Comentar
                </Button>
              </CardFooter>
            )}
          </form>
        </Card>
      ) : (
        <Card className='bg-transparent mb-10'>
          <CardBody className='flex flex-row'>
            <p>Debes &nbsp;</p>
            <a href='/login' className='link'>iniciar sesión</a>
            <p>&nbsp; para comentar</p>
          </CardBody>
        </Card>
      )}
    </>
  );
}

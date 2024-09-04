import { Button, Card, CardFooter, CardHeader, Input, Textarea } from "@nextui-org/react";
import { getToken, getUsername, isLoggedIn } from "@/utils/auth";
import { useState } from "react";
import { addComment } from "@/utils/ApiComments";


export default function CommentBar(props: {postID: number}) {

  const { postID } = props;
  const [title, setTitle] = useState<string>('');
  const [content, setContent] = useState<string>('');
  const [textAreaOpened, setTextAreaOpened] = useState<boolean>(false);

  const submitComment = async (e: any) => {
    e.preventDefault();

    try {
      const comment = {
        author: getUsername(),
        title: title,
        content: content,
        post_id: postID,
      }
      await addComment(getToken(), comment)
    } catch (error: any) {
      console.error(error.message);
    }
     
  }

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
                  isInvalid={invalidLength(title)}
                  errorMessage="El título del comentario debe tener al menos 5 caracteres."
                  onChange={(e: any) => { setTitle(e.target.value)} }
                />
              </CardHeader>
            )}
            <Textarea
              placeholder='Añadir un comentario'
              className='w-full'
              radius={textAreaOpened ? "md" : "none"}
              isInvalid={invalidLength(content)}
              errorMessage={textAreaOpened ? "El contenido del comentario debe tener al menos 5 caracteres." : ""}
              onChange={(e) => { setContent(e.target.value)} }
              onClick={() => { 
                if (!textAreaOpened) 
                  setTextAreaOpened(true)
              }}
            />
            {textAreaOpened && (
              <CardFooter className='flex flex-row justify-end py-1 gap-2'>
                <Button 
                  onPress={() => {setTextAreaOpened(false)}}
                  size="sm"
                > 
                  Cancelar 
                </Button>
                <Button 
                  id='comment-form'
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
          <p>Debes &nbsp;</p>
          <a href='/login' className='link'>iniciar sesión</a>
          <p>&nbsp; para comentar</p>
        </Card>
      )}
    </>
  );
}

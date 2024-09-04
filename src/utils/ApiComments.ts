export async function addComment(token: string, comment: { author: string, title: string, content: string, post_id: number}) {
    const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/comment/add`, {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(comment),
    });

    if (!response.ok) {
        throw new Error('No se pudo añadir el comentario.');
    }

    if (!response.body) {
        throw new Error('No se obtuvo una respuesta del servidor.');
    }

    const data = await response.json();

    return data.data;
}

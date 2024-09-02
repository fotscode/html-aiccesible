import { Post } from "@/interfaces/Community";

export async function listPosts(page: number, size: number) {
    const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/post/list?page=${page}&size=${size}`);

    if (!response.ok) {
        throw new Error(`Failed to list Posts. Status code ${response.status}`);
    }

    return response.json();
}

export async function addPost(token: string, post: Post) {
    const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/post/add`, {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
            title: post.title,
            description: post.description,
            before: post.before,
            after: post.after
        }),
    });

    if (!response.ok) {
        throw new Error('Error al intentar publicar el artículo');
    }

    if (!response.body) {
        throw new Error('No se obtuvo una respuesta del servidor.');
    }

    return response.json(); 
}

export async function accesibilizeCode(model: string, code: string) {
    const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/models/accesibilize`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
            model: model, 
            prompt: code
        }),
    });

    if (!response.ok) {
        throw new Error('Error fetching data from server');
    }

    if (!response.body) {
        throw new Error('Response body is null');
    }

    return response.body; 
}

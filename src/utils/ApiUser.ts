export async function addUser(username: string, password: string) {
    const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/user/add`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
            username: username, 
            password: password 
        }),
    });

    if (!response.ok) {
        throw new Error('No se pudo registrar un nuevo usuario.');
    }

    if (!response.body) {
        throw new Error('No se obtuvo una respuesta del servidor.');
    }

    return response.json(); 
}

export async function loginUser(username: string, password: string) {
    const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/user/login`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
            username: username, 
            password: password 
        }),
    });

    if (!response.ok) {
        throw new Error('No se pudo autenticar en el servidor.');
    }

    if (!response.body) {
        throw new Error('No se obtuvo una respuesta del servidor.');
    }

    return response.json(); 
}

export async function getUser(userId: number) {
    const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/user/get/${userId}`);

    if (!response.ok) {
        throw new Error(`Failed to get User data. Status code ${response.status}`);
    }

    const data = await response.json();

    return data.data;
}

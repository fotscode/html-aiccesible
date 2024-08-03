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

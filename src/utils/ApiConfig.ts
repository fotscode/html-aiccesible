export async function getConfig(token: string) {
    const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/config/get`, {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    });

    if (!response.ok) {
        throw new Error(`Failed to get config from user. Status code ${response.status}`);
    }

    return response.json();
}

export async function updateConfig(token: string, newConfig: {show_likes: boolean, show_comments: boolean, theme: string, language: string, size_title: number, size_text: number}) {
    const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/config/update`, {
        method: 'PUT',
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(newConfig),
    });

    if (!response.ok) {
        throw new Error(`Failed to get config from user. Status code ${response.status}`);
    }
}

export async function listModels() {
    const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/models/list`);

    if (!response.ok) {
        throw new Error(`Failed to list AI models. Status code ${response.status}`);
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

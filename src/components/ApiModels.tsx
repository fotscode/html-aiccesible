'use server'

export async function listModels() {
    const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/models/list`);

    if (!response.ok) {
        throw new Error(`Failed to list AI models. Status code ${response.status}`);
    }

    return response.json();
}

'use server'

export async function fetchHtml(url: string): Promise<string> {
    const response = await fetch(url);

    if (!response.ok) {
        throw new Error('Failed to fetch HTML content');
    }

    const htmlContent = await response.text(); // Get the response as text (HTML)
    return htmlContent;
}


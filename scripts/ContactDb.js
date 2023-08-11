export async function fetchData(url) {
    try {
        const response = await fetch(url);

        if (!response.ok) {
            throw new Error(`Zapytanie http niepowiodło się: ${response.status}`);
        }

        const data = await response.json();
        return data;

    } catch (error) {
        console.error("Blad podczas zapytania HTTP:", error);
    }
}

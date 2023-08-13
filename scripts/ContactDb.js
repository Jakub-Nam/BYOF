import { showErrorToast } from "./shared/functions";

export async function fetchData(url) {
    try {
        const response = await fetch(url);

        if (!response.ok) {
            throw new Error(`Operacja nie powiodła się: ${response.status}`);
        }

        const data = await response.json();
        return data;

    } catch (error) {
        showErrorToast(error)
    }
}

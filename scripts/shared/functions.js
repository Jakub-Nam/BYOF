export function sortAlphabetically(data) {
    const collator = new Intl.Collator('pl', {
        sensitivity: 'base'
    });

    return data.sort((a, b) => collator.compare(a.name, b.name));
}

export function makeEmptyList(ul) {
    ul.innerHTML = '';
}

export function showErrorToast(error) {

    const errorMessage = `Wystąpił błąd: ${error.message}`;

    const toast = document.createElement('div');
    toast.textContent = errorMessage;
    toast.style.backgroundColor = 'red';
    toast.style.color = 'white';
    toast.style.padding = '10px';
    toast.style.position = 'fixed';
    toast.style.top = '20px';
    toast.style.left = '20px';
    toast.style.borderRadius = '5px';

    document.body.appendChild(toast);

    setTimeout(() => {
        document.body.removeChild(toast);
    }, 5000);
}
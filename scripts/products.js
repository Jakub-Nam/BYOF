import {
    fetchData
} from './contactDb.js';
import {
    productsUrl,
    productsList
} from './shared/const.js';
import {
    sortAlphabetically,
    makeEmptyList,
    showErrorToast
} from './shared/functions.js'
setProducts();

export function setProducts() {
    fetchData(productsUrl)
        .then(data => {
            makeEmptyList(productsList);
            addProducts(sortAlphabetically(data));
        })
        .catch(error => {
            showErrorToast(error)
        })
}

export function addProducts(products) {
    products.forEach(food => {
        const liTemplate = `<li><figure><img src="${food.iconUrl}"><figcaption>${food.name}</figcaption></figure></li>`;
        const parser = new DOMParser();
        const liElement = parser.parseFromString(liTemplate, 'text/html').body.firstChild;
        productsList.appendChild(liElement);
    });
}

export function errorMsg(error) {

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
const apiTypesUrl = "https://api-eko-bazarek.azurewebsites.net/api/products/types";
const typeList = document.getElementById('type-list');
const productsList = document.getElementById('products-list')

async function fetchTypes() {
    try {
        const response = await fetch(apiTypesUrl);

        if (!response.ok) {
            throw new Error(`Zapytanie http niepowiodło się: ${response.status}`);
        }

        const data = await response.json();

        data.forEach(type => {
            const li = document.createElement('li');
            li.textContent = type.name;
            li.dataset.type = type.id;
            typeList.appendChild(li);
        });
    } catch (error) {
        console.error("Blad podczas zapytania HTTP:", error);
    }
}

fetchTypes();

const apiProductsUrl = "https://api-eko-bazarek.azurewebsites.net/api/products/categories";

async function fetchProducts() {
    try {
        const response = await fetch(apiProductsUrl);

        if (!response.ok) {
            throw new Error(`Request failed with status: ${response.status}`);
        }

        const data = await response.json();

        // data.forEach(food => {
        //     const liTemplate = `<li><figure><img src="${food.iconUrl}"><figcaption>${food.name}</figcaption></figure></li>`;
        //     const parser = new DOMParser();
        //     const liElement = parser.parseFromString(liTemplate, 'text/html').body.firstChild;
        //     productsList.appendChild(liElement);
        // });
        for (let i = 0; i < 20; i++) {
            console.log(data)
            const liTemplate = `<li><figure><img src="${data[i].iconUrl}"><figcaption>${data[i].name}</figcaption></figure></li>`;
            const parser = new DOMParser();
            const liElement = parser.parseFromString(liTemplate, 'text/html').body.firstChild;
            productsList.appendChild(liElement);
        }

        console.log("Fetched data:", data);

    } catch (error) {
        console.error("Error fetching data:", error);
    }
}

fetchProducts();


typeList.addEventListener('click', (event) => {
    if (event.target.tagName === 'LI') {
        const selectedType = event.target.dataset.type;
        const url = `https://api-eko-bazarek.azurewebsites.net/api/products/categories?type=${selectedType}`;

        getProperFood(url);
    }
});

async function getProperFood(url) {
    try {
        const response = await fetch(url);

        if (!response.ok) {
            throw new Error(`Zapytanie http niepowiodło się: ${response.status}`);
        }

        const data = await response.json();
        productsList.innerHTML = '';

        for (let i = 0; i < data.length; i++) {
            const liTemplate = `<li><figure><img src="${data[i].iconUrl}"><figcaption>${data[i].name}</figcaption></figure></li>`;
            const parser = new DOMParser();
            const liElement = parser.parseFromString(liTemplate, 'text/html').body.firstChild;
            productsList.appendChild(liElement);
        };
    } catch (error) {
        console.error("Blad podczas zapytania HTTP:", error);
    }
}
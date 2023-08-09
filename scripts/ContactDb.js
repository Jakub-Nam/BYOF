const productsList = document.getElementById('products-list');
const typeList = document.getElementById('type-list');
const productsUrl = "https://api-eko-bazarek.azurewebsites.net/api/products/categories";
const typesUrl = "https://api-eko-bazarek.azurewebsites.net/api/products/types";


async function fetchData(url) {
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

fetchData(typesUrl)
    .then(data => {
        addTypes(sortAlphabetically(data));
    })
    .catch(error => {
        console.log(error);
    })

fetchData(productsUrl)
    .then(data => {
        addProducts(sortAlphabetically(data));
    })
    .catch(error => {
        console.log(error);
    })

typeList.addEventListener('click', (event) => {

    const isClicked = event.target.classList.contains('clicked');

    if (isClicked) {
        makeEmptyProductsList();
        fetchData(productsUrl)
            .then(data => {
                addProducts(sortAlphabetically(data));
            })
            .catch(error => {
                console.log(error);
            })
        removeClickedClass()
    } else {
        removeClickedClass()
        if (event.target.tagName === 'LI') {
            const selectedType = event.target.dataset.type;
            const url = `https://api-eko-bazarek.azurewebsites.net/api/products/categories?type=${selectedType}`;
            event.target.classList.add('clicked');

            fetchData(url)
                .then(data => {
                    const sortedFood = sortAlphabetically(data);
                   addProducts(sortedFood);
                })
                .catch(error => {
                    console.log(error);
                })
        }
    }
});

function removeClickedClass() {
    const listElements = document.querySelectorAll('.types__type-li');

    listElements.forEach((ele) => {
        ele.classList.remove("clicked");
    });
}


function addTypes(types) {
    types.forEach(type => {
        const li = document.createElement('li');
        li.classList.add('types__type-li');
        li.textContent = type.name;
        li.dataset.type = type.id;
        typeList.appendChild(li);
    });
}

function addProducts(products) {
    makeEmptyProductsList()
    products.forEach(food => {
        const liTemplate = `<li><figure><img src="${food.iconUrl}"><figcaption>${food.name}</figcaption></figure></li>`;
        const parser = new DOMParser();
        const liElement = parser.parseFromString(liTemplate, 'text/html').body.firstChild;
        productsList.appendChild(liElement);
    });
}

function sortAlphabetically(data) {
    const collator = new Intl.Collator('pl', {
        sensitivity: 'base'
    });

    return data.sort((a, b) => collator.compare(a.name, b.name));
}

function makeEmptyProductsList(){
    productsList.innerHTML = '';
}
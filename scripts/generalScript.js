import {
    vegeProducts
} from './shared/const.js';
import {
    fetchData
} from './contactDb.js';
import {
    typesUrl,
    productsUrl,
    productsList,
    typeList,
    toggleCheckbox
} from './shared/const.js';

setTypes();
setProducts();

typeList.addEventListener('click', (event) => {

    const isClicked = event.target.classList.contains('clicked');

    if (isClicked) {
        makeEmptyList(productsList);
        setProducts()
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
                    makeEmptyList(productsList)
                    addProducts(sortedFood);
                })
                .catch(error => {
                    console.log(error);
                })
        }
    }
});

toggleCheckbox.addEventListener('change', function () {
    if (this.checked) {
        makeEmptyList(typeList);
        setVegeTypes();
    } else {
        makeEmptyList(typeList);
        setTypes();
    }
});

function setTypes() {
    makeEmptyList(typeList);
    fetchData(typesUrl)
        .then(data => {
            addTypes(sortAlphabetically(data));
        })
        .catch(error => {
            console.log(error);
        })
}

function setProducts() {
    fetchData(productsUrl)
        .then(data => {
            makeEmptyList(productsList);
            addProducts(sortAlphabetically(data));
        })
        .catch(error => {
            console.log(error);
        })
}

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

function makeEmptyList(ul) {
    ul.innerHTML = '';
}

function setVegeTypes() {
    addTypes(sortAlphabetically(vegeProducts));
    vegeProducts.forEach(product => {
        makeEmptyList(productsList)
        const url = `https://api-eko-bazarek.azurewebsites.net/api/products/categories?type=${product.id}`;
        fetchData(url).then(data => {
                addProducts((data));
            })
            .catch(error => {
                console.log(error);
            })
    })
};
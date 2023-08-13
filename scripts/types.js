import {
    fetchData
} from './contactDb.js';
import {
    typesUrl,
    typeList,
    toggleCheckbox,
    productsList,
    vegeCategories
} from './shared/const.js';
import {
    addProducts,
    setProducts
} from './products.js';
import {
    sortAlphabetically,
    makeEmptyList,
    showErrorToast
} from './shared/functions.js'


setTypes();

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
                    showErrorToast(error)
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
        makeEmptyList(productsList);
        setProducts();
    }
});

function setTypes() {
    makeEmptyList(typeList);
    fetchData(typesUrl)
        .then(data => {
            addTypes(sortAlphabetically(data));
        })
        .catch(error => {
            showErrorToast(error)
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

async function setVegeTypes() {
    addTypes(sortAlphabetically(vegeCategories));
    let vegeProducts = [];
    vegeCategories.forEach((product, index) => {
        makeEmptyList(productsList)
        const url = `https://api-eko-bazarek.azurewebsites.net/api/products/categories?type=${product.id}`;
        fetchData(url).then(data => {
                addProducts(sortAlphabetically(data));
                vegeProducts = vegeProducts.concat(data)
            })
            .catch(error => {
                showErrorToast(error)
            })
            .finally(() => {
                if (index === vegeCategories.length - 1) {
                    makeEmptyList(productsList);
                    sortAlphabetically(vegeProducts);
                    addProducts(vegeProducts);
                }
            })
    })
};

export const productsUrl = "https://api-eko-bazarek.azurewebsites.net/api/products/categories";
export const typesUrl = "https://api-eko-bazarek.azurewebsites.net/api/products/types";

export const productsList = document.getElementById('products-list');
export const typeList = document.getElementById('type-list');
export const toggleCheckbox = document.getElementById('toggleCheckbox');

export const vegeCategories = [{
    id: 'HONEY',
    name: 'Miody'
},
{
    id: 'DAIRY',
    name: 'Nabiał'
},
{
    id: 'FRUITS',
    name: 'Owoce'
},
{
    id: 'VEGETABLE',
    name: 'Warzywa'
},
{
    id: 'CEREALS',
    name: 'Zboża'
},
{
    id: 'WINE_AND_SPIRITS',
    name: 'Alkohole'
}
];

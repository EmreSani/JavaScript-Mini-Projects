// DATA
import {data} from "../data/data.js";
// console.log(data);


// DOM ELEMENTLERİ
let searchInp = document.getElementById("search");
let catContainer = document.querySelector(".cats");
let priceRange = document.querySelector(".priceRange");
let priceValue = document.querySelector(".priceValue");
let productsContainer = document.querySelector(".products");

const displayProducts = (filteredData) => {


    let showFilteredData = filteredData.map((product) => `
    <div class="product">
        <img src=${product.img} alt=${product.name}>
        <span class="name">${product.name}</span>
        <span class="price">Price: ${product.price}$</span>
    </div>
    `).join("");

    productsContainer.innerHTML = showFilteredData;

}

displayProducts(data);



searchInp.addEventListener("keyup", (e) => {

    let searchedValue = e.target.value.toLowerCase().trim();
    

    if(searchedValue){
        // filtreleme yap
        displayProducts(data.filter((item) => item.name.toLowerCase().includes(searchedValue)));
    } else{
        displayProducts(data);
    }


});

catContainer.addEventListener("click", (e) => {

    let selectedCat = e.target.textContent;

    // console.log(selectedCat);

    selectedCat == "All" 
    ? 
    displayProducts(data) // true
    :
    displayProducts(data.filter((item) => item.cat === selectedCat));


});

priceRange.addEventListener("input", (e) => {
    let rangeValue = e.target.value;

    // console.log(rangeValue);

    priceValue.textContent = `${rangeValue}$`;

    displayProducts(data.filter((item) => item.price <= rangeValue));

});

const setCategories = () => {

    let allCategories = data.map((item) => item.cat);

    // console.log(allCategories);

    let filteredCategories = [... new Set(allCategories)];

    filteredCategories = ["All", ...filteredCategories];

    // console.log(filteredCategories);

    catContainer.innerHTML = filteredCategories
        .map((cat) => `<span class="cat-item">${cat}</span>`)
        .join("");

}
setCategories();

const setPrice = () => {

    let priceList = data.map((item) => item.price);
    let minPrice = Math.min(...priceList);
    let maxPrice = Math.max(...priceList);

    priceRange.min = minPrice;
    priceRange.max = maxPrice;
    priceRange.value = maxPrice; // Ekran açıldığında çıkacak value

    priceValue.textContent = `${maxPrice}$`;
}
setPrice();

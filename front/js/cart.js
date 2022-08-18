// recuperation du local Storage
let ProductInLocalStorage = JSON.parse(localStorage.getItem("product"));
console.table(ProductInLocalStorage);

// recuperation des données de l'API
function getData(){
fetch("http://localhost:3000/api/products")
  .then(function(response){
    return response.json();
  })
  .then(function(data){
    console.log(data);
  
// si le panier est vide

function basket(){
    const emptyBasket = document.getElementById("cart__items");
    if(ProductInLocalStorage === null || ProductInLocalStorage == 0){        
        emptyBasket.textContent = "Votre panier est vide";
    }else{
        for (let data in ProductInLocalStorage){
        // Insertion de l'element Article
        let productArticle = document.createElement("article");
        document.getElementById("cart__items").appendChild(productArticle);
        productArticle.className = "cart__items";
        productArticle.setAttribute("data-id", ProductInLocalStorage[data]._id);

        // Insertion de l'élément DIV
        let productDivImg = document.createElement("div");
        productArticle.appendChild(productDivImg);
        productDivImg.className = "cart__item__img";

        // Insertion de l'image
        let productImg = document.createElement("img");
        productDivImg.appendChild(productImg);
        productImg.src = ProductInLocalStorage[data].imgUrl;
        productImg.alt = ProductInLocalStorage[data].altTxt;

        }
    }
}
basket()

});
}
getData()



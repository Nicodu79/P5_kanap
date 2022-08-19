
// Fonction async autoexecutable
(async function(){
    const canapList = await getData(); // je récupère ma liste de canapé présent dans l'API
    basket(canapList); // je la passe en paramètre à ma fonction basket qui va gérer l'affichage du panier
})();

// Recuperation des données de l'API
function getData(){
    return fetch("http://localhost:3000/api/products")
    .then(function(response){
        return response.json;
    })
};

function basket(canapList){
    // recuperation du local storage
    let ProductInLocalStorage = JSON.parse(localStorage.getItem("product"));
    const emptyBasket = document.getElementById("cart__items");
    // si le panier est vide
    if (ProductInLocalStorage === null || ProductInLocalStorage == 0) {
        emptyBasket.textContent = "Votre panier est vide";
}else{
    // pour chaque produit présent dans mon localstorage
    for (let data in ProductInLocalStorage){
        let product = ProductInLocalStorage[data];

        // je cherche dans ma liste de canapé venant de l'API l'id du produit sélectionné
        const productData = canapList.find(function(canap){
            return canap._id == product.id;
        });
        // Insertion de l'élément Article
        let productArticle = document.createElement("article");
        document.getElementById("cart_items").appendChild(productArticle);
        productArticle.className = "cart_items";
        productArticle.setAttribute("data-id", productData._id);

        // Insertion de l'élément DIV
        let productDivImg = document.createElement("div");
        productArticle.appendChild(productDivImg);
        productDivImg.className = "cart_item-img";

        // Insertion de l'image
        let productImg = document.createElement("img");
        productDivImg.appendChild(productImg);
        productImg.src = productData.imageUrl;
        productImg.alt = productData.altTxt;
    }
}
}



/*
// recuperation du local Storage
let productInBasket = JSON.parse(localStorage.getItem("product"));
console.log(productInBasket);


function getData() {
    fetch("http://localhost:3000/api/products")
    .then(function(response){
        return response.json();
    })
    .then(function(data){
        console.log(data);

// si le panier est vide         
const emptyBasket = document.getElementById("cart__items");
if (productInBasket === null || productInBasket == 0) {
    emptyBasket.textContent = "Votre panier est vide";
}else{
    const results = data.filter((productInBasket)=>
    productInBasket.id === _id.value);
        console.log(results);
}
    });
}

getData();

*/


// recuperation des données de l'API
/*function getData() {
    fetch("http://localhost:3000/api/products")
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            console.log(data);

            // si le panier est vide         
                const emptyBasket = document.getElementById("cart__items");
                if (productInBasket === null || productInBasket == 0) {
                    emptyBasket.textContent = "Votre panier est vide";
                } else {
                    productInBasket.forEach(data => {
                        console.log(data);
                        // Insertion de l'element Article
                        let productArticle = document.createElement("article");
                        document.getElementById("cart__items").appendChild(productArticle);
                        productArticle.className = "cart__items";
                        productArticle.setAttribute("data-id", productInBasket.id);

                        // Insertion de l'élément DIV
                        let productDivImg = document.createElement("div");
                        productArticle.appendChild(productDivImg);
                        productDivImg.className = "cart__item__img";

                        // Insertion de l'image
                        let productImg = document.createElement("img");
                        productDivImg.appendChild(productImg);
                        productImg.src = data.imageUrl;
                        productImg.alt = data.altTxt;

                        const results = data.filter((data) =>
                            data.id === productInBasket.id);
                            console.log(results);

                    });
                };
            }


        );
        
}

getData()
*/


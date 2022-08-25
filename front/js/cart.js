
// Fonction async autoexecutable
(async function () {
    const canapList = await getData();
    console.log(canapList);
    // je récupère ma liste de canapé présent dans l'API
    basket(canapList); // je la passe en paramètre à ma fonction basket qui va gérer l'affichage du panier
    totalQtyPrice();   
    deleteProduct();
    changeQuantity();
})();

// Recuperation des données de l'API
function getData() {
    return fetch("http://localhost:3000/api/products")
        .then(function (response) {
            return response.json();
        })
};

function basket(canapList) {
    // recuperation du local storage
    let ProductInLocalStorage = JSON.parse(localStorage.getItem("product"));
    const emptyBasket = document.getElementById("cart__items");
    // si le panier est vide
    if (ProductInLocalStorage === null || ProductInLocalStorage == 0) {
        emptyBasket.textContent = "Votre panier est vide";
    } else {
        // pour chaque produit présent dans mon localstorage
        for (let data in ProductInLocalStorage) {
            let product = ProductInLocalStorage[data];

            // je cherche dans ma liste de canapé venant de l'API l'id du produit sélectionné
            const productData = canapList.find(function (canap) {
                return canap._id == product.id;
            });
            // Insertion de l'élément Article
            let productArticle = document.createElement("article");
            document.getElementById("cart__items").appendChild(productArticle);
            productArticle.className = "cart__item";
            productArticle.setAttribute("data-id", productData._id);
            productArticle.setAttribute("data-color", ProductInLocalStorage[data].color);

            // Insertion de l'élément DIV
            let productDivImg = document.createElement("div");
            productArticle.appendChild(productDivImg);
            productDivImg.className = "cart__item__img";

            // Insertion de l'image
            let productImg = document.createElement("img");
            productDivImg.appendChild(productImg);
            productImg.src = productData.imageUrl;
            productImg.alt = productData.altTxt;

            // Insertion de l'élément DIV avec description article
            let productItemDescriptionGlobal = document.createElement("div");
            productArticle.appendChild(productItemDescriptionGlobal);
            productItemDescriptionGlobal.className = "cart__item__content";

            // Insertion DIV contenant description, couleur et prix
            let productItemDescription = document.createElement("div");
            productItemDescriptionGlobal.appendChild(productItemDescription);
            productItemDescription.className = "cart__item__content__description";

            // Insertion du titre H2
            let productTitle = document.createElement("h2");
            productItemDescription.appendChild(productTitle);
            productTitle.textContent = productData.name;

            // Insertion de la couleur
            let productColor = document.createElement("p");
            productItemDescription.appendChild(productColor);
            productColor.textContent = ProductInLocalStorage[data].color;

            // Insertion du prix
            let productPrice = document.createElement("p");
            productPrice.className = "cart__item__content__price";
            productItemDescription.appendChild(productPrice);
            productPrice.textContent = productData.price + " €";

            // Insertion DIV contenant parametres panier
            let productItemSttings = document.createElement("div");
            productArticle.appendChild(productItemSttings);
            productItemSttings.className = "cart__item__content__settings";

            // Insertion de la DIV avec quantité et bouton
            let productItemSettingsQuantity = document.createElement("div");
            productItemSttings.appendChild(productItemSettingsQuantity);
            productItemSettingsQuantity.className = "cart__item__content__settings__quantity";

            // Insertion de Qté
            let productQte = document.createElement("p");
            productItemSettingsQuantity.appendChild(productQte);
            productQte.textContent = " Qté :";

            // Insertion paramètres quantité
            let productQuantity = document.createElement("input");
            productItemSettingsQuantity.appendChild(productQuantity);
            productQuantity.value = ProductInLocalStorage[data].quantity;
            productQuantity.className = "itemQuantity";
            productQuantity.setAttribute("type", "number");
            productQuantity.setAttribute("min", "1");
            productQuantity.setAttribute("max", "100");
            productQuantity.setAttribute("name", "itemQuantity");

            // Insertion DIV supprimer
            let productDelete = document.createElement("div");
            productItemSttings.appendChild(productDelete);
            productDelete.className = "cart__item__content__settings__delete";

            // Insertion de "supprimer"
            let productTextDelete = document.createElement("p");
            productDelete.appendChild(productTextDelete);
            productTextDelete.className = "deleteItem";
            productTextDelete.textContent = "Supprimer";
        }
    }
}


// Fonction prix total
function totalQtyPrice() {
    let totalQuantity = 0;
    let totalPrice = 0;
    let elements = document.querySelectorAll(".cart__item");
    // console.log(elements);
    elements.forEach((elementHtml) => {
      //     console.log(elementHtml.querySelector(".itemQuantity").value);
        totalQuantity += elementHtml.querySelector(".itemQuantity").valueAsNumber;
         console.log(totalQuantity);

        let priceKanap = elementHtml.querySelector(".cart__item__content__price").textContent;
        priceKanap.replace(" €", "");
         console.log(parseInt(priceKanap));
        totalPrice += parseInt(priceKanap) * elementHtml.querySelector(".itemQuantity").valueAsNumber;
         console.log(totalPrice);
    })

    document.getElementById("totalQuantity").textContent = totalQuantity;
    document.getElementById("totalPrice").textContent = totalPrice;
};



// Fonction suppression produit du panier
function deleteProduct() {
    let ProductInLocalStorage = JSON.parse(localStorage.getItem("product"));
    let listItem = document.querySelectorAll(".cart__item");
    console.log(listItem);
    for (let i = 0; i < listItem.length; i++){
        let dataId = listItem[i].getAttribute("data-id");
        let dataColor = listItem[i].getAttribute("data-color");
        console.log(dataColor);

        listItem[i].querySelector(".deleteItem").addEventListener("click", (event) =>{
        ProductInLocalStorage = ProductInLocalStorage.filter(p =>  dataId != p.id || dataColor != p.color);
         //  listItem[i].remove();
      console.log(ProductInLocalStorage);
      localStorage.setItem("product", JSON.stringify(ProductInLocalStorage));
      alert("ce produit va etre supprimé du panier");

      location.reload();
        });
    }
}

// Fonction modification quantité
function changeQuantity(){
    let quantityArticle = document.querySelectorAll(".cart__item");
    console.log(quantityArticle);
    let ProductInLocalStorage = JSON.parse(localStorage.getItem("product"));
    console.log(ProductInLocalStorage);

    quantityArticle.forEach((quantityArticle)=>{
        quantityArticle.addEventListener("change", (event) => {
            for (article of ProductInLocalStorage){ 
            if (article.id === quantityArticle.dataset.id && article.color === quantityArticle.dataset.color){
                article.quantity = event.target.value;
                localStorage.setItem("product", JSON.stringify(ProductInLocalStorage));
                totalQtyPrice();
            };
        };
        });
    });
};













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
    elements.forEach((elementHtml) => {
        totalQuantity += elementHtml.querySelector(".itemQuantity").valueAsNumber;

        let priceKanap = elementHtml.querySelector(".cart__item__content__price").textContent;
        priceKanap.replace(" €", "");
        totalPrice += parseInt(priceKanap) * elementHtml.querySelector(".itemQuantity").valueAsNumber;
    })

    document.getElementById("totalQuantity").textContent = totalQuantity;
    document.getElementById("totalPrice").textContent = totalPrice;
};



// Fonction suppression produit du panier
function deleteProduct() {
    let ProductInLocalStorage = JSON.parse(localStorage.getItem("product"));
    let listItem = document.querySelectorAll(".cart__item");
    console.log(listItem);
    for (let i = 0; i < listItem.length; i++) {
        let dataId = listItem[i].getAttribute("data-id");
        let dataColor = listItem[i].getAttribute("data-color");
        console.log(dataColor);

        listItem[i].querySelector(".deleteItem").addEventListener("click", (event) => {
            ProductInLocalStorage = ProductInLocalStorage.filter(p => dataId != p.id || dataColor != p.color);

            console.log(ProductInLocalStorage);
            localStorage.setItem("product", JSON.stringify(ProductInLocalStorage));
            alert("ce produit va etre supprimé du panier");
            listItem[i].remove();
            totalQtyPrice();
        });
    }
}

// Fonction modification quantité
function changeQuantity() {
    let quantityArticle = document.querySelectorAll(".cart__item");
    console.log(quantityArticle);
    let ProductInLocalStorage = JSON.parse(localStorage.getItem("product"));
    console.log(ProductInLocalStorage);

    quantityArticle.forEach((quantityArticle) => {
        quantityArticle.addEventListener("change", (event) => {
            for (article of ProductInLocalStorage) {
                if (article.id === quantityArticle.dataset.id && article.color === quantityArticle.dataset.color) {
                    article.quantity = event.target.value;
                    localStorage.setItem("product", JSON.stringify(ProductInLocalStorage));
                    totalQtyPrice();
                };
            };
        });
    });
};


// Validation du formulaire

let form = document.querySelector(".cart__order__form");
console.log(form.email);

// Initialisation des RegExp
const emailRegExp = new RegExp('^[a-zA-Z0-9.-_]+[@]{1}[a-zA-Z0-9.-_]+[.]{1}[a-z]{2,10}$', 'g');
const nameRegExp = new RegExp('^[a-zA-Z ,.-]+$');
const addressRegExp = new RegExp('^[0-9]{1,3}[,. ]{1}[-a-zA-Zàâäéèêëïîôöùûüç ]{5,100}$');

// Validation Prenom
form.firstName.addEventListener("change", function () {
    validFirstName(this);
});
const validFirstName = function (inputFirstName) {
    let MsgFirstName = inputFirstName.nextElementSibling;
    if (testFirstName = nameRegExp.test(inputFirstName.value)) {
        MsgFirstName.textContent = "Prénom valide";
        return true
    } else {
        MsgFirstName.textContent = "Prénom non valide";
        return false
    }
};

// Validation nom
form.lastName.addEventListener("change", function () {
    validLastName(this);
});
const validLastName = function (inputLastName) {
    let MsgLastName = inputLastName.nextElementSibling;
    if (testLastName = nameRegExp.test(inputLastName.value)) {
        MsgLastName.textContent = "Nom valide";
        return true
    } else {
        MsgLastName.textContent = "Nom non valide";
        return false
    }
};


// Validation adresse
form.address.addEventListener("change", function () {
    validAddress(this);
});
const validAddress = function (inputAddress) {
    let MsgAddress = inputAddress.nextElementSibling;
    if (testAddress = addressRegExp.test(inputAddress.value)) {
        MsgAddress.textContent = "Adresse valide";
        return true
    } else {
        MsgAddress.textContent = "Adresse non valide";
        return false
    }
};


// Validation ville
form.city.addEventListener("change", function () {
    validCity(this);
});
const validCity = function (inputCity) {
    let MsgCity = inputCity.nextElementSibling;
    if (testCity = nameRegExp.test(inputCity.value)) {
        MsgCity.textContent = "Ville valide";
        return true
    } else {
        MsgCity.textContent = "Ville non valide";
        return false
    }
};


// Validation Email
form.email.addEventListener("change", function () {
    validEmail(this);
});
const validEmail = function (inputEmail) {
    let MsgMail = inputEmail.nextElementSibling;
    if (testEmail = emailRegExp.test(inputEmail.value)) {
        MsgMail.textContent = "Adresse mail valide";
        return true
    } else {
        MsgMail.textContent = "Adresse Mail non valide";
        return false
    }
}


// Ecouter la soumission du formulaire

form.addEventListener("submit", function (e) {
    e.preventDefault();
    let formValid = false

    // Verifier si toute les données saisies du formulaire sont correctes

    if ((form.firstName.value) && (form.lastName.value) && (form.address.value) && (form.city.value) && (form.email.value)) {
        console.log("formulaire OK");
        formValid = true;
    } else {
        alert("Veuillez remplir le formulaire")
    }

    // Si le forlulaire est ok, creation des donnnées à envoyer au serveur

    if (formValid) {
        const ProductInLocalStorage = JSON.parse(localStorage.getItem("product"));
        let commandId = [];
        console.log(commandId);
        ProductInLocalStorage.forEach((product) => {
            commandId.push(product.id);
        });
        console.log(commandId);

        const order = {
            contact: {
                firstName: form.firstName.value,
                lastName: form.lastName.value,
                address: form.address.value,
                city: form.city.value,
                email: form.email.value,
            },
            products: commandId,
        };
        console.log(order);

        // Requete fetch POST

        fetch("http://localhost:3000/api/products/order", {
            method: "POST",
            headers: {
                "accept": "application/json",
                "Content-Type": "application/json"
            },
            body: JSON.stringify(order),

        })
            .then((response) => response.json())
            .then((responseServeur) => {
                console.log(responseServeur);
                localStorage.clear();
                localStorage.setItem("orderId", responseServeur.orderId);

                document.location.href = "confirmation.html"
            });
    }
});






// Recuperation d'un produt sur la page Produit

const str = window.location

const url = new URL(str);
const productID = url.searchParams.get("id");
console.log(productID);



// Recuperation des données de l'API 

fetch("http://localhost:3000/api/products/" + productID)
  .then(function(response) {
    return response.json();
  })
  .then(function(data){
    console.log(data);
    
        // Insertion de l'image
        let productImg = document.createElement("img");
        document.querySelector(".item__img").appendChild(productImg);
        productImg.src = data.imageUrl;
        productImg.alt = data.altTxt;

        // Insertion du titre
        let productName = document.getElementById("title");
        productName.textContent = data.name;

        // Insertion du prix
        let productPrice = document.getElementById("price");
        productPrice.textContent = data.price;

        // Insertion de la description
        let productDescription = document.getElementById("description");
        productDescription.textContent = data.description;

        // Insertion des options de couleurs
        for (i = 0; i < data.colors.length; i++){
            let productColors = document.createElement("option");
            document.getElementById("colors").appendChild(productColors);
            productColors.value = `${data.colors[i]}`;
            productColors.textContent = `${data.colors[i]}`;
        }
    
  })
  .catch(function(error){
    console.log("Erreur requete API");
  })


// Gestion du panier

  let btnCart = document.getElementById("addToCart");
  btnCart.addEventListener("click", function(){
    console.log("test");
    const choiceColor = document.getElementById("colors").value;
    const choiceQuantity = document.getElementById("quantity").value;
    if (choiceQuantity == "0"){
      alert("Veuillez saisir une quantité") 
      return false
    }
    if (choiceColor ==""){
      alert("Veuillez choisir une couleur")
      return false
    }
    if(window.localStorage.getItem("quantity")){
      
    }
    window.localStorage.setItem("quantity", choiceQuantity);
    
    
  })
// exo --------------------------------------------
  function saveBasket(basket){
    localStorage.setItem("basket", JSON.stringify(basket));
  }
// JSON.stringify : transforme objet en chaine de caractere (compatible localStorage)
  function getBasket(){
    let basket = (localStorage.getItem("basket"));
    if (basket == null){
      return [];  // ici retourne un tableau vide
    }else{
      return JSON.parse(basket);
    }
  }

  function addBasket(product){
    let basket = getBasket();
    let foundProduct = basket.find( p => p.id == product.id);
    if(foundProduct != undefined){
      foundProduct.quantity++;
    }else{
      product.quantity = 1;
      basket.push(product)
    }
    basket.push(product);
    saveBasket(basket);
  }

  








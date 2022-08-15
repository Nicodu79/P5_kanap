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

  let sendToCart = document.getElementById("addToCart");
  sendToCart.addEventListener("click", function(){
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

    // recuperation des valeurs du formulaire
    let addProduct = [{productID, choiceColor, choiceQuantity}];
    
    let ProductInLocalStorage = JSON.parse(localStorage.getItem("product"));
    let foundProduct = addProduct.find(p => p.id == productID);
    
    // s'il y a deja des produits dans le localStorage
    if(ProductInLocalStorage){
      ProductInLocalStorage.push(addProduct);
      window.localStorage.setItem("product", JSON.stringify(ProductInLocalStorage));

    }else{
      ProductInLocalStorage =[];
      ProductInLocalStorage.push(addProduct);
      window.localStorage.setItem("product", JSON.stringify(ProductInLocalStorage));
    }
    console.log(addProduct)

// pour que les produits identiques s'incrementent dans une seule ligne

    if (foundProduct =! undefined){
      foundProduct.choiceQuantity++;
    }else{
      ProductInLocalStorage.push(addProduct);
    }
     

  })

  








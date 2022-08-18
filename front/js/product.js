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
    
  
    // Message si quantité a 0 ou couleur non sélectionnée

    if (choiceQuantity == "0"){
      alert("Veuillez saisir une quantité") 
      return false
    }
    if (choiceColor ==""){
      alert("Veuillez choisir une couleur")
      return false
    }
    let ProductInLocalStorage = JSON.parse(localStorage.getItem("product"));
    if(!ProductInLocalStorage){
      ProductInLocalStorage = [];
    }
    // recuperation des valeurs du formulaire
    let addProduct = {id : productID, color : choiceColor,  quantity : choiceQuantity};
 
  // pour que les produits identiques s'incrementent dans une seule ligne
  
    var sameItem = false;
    ProductInLocalStorage.forEach(product => {
      console.log(product);      
      if(product.id == addProduct.id && product.color == addProduct.color){
        sameItem = true
        console.log("produit avec le meme id");
        console.log("produit avec la meme couleur");
        product.quantity = parseInt(product.quantity) + parseInt(addProduct.quantity);
      }
    });
    if(sameItem == true){
      window.localStorage.setItem("product", JSON.stringify(ProductInLocalStorage));
    }else{
      ProductInLocalStorage.push(addProduct);
      window.localStorage.setItem("product", JSON.stringify(ProductInLocalStorage));
    }
  })



  
  








// Récupération des données de l'API

  fetch("http://localhost:3000/api/products")
  .then(function(response){
    return response.json();
  })
  .then(function(data){
    console.log(data);
    // Mise en place des articles dans la page d'accueil
    function postArticle() {
    for(let article in data){
      let productLink = document.createElement("a");
            document.querySelector(".items").appendChild(productLink);
            productLink.href = `product.html?id=${data[article]._id}`;

            let productArticle = document.createElement("article");
            productLink.appendChild(productArticle);

            // Insertion de l'image
            let productImg = document.createElement("img");
            productArticle.appendChild(productImg);
            productImg.src = data[article].imageUrl;
            productImg.alt = data[article].altTxt;

            let productName = document.createElement("h3");
            productArticle.appendChild(productName);
            productName.classList.add("productName");
            productName.innerHTML = data[article].name;

            // Insertion de la description "p"
            let productDescription = document.createElement("p");
            productArticle.appendChild(productDescription);
            productDescription.classList.add("productName");
            productDescription.innerHTML = data[article].description;

     }}
     postArticle();
  })

  














  
  
  
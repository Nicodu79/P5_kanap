function confirmation(){
    const idCommande = document.getElementById("orderId");
    idCommande.innerText = localStorage.getItem("orderId");
    console.log(localStorage.getItem("orderId"));
    localStorage.clear();
}

confirmation();
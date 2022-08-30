function confirmation(){
    const idcommande = document.getElementById("orderId");
    idcommande.innerText = localStorage.getItem("orderId");
    console.log(localStorage.getItem("orderId"));
    localStorage.clear();
}

confirmation();
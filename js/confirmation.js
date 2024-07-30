//une méthode 
//let localstorage2 =localStorage.getItem("commande")
// Ncmde = JSON.parse(localstorage2)
// console.log(Ncmde);

// var  Numero_cmde= document.querySelector("#orderId")
// Numero_cmde.innerHTML=Ncmde



const url= new URL(document.location.href)
console.log(url);

const id = url.searchParams.get("id")
console.log(id);


const  Numero_cmde= document.querySelector("#orderId")
Numero_cmde.innerHTML=id


// //Déclarati de la variable qui contiendra  notre url
// const url = new URL(document.location.href)
// console.log(url);
// //affectation de l'id contenu dans l'url
// const id = url.searchParams.get("id")
// console.log(id);



//là je recupère les données du localstorage
let localstorage =localStorage.getItem("panier")
let tab =[]
tab = JSON.parse(localstorage)
console.log(tab);

//data: est la variable qui contient tous les attributs de chaque élmt de notre serveur
//dat: est la variable qui contient juste les attributs stokés 
//dans notre local storage qui est le tableau "tab"
var Total = 0;
var taille=0;
for(let dat of tab){
    console.log(dat.id);
    //declaration du fetch qui récupérer les élmts de l'id déclaré/choisie dans le localstorage
    fetch(("http://localhost:3000/api/products/"+dat.id))
    //après un fetch il ya tjrs des reponses(.then)
    //la 1ère rpse verifie si la rpse est valide et la stovke ds un .json
    .then((res)=>{
        if(res.ok){
            return res.json()
        }
    })
    //la 2è rpse execute une function ayant en parametre mes donees recuperes a la 1ère rpse
    .then(function(data){
        console.log(data);
        cart(data);
    
    })
    .catch((err)=>{
        console.log(err);
    
    })
    
    //localisation de la balise parent section
    const section = document.querySelector("#cart__items")
    function cart(data){

        //création des balises enfants de section
        const  article = document.createElement("article")
        section.appendChild(article);
        article.classList.add("cart__item")
        article.setAttribute("data-id",dat.id)
        article.setAttribute("data-color",dat.couleur)

        const div1 = document.createElement("div")
    //console.log(articles);
        article.appendChild(div1)
        div1.classList.add("cart__item__img")
        

        var img = document.createElement("img")
        img.src=data.imageUrl
        img.alt=data.altTxt
        div1.appendChild(img)

        const div2 = document.createElement("div")
        article.appendChild(div2)
        div2.classList.add("cart__item__content")

        const div3 = document.createElement("div")
        div2.appendChild(div3)
        div3.classList.add("cart__item__content__description")

        const h2 = document.createElement("h2")
        h2.innerHTML=data.name
        div3.appendChild(h2)

        const p1 = document.createElement("p")
        p1.innerHTML=dat.couleur
        div3.appendChild(p1)

        const p2 = document.createElement("p")
        p2.innerHTML=data.price
        div3.appendChild(p2)

        const div4 = document.createElement("div")
        div2.appendChild(div4)
        div4.classList.add("cart__item__content__settings")

        const div5 = document.createElement("div")
        div4.appendChild(div5)
        div5.classList.add("cart__item__content__settings__quantity")

        const p3 = document.createElement("p")
        p3.innerHTML="Qté : "
        div5.appendChild(p3)

        const input = document.createElement("input")
        div5.appendChild(input)
        input.classList.add("itemQuantity")
        input.setAttribute("type","number")
        input.setAttribute("name","itemQuantity")
        input.setAttribute("value",dat.quantite)
        input.setAttribute("min",1)
        input.setAttribute("max",100)

        function clic(){
            for(let i=0;i<tab.length;i++){
                if(dat.id===tab[i].id && dat.couleur===tab[i].couleur ){
                    Total=Total-((dat.quantite)*(data.price))
                    if(input.value>0 && input.value<=100){
                        dat.quantite=input.value
                    }
                    else{
                        alert("Vous ne pouvez pas laissez ce champ à zéro!!!")
                    }
                    break;
                }

            }
            localStorage.setItem("panier",JSON.stringify(tab))

            Total=Total+((dat.quantite)*(data.price))
            console.log((Total));
            span2.innerHTML = Total
            
        }
        input.addEventListener("change",clic)

        const div6 = document.createElement("div")
        div4.appendChild(div6)
        div6.classList.add("cart__item__content__settings__delete")

        const p4 = document.createElement("p")
        p4.innerHTML="Supprimer"
        div6.appendChild(p4)
        p4.classList.add("deleteItem")
        //fonction pour supprimer un article
        function clic1(){
            for(let i=0;i<tab.length;i++){
                if(dat.id===tab[i].id && dat.couleur===tab[i].couleur ){
                    tab.splice(i,1);
                    //ici on actualise autommatiquement notre page 
                    location.reload()
                    break;
                }

            }
            localStorage.setItem("panier",JSON.stringify(tab))
            
            
                 
        }
        p4.addEventListener("click",clic1)

        const span1 = document.querySelector("#totalQuantity")
        
        span1.innerHTML=(tab.length)

        //boucle pour calculer le prix total 
        
        
        Total+=((dat.quantite)*(data.price))
        console.log(Total);
        console.log("Le total est: "+Total);
        const span2 = document.querySelector("#totalPrice")        
        span2.innerHTML = Total
   
        }
             
 
}
 

// document.getElementById("email").addEventListener('input',function(){
//     var email= document.getElementById("email").value;
//     var text = document.getElementsByName("email");
//     var pattern = /^[^ ]+@[^ ]+\.[a-z]{2,3}§/;

//     if(email.match(pattern)){
//         text.innerHTML = "Votre email est valide"
//         text.style.color = "#00ff00"
//     }
//     else{
//         text.innerHTML = "Votre email est invalide"
//         text.style.color = "red"
//     }
//     if(email === " "){
//          text.innerHTML = ""
//          text.style.color = "red"
//     }

// })


// var emailInput = document.getElementById("email")
// var emailLabel = document.getElementById("emaillab")
// var emailError = document.getElementById("cityErrorMsg")

// function validEmail(){
//     if(!emailInput.value.match(/^[^[A-Za-z\._\-0.9]*+[@][A-Za-z]*[\.][a-z]{2,4}§/)){
//         emailError.innerHTML= "Please enter a vald email";
//         return false;
//     }

//     emailError.innerHTML= "";
//     return true;

// }


const form = document.querySelector(".cart__order__form")
form.addEventListener('submit',(e)=>{
    e.preventDefault();

    const firstName = document.getElementById('firstName')
    const lastName = document.getElementById('lastName')
    const Address = document.getElementById('address')
    const Ville = document.getElementById('city')
    const email = document.getElementById('email')
    

    const firstName_error = document.getElementById('firstNameErrorMsg')
    const lastName_error = document.getElementById('lastNameErrorMsg')
    const addresse_error = document.getElementById('addressErrorMsg')
    const city_error = document.getElementById('cityErrorMsg')
    const email_error=document.getElementById(('emailErrorMsg'));

    console.log(firstName.value);


    var email_check = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/ ;
    var firstName_check = /^[a-zA-z-\s]+$/;
    var address_check = /^([A-Za-z0-9_\-\.])+([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/
    var lastName_check = /^[a-zA-z-\s]+$/;
    var city_check = /^[a-zA-z-\s]+$/;
    //ici on a une seconde facon d'identifier le bon format d'une email
    // var email_check= /^[^ ]+@[^ ]+\.[a-z]{2,3}$/

    if (firstName_check.test(firstName.value)=== false){
        firstName_error.style.color = "red"
        firstName_error.innerHTML ="ce prénom n'est pas valide"
        return;
    }
    else if (lastName_check.test(lastName.value)=== false){
        lastName_error.style.color = "red"
        lastName_error.innerHTML ="ce nom n'est pas valide"
        return;
    }
    // else if(address_check.test(Address.value)=== false){
    //     addresse_error.style.color = "red"
    //     addresse_error.innerHTML ="cette addresse n'est pas valide"
    //     return;
    // }
    else if (city_check.test(Ville.value)=== false){
        city_error.style.color = "red"
        city_error.innerHTML ="cette ville n'est pas valide"
        return;
    }
    else if(email_check.test(email.value)=== false){
        email_error.style.color = "red"
        email_error.innerHTML ="cette email n'est pas valide"
        return;
    }
    
    const contact ={
        firstName:firstName.value,
        lastName:lastName.value,
        address: Address.value,
        city:Ville.value,
        email:email.value
    }
    
    
       
    console.log(contact);

    const products=[]
    //pour rappel "tab" c'est le tableau contenant les éléments du localstorage 
    console.log(tab);
    //ici je stocke tous les ids  contenus dans notre localstorage dan  un nouveau tableau "products"
    for(let dat of tab){
    products.push(dat.id);
    }
    console.log(products);
 
    const objet = {contact,products}
   
    console.log(objet);


    fetch("http://localhost:3000/api/products/order",{
        method: 'POST',
        headers:{
            'Content-Type': 'application/json'
        },  
        body : JSON.stringify(objet)
    })
    .then((res)=>{
        if(res.ok){
            return res.json()
        }
    })
    //la 2è rpse execute une function ayant en parametre mes donees recuperes a la 1ère rpse
    .then(function(data){
        console.log(data);
        console.log(data.orderId);
        const Ncmde=data.orderId;
        localStorage.setItem("commande",JSON.stringify(Ncmde))
        document.location.href='confirmation.html?id='+data.orderId
        
        
    })
    .catch((err)=>{
        console.log(err);
    
    })
    
    
    







})







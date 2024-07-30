const url = new URL(document.location.href)
console.log(url);
// autre declaration
// const id=url.search
const id = url.searchParams.get("id")
console.log(id);

//declaration de fetch pour afficher des elmts 
fetch(("http://localhost:3000/api/products/"+id))
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
    kanap(data);

})
.catch((err)=>{
    console.log(err);

})

const div=document.querySelector(".item__img")
const select=document.querySelector("#colors")
console.log(div);
function kanap(data){
    const img = document.createElement("img")
    img.src=data.imageUrl
    img.alt=data.altTxt
    div.appendChild(img)

    const h1=document.querySelector("#title")
    h1.innerHTML=data.name
    //1ère balise p
    document.querySelector("#price").innerHTML=data.price
    //2è balise p
    document.querySelector("#description").innerHTML=data.description
    console.log(data.colors);
    for(let dat of data.colors){
        console.log("dat");
        const op = document.createElement("option")
        select.appendChild(op)
        op.innerHTML=dat

    }
}
  
    
const Div = document.querySelector(".item__content__addButton")
const but = document.querySelector("#addToCart")
const clic=()=>{
    console.log("clic");
    const idc=id
    const colorC = document.querySelector("#colors").value
    const qte= parseInt(document.querySelector("#quantity").value,10);
    //affichage
    console.log(idc);
    console.log(qte);
    console.log(colorC);

    // localstorage  est un tableau
    let localstorage =localStorage.getItem("panier")
    let tab =[]
    let bool = false
    let newqte;
    const produit = {
        "id":id,
        "quantite":qte,
        "couleur":colorC
    }
    if(colorC===" " && qte!=0){
        alert("Erreur!!! Vous avez  oublié de remplir le champ de la couleur de votre produit...Veillez donc à le remplir SVP!!! ")
        console.log("Error");
    }
    else if( qte===0 && colorC!=""){
        alert("Erreur!!! Vous avez  oublié de remplir le champ du Nombre d'article(s) de votre produit...Veillez donc à le remplir SVP!!! ")
       
    }
    else if(colorC ==="" && qte===0){
        alert("Erreur!!! Vous avez oublié de remplir le champ de la couleur et  celledu Nombre d'article(s) de votre produit...Veillez donc à les remplir SVP!!! ")
      
    }
    else {
        //ici on vérifie si le tableau  n'est pas vide??,
        if (localstorage){
            console.log("hi");
            //ici on parse/rend chaque valeur a son type reel
            tab= JSON.parse(localstorage)
            for(let dat of tab){
                console.log("pls");
                console.log(dat);
                
                if(dat.id===idc && dat.couleur===colorC){
                    bool=true
                    newqte = dat.quantite + qte
                    dat.quantite=newqte
                    console.log("pl");
                    localStorage.setItem("panier",JSON.stringify(tab))
                    //mis a jour du local storage
                    if(newqte>100){
                        dat.quantite=100
                        localStorage.setItem("panier",JSON.stringify(tab))
                        alert("Nombre maximale d'article atteint!!!")
                        break;

                    }
                    alert("Votre produit a bel et bien été mis à jour.")
                    break;
                    
                }
                

                // else{
                //     tab.push({ //push met a la suite du tableau de nouveau élélments
                //         //pour ajouter on rapplles le tableau
                //         id:id, quantite:qte, couleur:colorC
                //     })
                //     //puis on fait la mise a jour du local storage
                //     localStorage.setItem("storage",JSON.stringify(tab))
                // }  
                
            }

            // if(bool===true){
            //     localStorage.setItem("storage",JSON.stringify(tab))
            // }
            if(bool===false){
                tab.push({ id:id, quantite:qte, couleur:colorC}) 
                localStorage.setItem("panier",JSON.stringify(tab))
                alert("Votre produit a bel et bien été ajouté. Merciii de votre confiance")

            }
            
        }
        else{
            tab.push({
                        id:id, quantite:qte, couleur:colorC
                    })
                    localStorage.setItem("panier",JSON.stringify(tab))
                    alert("Votre produit a bel et bien été ajouté. Merciii de votre confiance")
        }

    }
      
        //   
   
    // //si le le tab est vide
    // if(!localstorage){
    //     tab.push({
    //         id:id, quantite:qte, couleur:colorC
    //     })
    //     localStorage.setItem("storage",JSON.stringify(tab))
    // }
//    Div.appendChild(but)
//      but.href = "./cart.html"
    
}
but.addEventListener("click",clic)
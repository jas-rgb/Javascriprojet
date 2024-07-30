fetch("http://localhost:3000/api/products")
.then((res)=>{
    if(res.ok){
        return res.json()
    }
})
.then(function (data){
    console.log(data);
    display(data);
})
//error 

.catch((err)=>{
    console.log("error");
})

var sec =  document.querySelector(".items")
function display(data){
    for(let i=0;i<data.length;i++){
        const a =  document.createElement("a")
        sec.appendChild(a)
        a.href="./product.html?id="+data[i]._id
        const article = document.createElement("article")
        a.appendChild(article)
        const img = document.createElement("img")
        article.appendChild(img)
    //creation de l'imgage
        img.src=data[i].imageUrl
        img.alt=data[i].altTxt
        
    //cretion de la balise h3
        const h3=document.createElement("h3")
        article.appendChild(h3)
    //attribution du titre
        h3.innerHTML=data[i].name
        //creation de la balise p
        const p =document.createElement("p")
        article.appendChild(p)
        p.innerHTML=data[i].description

    }
    

}

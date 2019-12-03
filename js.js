
let ul = document.querySelector("ul");
let div = document.querySelector(".images");
let button = document.querySelector(".reset2");

window.onload = () => {
    axios .get("https://dog.ceo/api/breeds/image/random/3").then (loader => {
        let pics = loader.data.message;
        pics.forEach(e => {
            let img = document.createElement("img");
            img.src = e;
            div.appendChild(img);
        });
    })
}

// creating li items of the different breedNames
function creator(){
axios .get("https://dog.ceo/api/breeds/list/all").then (breedNames => {

    for(let types in breedNames.data.message){
        let li = document.createElement("li");

        li.textContent = types;
        ul.appendChild(li)
        createSub(types,li)
    }
    
    
        
});
}
// event listener to delete the old pages and randomize 3 new ones on the click of the button
button.addEventListener("click", function(e){
    axios .get("https://dog.ceo/api/breeds/image/random/3").then (pictures => {
        
        
        div.innerHTML = "";
        let pics = pictures.data.message;
        pics.forEach(e => {
            let img = document.createElement("img");
            img.src = e;
            div.appendChild(img);
        });
        
        

})



        
    });
        
     // eventlistener on click to get the correct breed pictures
    ul.addEventListener("click", e =>{
        let id = e.target.textContent;
        axios .get("https://dog.ceo/api/breed/"+ id + "/images/random/3").then (breeds => {
        
        div.innerHTML = "";
        let pics2 = breeds.data.message;
        pics2.forEach(e => {
            
                let img = document.createElement("img");
                img.src = e;
                div.appendChild(img);
            
        })
     
        })
    })
  
    function createSub(types,value){
        
        let divBox = document.createElement("div");
        let li = value;
        console.log(li);
        if(types === "buhund" || types === "bulldog" || types === "bullterrier" || 
        types === "cattledog" || types === "collie" || types === "corgi" ||
        types === "dane" || types === "deerhound" || types === "elkhound" ||
        types === "frise" || types === "greyhound" || types === "hound" ||
        types === "mastiff" || types === "mountain" || types === "pinscher" || 
        types === "pointer" || types === "poodle" || types === "retriever" ||
        types === "ridgeback" || types === "schnauzer" || types === "setter" ||
        types === "sheepdog" || types === "spaniel" || types === "springer" ||
        types === "terrier" || types === "waterdog" || types === "wolfhound") {
            axios .get(`https://dog.ceo/api/breed/${types}/list`)
            .then(response => {
                let subs = response.data.message
                
                for(let sub of subs){
                    let li2 = document.createElement("li");
                    let ul2 = document.createElement("ul");
                    li2.textContent = sub;
                    console.log(li2)
                    ul2.appendChild(li2);
                    
                }

            })
        }
    }
  
    
    creator()
    







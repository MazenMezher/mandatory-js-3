
let ul = document.querySelector("ul");
let div = document.getElementsByClassName("images");

axios .get("https://dog.ceo/api/breeds/list/all").then (breeds => {
    console.log(breeds.data.message);
    for(let types in breeds.data.message){
        let li = document.createElement("li");

        li.textContent = types;
        ul.appendChild(li)
    }
    
    
        
});

axios .get("https://dog.ceo/api/breed/hound/afghan/images/random/3").then (pictures => {
        
            console.log(pictures)
            for(let pics in pictures.data.message){
                let img = document.createElement("img");

                img.textContent = pics;
                div.appendChild(img)
            }
        });
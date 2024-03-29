
let ul = document.querySelector("ul");
let div = document.querySelector(".images");
let button = document.querySelector(".reset2");



  
    




  
  if(window.location.hash.includes("-")){
    let hash = window.location.hash.substring(1);
    let splitter = hash.split("-");
    let mainBreed = splitter[0];
    let subBreed = splitter[1];
    message(`${mainBreed} - ${subBreed}`);
    axios .get(`https://dog.ceo/api/breed/${mainBreed}/${subBreed}/images/random/3`).then(img =>{
      div.innerHTML = "";
      for(let links of img.data.message){
          let imgs = document.createElement("img");
          imgs.src = links;
          div.appendChild(imgs);
      }

      
    })
  } else if (window.location.hash) {
    
    let hash = window.location.hash.substring(1);
    message(hash);
    axios .get(`https://dog.ceo/api/breed/${hash}/images/random/3`).then(img =>{
      div.innerHTML = "";
      for(let links of img.data.message){
        let imgs = document.createElement("img");
        imgs.src = links;
        div.appendChild(imgs);
    }
    })
  } else {
    message("Random dogs");
    axios.get(`https://dog.ceo/api/breeds/image/random/3`).then(img => {
      div.innerHTML = "";
      
      for(let links of img.data.message){
        let imgs = document.createElement("img");
        imgs.src = links;
        div.appendChild(imgs);
    }
        
  })

  }
    


function getHashMain(hash){
  // `` <--- tillåter dig att använda ${variabel} istället för concat string
    axios .get(`https://dog.ceo/api/breed/${hash}/list`)
}


// creating li items of the different breedNames
function creator(){
axios .get("https://dog.ceo/api/breeds/list/all").then (breedNames => {

    for(let types in breedNames.data.message){
        let li = document.createElement("li");
        let divBox2 = document.createElement("div");


        li.textContent = types;
        divBox2.appendChild(li);
        ul.appendChild(divBox2);
        clickBreed(li, types);
        createSub(types,divBox2)

        li.addEventListener("click", e => {
          let hash = window.location.hash = types;
          message(hash);
          getHashMain(hash)
        })
    }
    
    
        
});
}
// event listener to delete the old pages and randomize 3 new ones on the click of the button

function newPics(){
   
  button.addEventListener("click", e => {
    div.innerHTML = "";
    if(window.location.hash.includes("-")){
      let hash = window.location.hash.substring(1);
      let splitter = hash.split("-");
      let mainBreed = splitter[0];
      let subBreed = splitter[1];
      axios .get(`https://dog.ceo/api/breed/${mainBreed}/${subBreed}/images/random/3`).then(img =>{
        div.innerHTML = "";
        for(let links of img.data.message){
            let imgs = document.createElement("img");
            imgs.src = links;
            div.appendChild(imgs);
        }
  
        
      })
    } else if (window.location.hash) {
    
      let hash = window.location.hash.substring(1);
      axios .get(`https://dog.ceo/api/breed/${hash}/images/random/3`).then(img =>{
        div.innerHTML = "";
        for(let links of img.data.message){
          let imgs = document.createElement("img");
          imgs.src = links;
          div.appendChild(imgs);
      }
      })
    } else {
      axios.get(`https://dog.ceo/api/breeds/image/random/3`).then(img => {

      for(let links of img.data.message){
        let imgs = document.createElement("img");
        imgs.src = links;
        div.appendChild(imgs);
    }
        
  })

    }

  })
}
     // eventlistener on click to get the correct breed pictures
    function clickBreed(el, breed, subbreed){ 
      
        el.addEventListener("click", e =>{
            e.stopPropagation();
            
            const url = subbreed
                ? "https://dog.ceo/api/breed/"+ breed + "/" + subbreed + "/images/random/3"
                : "https://dog.ceo/api/breed/"+ breed + "/images/random/3";
            axios .get(url).then (breeds => {
            
            div.innerHTML = "";
            let pics2 = breeds.data.message;
            pics2.forEach(e => {
                
                    let img = document.createElement("img");
                    img.src = e;
                    div.appendChild(img);
                
            })
            })
        })
    }
    
    

    function getHashSubs(li){
      let parent = li.parentNode.parentNode.firstChild.textContent;
      let subChild = li.textContent;
      message(`${parent} - ${subChild}`)
      axios .get(`https://dog.ceo/api/breed/${parent}/list`).then(res =>{
        for(let child of res.data.message){
          if(child === subChild){
            subChild = child;
            window.location.hash = `${parent}-${subChild}`;
            
          }
          
        }
      })
    }

    function createSub(types,value){
        
        let divBox = document.createElement("div");
        divBox.className = "subBreedBox";
        let divBox3 = value;
        divBox3.className = "subBox"
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
                    li2.textContent = sub;

                    clickBreed(li2, types, sub);
                    divBox.appendChild(li2); 
                    
                    li2.addEventListener("click", e =>{
                      getHashSubs(e.target);
                      
                    })
                  
                
                }
                divBox3.appendChild(divBox);
                
                

            })
        }
    }
    
    function message(msg){
        document.getElementById("msg").innerHTML= msg;
    }
 
    creator()
    newPics()



/* 

const BASE_URL = 'https://api.openbrewerydb.org/breweries';
let page = 1;

function createBreweryRow(brewery) {
  let div = document.createElement('div');
  let title = document.createElement('h2');
  title.textContent = brewery.name;

  let type = document.createElement('p');
  type.textContent = `Brewery Type: ${brewery.brewery_type}`;

  let gotoButton = document.createElement('button');
  gotoButton.textContent = 'See more';
  gotoButton.addEventListener('click', function() {
    window.location.hash = brewery.id;
    getBrewery(brewery.id);
  });

  div.appendChild(title);
  div.appendChild(type);
  div.appendChild(gotoButton);

  return div;
}

function createPaginationElement() {
  let paginationDiv = document.createElement('div');
  paginationDiv.className = "pagination";
  let nextButton = document.createElement('button');
  let prevButton = document.createElement('button');

  nextButton.textContent = "Next";
  prevButton.textContent = "Prev";

  paginationDiv.appendChild(prevButton);
  paginationDiv.appendChild(nextButton);

  prevButton.addEventListener('click', () => {
    if (page > 1) {
      page -= 1;
      getBreweries(page);
    }
  });

  nextButton.addEventListener('click', () => {
    page += 1;
    getBreweries(page);
  });

  return paginationDiv;
}

function renderBreweries(breweries) {
  const breweriesContainer = document.querySelector('.breweries-container');
  breweriesContainer.innerHTML = "";

  if (breweries) {
    for (let brewery of breweries) {
      let breweryRow = createBreweryRow(brewery);
      breweriesContainer.appendChild(breweryRow);
    }
  }

  let pagination = createPaginationElement();
  breweriesContainer.appendChild(pagination);
}

function createBreweryInfoPElement(label, value) {
  const p = document.createElement('p');
  const labelSpan = document.createElement('span');
  const valueSpan = document.createElement('span');

  labelSpan.textContent = label;
  valueSpan.textContent = value;

  p.appendChild(labelSpan);
  p.appendChild(valueSpan);
  return p;
}

function createBreweryInfoElement(brewery) {
  const container = document.createElement('div');
  container.className = 'brewery-container';

  const title = document.createElement('h2');
  title.textContent = brewery.name;

  container.appendChild(title);

  container.appendChild(
    createBreweryInfoPElement('Brewery Type', brewery.brewery_type)
  );

  container.appendChild(
    createBreweryInfoPElement('Street', brewery.street)
  );

  container.appendChild(
    createBreweryInfoPElement('City', brewery.city)
  );

  container.appendChild(
    createBreweryInfoPElement('State', brewery.state)
  );

  container.appendChild(
    createBreweryInfoPElement('Country', brewery.country)
  );

  container.appendChild(
    createBreweryInfoPElement('Phone', brewery.phone)
  );

  let urlP = document.createElement('p');
  let urlLabelSpan = document.createElement('span');
  let urlValueSpan = document.createElement('span');

  urlLabelSpan.textContent = 'Homepage';
  let urlA = document.createElement('a');
  urlA.textContent = brewery.website_url;
  urlA.setAttribute('href', brewery.website_url);
  urlA.setAttribute('target', '_blank');
  urlValueSpan.appendChild(urlA);

  urlP.appendChild(urlLabelSpan);
  urlP.appendChild(urlValueSpan);

  container.appendChild(urlP);

  return container;
}

function renderBrewery(brewery) {
  const breweriesContainer = document.querySelector('.breweries-container');
  breweriesContainer.innerHTML = "";

  if (brewery) {
    let infoElement = createBreweryInfoElement(brewery);
    breweriesContainer.appendChild(infoElement);
  }
}

function getBreweries(page) {
  let url = BASE_URL;
  if (page) {
    url += `?page=${page}`;
  }

  axios.get(url)
    .then(response => {
      const breweries = response.data;
      renderBreweries(breweries);
    });
}

function getBrewery(id) {
  axios.get(`${BASE_URL}/${id}`)
    .then(response => {
      let brewery = response.data;
      renderBrewery(brewery);
    });
}

let breweryId = window.location.hash;
if (breweryId) {
  breweryId = breweryId.substring(1);
  getBrewery(breweryId);
} else {
  renderBreweries();
  getBreweries();
}


*/


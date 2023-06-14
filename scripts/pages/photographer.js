async function getPhotographers() {
    const reponse = await fetch('./data/photographers.json');
    let recovery = await reponse.json();
    let photographers = recovery["photographers"];
    let medias = recovery["media"];
    return ({
    photographers: [photographers, medias]})
}

async function init() {
    // Récupère les datas des photographes
    const {photographers} = await getPhotographers();
    getHeaderCard(photographers[0]);
    getMediasCard(photographers[1]);

}
        
                // REALISATION DU HEADER DU PHOTOGRAPHE
async function getHeaderCard(photographersData) {
const {id, name, portrait, city, country, tagline, price, } = photographersData;

var photographerId = window.location.search.split("?").join("");

for(let i=0; i<photographersData.length; i++) {
    let photographElementsArray = photographersData[i];
    let photographerElement =photographElementsArray.id;
    if(photographerElement==photographerId){
        const photographHeader = document.querySelector(".photograph-header") //parametre du conteneur HEADER
        photographHeader.style.display = "flex";
        photographHeader.style.justifyContent = "space-between";
        photographHeader.style.paddingLeft = "70px";
        photographHeader.style.paddingRight = "70px";
        photographHeader.style.alignItems = "center";
        photographHeader.style.paddingTop = "10px";
        photographHeader.style.paddingBottom = "10px";

        const figcaption = document.createElement("figcaption");   // conteneur sur info du photographe
        figcaption.style.display ="flex"
        figcaption.style.flexDirection ="column"
        figcaption.style.alignItems ="start";
        figcaption.style.paddingLeft = "0";

        const name = document.createElement("h1");                 // ajout du nom du photographe 
        name.textContent = (photographElementsArray.name);
        name.style.fontSize = "60px";
        name.style.color = "#D3573C"
        name.style.marginBottom = "0"
        name.style.margin ="0";

        const pCityCountry = document.createElement('p');          // ajout de sa situation géographique
        pCityCountry.textContent = ((photographElementsArray.city) +" " + (photographElementsArray.country)) ;
        pCityCountry.style.fontSize ="25px";
        pCityCountry.style.color = "#901C1C";
        pCityCountry.style.marginBottom ="0";
        pCityCountry.style.marginTop= "0";
    
        const pTagline = document.createElement('P');               // ajout commentaire du photographe
        pTagline.textContent = (photographElementsArray.tagline);
        pTagline.style.color = "#000000";
        pTagline.style.marginTop ="10px";                
    
        figcaption.appendChild(name); 
        figcaption.appendChild(pCityCountry);
        figcaption.appendChild(pTagline); 
                                
        
        const button = document.querySelector("button");            // insertion de figcaption avant le bouton
        photographHeader.insertBefore(figcaption, button); 
                
        const img = document.createElement("img");                   //ajout photo du photographe
        const picture = photographElementsArray.portrait;
        img.setAttribute("src", `assets/photographers/`+picture);
        img.style.width = "200px";
        img.style.height = "200px"
        img.style.borderRadius = "50%";
        img.style.objectFit = "cover";
        photographHeader.appendChild(img);
        }

    }
}
                    // MISE EN PLACE DES PHOTOS DU PHOTOGRAPHE
async function getMediasCard(mediasData,name) {
    const {id, photographersId, title, image,likes,date,price} = mediasData;
    let mediasElementArray = mediasData 
    var photographerId = window.location.search.split("?").join("");

                    // RECUPERATION PRENOM DU PHOTOGRAPHE POUR OUVERTURE DE SON DOSSIER MEDIA
    var photographNameRecovery = document.querySelector("h1").textContent;   
    var lastSpace = photographNameRecovery.lastIndexOf(" ");
    var firstNameRecovery = photographNameRecovery.substring(0, lastSpace);
    var checkFirstName = firstNameRecovery.lastIndexOf("-");
    if(checkFirstName>-1){
        firstNameRecovery = firstNameRecovery.substring(0, checkFirstName)+" "+firstNameRecovery.substring(checkFirstName+1);
    }

                // PARAMETRAGE DU CONTENEUR (POUR CARTES MEDIAS DU PHOTOGRAPHE)
    const photograpMedia = document.createElement("div");
    photograpMedia.className = "photograph-media";
    photograpMedia.style.display = "grid";
    photograpMedia.style.gridTemplateColumns ="1fr 1fr 1fr";
    photograpMedia.style.gap = "70px";
    photograpMedia.style.justifyContent ="space-between";
    photograpMedia.style.alignItems ="space-between";
    photograpMedia.style.marginLeft ="100px";
    photograpMedia.style.marginTop = "70px";
    photograpMedia.style.marginRight = "100px";

    for(let j=0; j<mediasElementArray.length; j++) {
        if(mediasElementArray[j].photographerId == photographerId) {
            const mediaCards = document.createElement("div");
            mediaCards.className ="mediacards";
            mediaCards.style.display = "flex";
            mediaCards.style.flexDirection = "column"
            mediaCards.style.width ="100%"
            mediaCards.style.height ="400px"
            const img = document.createElement("img");
            
            img.style.width="100%";
            img.style.height= "350px";
            img.style.objectFit = "cover";
            img.style.marginRight = "0";
      
                        // REMPLISSAGE DE CE CONTENEUR
            img.setAttribute("src",`assets/photographers/Sample Photos/`+firstNameRecovery+`/`+mediasElementArray[j].image); //photos ou vidéo

            const figcaption = document.createElement("figcaption");   // création du conteneur information photo ou vidéo
            figcaption.style.display = "flex";
            figcaption.style.width = "100%"
            figcaption.style.justifyContent ="space-between"
            figcaption.style.alignItems = "center"                

            const mediaTitle = document.createElement("p");                  // ajout du titre de la photo     
            mediaTitle.className = "mediaTitle";  
            mediaTitle.textContent = mediasElementArray[j].title;
            
            const likesContainer = document.createElement("div");   // création du conteneur  pour nombre de "like"
            likesContainer.className = "likesContainer";
            likesContainer.style.display = "flex";
            likesContainer.style.width = "15%"
            likesContainer.style.verticalAlign="center";
            likesContainer.style.justifyContent = "space-between";

            const likesNumber = document.createElement("p");                  // ajout du nombre de "likes"
            likesNumber.textContent = mediasElementArray[j].likes;
            likesNumber.style.verticalAlign  ="middle";

            const heartContainer= document.createElement("div");            // ajout du coeur 
            heartContainer.style.display = "flex";
            heartContainer.style.justifyContent = "center";
            heartContainer.style.alignItems = "center";
            heartContainer.className = "heart";
            const heart = document.createElement("li");
            heart.className = "fa-solid fa-heart";
            heart.style.color = "#901C1C"
            
            heartContainer.appendChild(heart);                            // intégration des "enfants" dans les "parents"
            mediaCards.append(img);
            likesContainer.appendChild(likesNumber);

            
            likesContainer.appendChild(heartContainer);
            figcaption.append(mediaTitle);
            figcaption.append(likesContainer);
            mediaCards.append(figcaption);
            photograpMedia.appendChild(mediaCards);
            const main= document.querySelector("main");
            main.appendChild(photograpMedia);
        }
    }
}

init();

           // COMPTAGE DES CLICS SUR LE COEUR   
const clickCount= document.querySelector("");
clickCount.addEventListener("click", heartCount);

function  heartCount() {
    console.log("bravo!!!!!");

}

       
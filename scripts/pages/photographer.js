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
    var zouzou = photographers[0];
    console.log (zouzou);
    getMediasCard(photographers[1], zouzou);
    
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
async function getMediasCard(mediasData,forDayPriceData) {
    const {id, photographersId, title, image,video,likes,date,price} = mediasData;
    var mediasElementArray = mediasData 
    var forDayPrice = forDayPriceData;
    console.log(forDayPrice);
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


    let likesSum = 0;
    let likesToAdd = 0;
    for(let j=0; j<mediasElementArray.length; j++) {
        if(mediasElementArray[j].photographerId == photographerId) {
            const mediaCards = document.createElement("div");
            mediaCards.className ="mediacards";
            mediaCards.style.display = "flex";
            mediaCards.style.flexDirection = "column"
            mediaCards.style.width ="100%"
            mediaCards.style.height ="400px"
            const img = document.createElement("img");
            //const video = document.createElement("video");
            
            img.style.width="100%";
            img.style.height= "350px";
            img.style.objectFit = "cover";
            img.style.marginRight = "0";
            /*
            video.style.width = "100%";
            video.style.height= "350px";
            video.style.objectFit = "cover";
            video.style.marginRight = "0";
      */
      

//console.log (typeof mediasElementArray[j]["video"]);


                        // REMPLISSAGE DE CE CONTENEUR
            img.setAttribute("src",`assets/photographers/Sample Photos/`+firstNameRecovery+`/`+mediasElementArray[j].image); //photos
            //video.setAttribute("src",`assets/photographers/Sample Photos/`+firstNameRecovery+`/`+mediasElementArray[j].video);//video
            
            const figcaption = document.createElement("figcaption");   // création du conteneur information photo ou vidéo
            figcaption.style.display = "flex";
            figcaption.style.width = "100%"
            figcaption.style.justifyContent ="space-between"
            figcaption.style.alignItems = "center"                

            const mediaTitle = document.createElement("p");                  // ajout du titre de la photo     
            mediaTitle.className = "mediaTitle";  
            mediaTitle.textContent = mediasElementArray[j].title;
            
            const likesContainer = document.createElement("div");   // création du conteneur  pour nombre de "like"
            likesContainer.className = "likesContainer"+[j];
            likesContainer.style.display = "flex";
            likesContainer.style.width = "15%"
            likesContainer.style.verticalAlign="center";
            likesContainer.style.justifyContent = "space-between";

            const likesNumber = document.createElement("p");                 // ajout du nombre de "likes"
            likesNumber.className = "likesNumber";
            likesNumber.textContent = mediasElementArray[j].likes;

            likesToAdd = mediasElementArray[j].likes;
            likesSum += likesToAdd;

            const heartContainer= document.createElement("div");            // ajout du coeur 
            var retour = heartContainer.addEventListener("click", heartCount);    // mise des coeurs en écoute
            heartContainer.style.display = "flex";
            heartContainer.style.justifyContent = "center";
            heartContainer.style.alignItems = "center";
            heartContainer.className = "heart"+[j];
            heartContainer.value = [j];

            const heart = document.createElement("li");
            heart.className = "fa-solid fa-heart";
           
            heart.value =[j];
            heart.style.color = "#901C1C";
            
            heartContainer.appendChild(heart);                            // intégration des "enfants" dans les "parents"
            mediaCards.appendChild(img);
            //mediaCards.appendChild(video);
            likesContainer.appendChild(likesNumber);

            
            likesContainer.appendChild(heartContainer);
            figcaption.append(mediaTitle);
            figcaption.append(likesContainer);
            mediaCards.append(figcaption);
            photograpMedia.appendChild(mediaCards);
            const main= document.querySelector("main");
            main.appendChild(photograpMedia);

            //  recupération du prix à la journée du photographe
            let recoveryPhotographerId = mediasElementArray[j].photographerId;

            for (k=0; k<forDayPrice.length; k++) {
                foundPhotographerNumber = forDayPrice[k].id;

                if (foundPhotographerNumber==recoveryPhotographerId) {
                var dayPrice = forDayPrice[k].price;
                console.log(foundPhotographerNumber);
                console.log(dayPrice);
                    
                }
            }
        }       
    }

                       // creation du conteneur de bas de page avec nombre de "likes" et coût à la jounée.
         const totalLikesAndTarif = document.createElement("totalLikesAndTarif");
         totalLikesAndTarif.style.display = "flex";
         totalLikesAndTarif.style. justifyContent = "space-between";
         totalLikesAndTarif.style.alignItems = "center";
         totalLikesAndTarif.style.padding = "0 25px"
         totalLikesAndTarif.style.width = "250px";
         totalLikesAndTarif.style.height ="50px";
         totalLikesAndTarif.style.fontWeight = "bold";
         totalLikesAndTarif.style.color = "black";
         totalLikesAndTarif.style.background = "#D3573C";
         totalLikesAndTarif.style.position = "fixed";
         totalLikesAndTarif.style.zIndex = "3";
         totalLikesAndTarif.style.bottom = "0";
         totalLikesAndTarif.style.right = "20px"

        const divLikesAndHeart = document.createElement("div");  //conteneur pour total des "likes" + icone du coeur (ci-dessous)
        divLikesAndHeart.style.display = "flex";
        divLikesAndHeart.style.justifyContent = "center";
        divLikesAndHeart.style.alignItems = "center";

        const likesTotal = document.createElement("p");         // "p" pour total des "likes"
        likesTotal.className = "likesTotal";
        likesTotal.textContent = likesSum;
        likesTotal.style.paddingRight = "4px";
        divLikesAndHeart.appendChild(likesTotal);

        const heart = document.createElement("li");             // "li" pour icone du coeur
        heart.className = "fa-solid fa-heart";
        divLikesAndHeart.appendChild(heart);
        
        totalLikesAndTarif.appendChild(divLikesAndHeart);      

        const photographerDayPrice = document.createElement("p");   // création du conteneur <p> pour le tarif à la journée  
        photographerDayPrice.textContent = dayPrice+"€ / jour" ;
        totalLikesAndTarif.appendChild(photographerDayPrice);
        
        document.querySelector("#main").appendChild(totalLikesAndTarif);  // intégration de ce conteneur dans "main"

                          // fin de ce conteneur
}
var boubou = init();




           // RECUPERATION EMPLACEMENT COEUR CLIQUE ET MODIFICATION DU NOMBRE DE "LIKES" ET DU TOTAL en bas de l'ecran
async function  heartCount(event) {
    const reponse = await fetch('./data/photographers.json');
    let recovery = await reponse.json();
    let medias = recovery["media"];
   
    let ClickedHeartContainer = event.target;                 // "id" du coeur cliqué
    let listPosition = event.target.value;                      // position dans la liste des "mediaCards" du photographes
    let upParent1 = ClickedHeartContainer.parentNode;           // remonté d'un cran vers le parent juste au dessus
    let upParent2 = upParent1.parentNode;                       // remonté d'un cran supplémentaire vers parent du parent
    let likeHeartcontainer = upParent2.childNodes;              // recupération du conteneur enfant du grand parent


    let originLikesNumber = medias[listPosition].likes;         // nombre de likes (récupéré dans le fichier medias de JSON)  
    let actuallyLikesNumber = likeHeartcontainer[0].innerText;  // nombre de "likes" affiché sur la page
    if(originLikesNumber==actuallyLikesNumber) {                // vérification entre Nbre de"likes" du fichier JSON et de la page affichée
        actuallyLikesNumber ++;                                 // Si égalité incrémentation
        likeHeartcontainer[0].innerText =actuallyLikesNumber;   // et on affiche la nouvelle quantité 
        ajoutAuTotal() ;                                        // appel de la fonction pour augmenter le total en bas de l'écran
    }
    else {
        actuallyLikesNumber--;                                 // sinon "inlikes"
        likeHeartcontainer[0].innerText =actuallyLikesNumber;  // et on affiche la nouvelle quantité (soit 1 "like" de moins)
        retryAuTotal()                                         // appel de la fonction pour diminuer le total en bas de l'écran
    }
    async function ajoutAuTotal() {                            // fonction augmenter le total de "likes" en bas écran
        let recoveryQuantity = document.querySelector(".likesTotal");    //récupération conteneur
        let newQuantity = recoveryQuantity.textContent;                  //récupération quantité
        un = 1;
        newQuantity = parseInt(newQuantity) + un;                        //aumentation de 1
        recoveryQuantity.textContent = newQuantity;                      // intégration de la nouvelle quantité dans le conteneur
    }

    async function retryAuTotal() {                            // fonction diminuer le total de "likes" en bas écran  
        let recoveryQuantity= document.querySelector(".likesTotal");
        let newQuantity  = recoveryQuantity.textContent;
        un = 1;
        newQuantity= parseInt(newQuantity) - un;
        recoveryQuantity.textContent = newQuantity;
    }
}
                        // FIN DE CETTE PARTIE
                   
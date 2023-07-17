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
    getMediasCard(photographers[1], photographers[0]);
    
}
        
                // REALISATION DU HEADER DU PHOTOGRAPHE
async function getHeaderCard(photographersData) {
//const {id, name, portrait, city, country, tagline, price} = photographersData; 

var photographerId = window.location.search.split("?").join("");

  
for(let i=0; i<photographersData.length; i++) {
    let photographElementsArray = photographersData[i];
    let photographerElement =photographElementsArray.id;
    if(photographerElement==photographerId){
        const photographHeader = document.querySelector(".photograph-header"); //parametre du conteneur HEADER
        photographHeader.style.display = "flex";
        photographHeader.style.justifyContent = "space-between";
        photographHeader.style.paddingLeft = "70px";
        photographHeader.style.paddingRight = "70px";
        photographHeader.style.alignItems = "center";
        photographHeader.style.paddingTop = "10px";
        photographHeader.style.paddingBottom = "10px";
        photographHeader.style.marginLeft = "30px";
        photographHeader.style.marginRight = "30px";

        const figcaption = document.createElement("figcaption");   // conteneur sur info du photographe
        figcaption.style.display ="flex";
        figcaption.style.flexDirection ="column";
        figcaption.style.alignItems ="start";
        figcaption.style.paddingLeft = "0";

        const name = document.createElement("h1");                 // ajout du nom du photographe 
        name.textContent = (photographElementsArray.name);
        name.style.fontSize = "60px";
        name.style.color = "#D3573C";
        name.style.marginBottom = "0";
        name.style.margin ="0";

        const modal = document.querySelector(".modal");             // ajout du nom également dans la modale
        const nameInForm = document.createElement("P");
        nameInForm.style.display = "flex";
        nameInForm.style.width = "100%";
        nameInForm.style.paddingLeft = "0";
        nameInForm.style.fontSize = "54px";
        nameInForm.style.marginTop = "0";
        nameInForm.textContent = (photographElementsArray.name);
        const form = document.querySelector("form");
        modal.insertBefore(nameInForm, form);

        const pCityCountry = document.createElement('p');          // ajout de sa situation géographique
        pCityCountry.textContent = ((photographElementsArray.city) +" " + (photographElementsArray.country));
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


           // FIN DE LA PARTIE REALISATION DU HEADER


                    // MISE EN PLACE DES PHOTOS DU PHOTOGRAPHE
async function getMediasCard(mediasData,forDayPriceData) {
    //const {id, photographersId, title, image,video,likes,date,price} = mediasData;
    var forDayPrice = forDayPriceData;
    var mediasElementArray = mediasData;
    var photographerId = window.location.search.split("?").join("");

                    // RECUPERATION PRENOM DU PHOTOGRAPHE POUR OUVERTURE DE SON DOSSIER MEDIA
    var photographNameRecovery = document.querySelector("h1").textContent; 
    console.log(photographNameRecovery);
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
    photograpMedia.style.marginTop = "70px";

    const main= document.querySelector("#main");
    main.appendChild(photograpMedia);


    var photographerArray =new Array();             // réalisation d'un tableau non trié de toutes les photos et videos du photographe
    for(let s=0; s<mediasElementArray.length; s++) {
        if(mediasElementArray[s].photographerId == photographerId) {
        photographerArray.push(mediasElementArray[s]);
        var initialSort = 0;
        }
    }
    genererMediaCards(photographerArray);




 //-------------------------------------------------- MODULE DE TRI---------------------------------------------------------
           //initialisation du tri à "Popularité" (à l'ouverture de la page du photographe)
    if(initialSort==0) {           // initialisation du tri à "Popularité" (à l'ouverture de la page du photographe) 
       likesSort();
        popularityWindow.style.display = "none";
    }

    var textOfThePosition=0;
    var positionTwo = document.querySelector(".positionTwo");    // "ecoute" si click dans le conteneur déroulant sur "positionTwo"
    positionTwo.addEventListener("click", recoveryBeforeSort1);
    positionTwo.addEventListener("keydown", function(event) {
        if(event.keyCode==ENTER) {
            recoveryBeforeSort1();  
        }
    });

    function recoveryBeforeSort1() {
        textOfThePosition = positionTwo.textContent; 
        textContentModificationAndSortAsk(positionTwo);  
    }

    var positionThree = document.querySelector(".positionThree");    // "ecoute" si click dans le conteneur déroulant sur "positionThree" 
    positionThree.addEventListener("click", recoveryBeforeSort2);
    positionThree.addEventListener("keydown", function(event) {
        if(event.keyCode==ENTER) {
            recoveryBeforeSort2();
        }
    });

    function recoveryBeforeSort2() {
        textOfThePosition = positionThree.textContent; 
        textContentModificationAndSortAsk(positionThree);  
    } 

    function textContentModificationAndSortAsk (position) {    // fonction qui réorganise les textes et appelle la fonction de tri choisi
        let actualSort= document.querySelector(".positionOne"); // on récupère le texte à coté de "TRIER PAR:"
        let previousActualSort = actualSort.textContent;        // on stocke dans une variable la valeur récupérée précédemment
        actualSort.textContent= textOfThePosition;              // on met à coté de "TRIER PAR" le texte du bouton cliqué
        position.textContent=previousActualSort;                // et maintenant on met à l'endroit cliqué le text du précédent tri
        switch(actualSort.textContent) {                  // en fonction du texte cliqué on appelle la fonction demandée
            case "Date":
                dateSort();          // fonction pour trier par date
                break;
            case "Titre":
                titleSort();         // fonction pour trier par titre
                break;
            case "Popularité":
                likesSort();         // fonction pour trier par "likes"
                break;
        }
        
    }

    function likesSort() {
        let elementsOfMediacards = document.querySelectorAll(".mediacards");
        const listeOrdonneepopularity = Array.from(elementsOfMediacards);   // création d'un tableau à partir de celui du photographe

        for(let v=0; v<elementsOfMediacards.length; v++) {
            listeOrdonneepopularity.sort(function(a,b) {         // tri pour réaliser un tableau des titres du plus récent au plus ancien    
            let A = a.querySelector("figcaption .likesNumber").textContent;     //récupération du nombres de likes dans le conteneur A
            let B = b.querySelector("figcaption .likesNumber").textContent;     // idem dans le B
            return A-B;
            });
        }
        const listeOrdonneepopularity1 = listeOrdonneepopularity.reverse();
        display(listeOrdonneepopularity1);                                                  
    }

    function dateSort() {
        let elementsOfMediacards = document.querySelectorAll(".mediacards");
        const listeOrdonneeDate = Array.from(elementsOfMediacards);    // création d'un tableau à partir de celui du photographe
    
        for(let t=0; t<elementsOfMediacards.length; t++) {
            listeOrdonneeDate.sort(function(a,b) {              // tri pour réaliser un tableau des dates du plus récent au plus ancien
            let A = a.querySelector("figcaption").getAttribute("date");
            let B = b.querySelector("figcaption").getAttribute("date");
            return A.split("-").join("") - B.split("-").join("");  // comparaison des éléments entre eux (ici je retire les "-"et " "
            });
        } 
        const listeOrdonneeDate1 = listeOrdonneeDate.reverse();   // inversion du tableau pour avoir les dates du plus ancien au plus récent
        display(listeOrdonneeDate1);   
    }

    function titleSort() {
        let elementsOfMediacards = document.querySelectorAll(".mediacards");
        const listeOrdonneeTitle = Array.from(elementsOfMediacards);   // création d'un tableau à partir de celui du photographe

        for(let u=0; u<elementsOfMediacards.length; u++) {
            listeOrdonneeTitle.sort(function(a,b) {         // tri pour réaliser un tableau des titres du plus récent au plus ancien    
            let A = a.querySelector("figcaption .mediaTitle").textContent;
            let B = b.querySelector("figcaption .mediaTitle").textContent;
            return A.split(/\s*[\\,]*\s*/).join("").localeCompare(B.split(" ").join("")); //comparaison en supprimant "," et " "
            });
        }   
        display(listeOrdonneeTitle);
    }

    function display(mediaCardsArray) {               // fonction pour réorganiser l'affichage des mediascards en fonction du tri demandé
        var containerDateOrder =document.querySelector(".photograph-media");
        mediaCardsArray.forEach(function(card) {
        containerDateOrder.appendChild(card);                                                   
        card.addEventListener("click", function(event) {
        var clickphoto = event.target; 
        event.stopImmediatePropagation();
    
        containerDateOrder =document.querySelector(".photograph-media");
        openLightbox(clickphoto); 
        });
    });
        popularityMenu(initialSort); 
        initialSort=1;    
}   
//-------------------------------------------FIN DU MODULE DE TRI--------------------------------------    



//------------------------------------DEBUT DE REALISATION DES MEDIAS DU PHOTOGRAPHE--------------------------
    function genererMediaCards(elementsArray) {
        var likesSum = 0;
        var likesToAdd = 0;
        for(let j=0; j<elementsArray.length; j++) {
            const mediaCards = document.createElement("div");  // création de chaque carte (comprenend photo et descriptif)
            mediaCards.className ="mediacards";
            mediaCards.style.display = "flex";
            mediaCards.style.flexDirection = "column";
            mediaCards.tabIndex ="0";

            const img = document.createElement("img");
            img.style.cursor = "pointer";
            img.style.width="100%";
            img.style.height= "350px";
            img.style.objectFit = "cover";
            img.style.marginRight = "0";

            const video = document.createElement("video");
            video.style.cursor = "pointer";
            video.style.width = "100%";
            video.style.height= "350px";
            video.style.objectFit = "cover";
            video.style.marginRight = "0";
                            
            if(elementsArray[j].image!=undefined) {     // définir si photo ou video et insertion de l'élément trouvé 
                img.setAttribute("src",`assets/photographers/Sample Photos/`+firstNameRecovery+`/`+elementsArray[j].image);
                mediaCards.appendChild(img);
            }
                else {
                    video.setAttribute("src",`assets/photographers/Sample Photos/`+firstNameRecovery+`/`+elementsArray[j].video);
                    mediaCards.appendChild(video);
                }
            
            const figcaption = document.createElement("figcaption");   // création du conteneur information photo ou vidéo
            figcaption.style.display = "flex";
            figcaption.style.width = "100%";
            figcaption.style.justifyContent ="space-between";
            figcaption.style.alignItems = "center";
            figcaption.setAttribute("date", elementsArray[j].date);             

            const mediaTitle = document.createElement("p");                  // ajout du titre de la photo     
            mediaTitle.className = "mediaTitle";  
            mediaTitle.textContent = elementsArray[j].title;
        
            
            const likesContainer = document.createElement("div");   // création du conteneur  pour nombre de "like"
            likesContainer.className = "likesContainer"+[j];
            likesContainer.style.display = "flex";
            likesContainer.style.width = "15%";
            likesContainer.style.verticalAlign="center";
            likesContainer.style.justifyContent = "space-between";

            const likesNumber = document.createElement("h5");                 // ajout du nombre de "likes"
            likesNumber.className = "likesNumber";
            likesNumber.textContent = elementsArray[j].likes;
            likesNumber.role ="dialog";
            likesNumber.ariaLabel ="likes";


            likesToAdd = elementsArray[j].likes;
            likesSum += likesToAdd;

           const heartContainer= document.createElement("div");            // ajout du coeur 
            heartContainer.style.display = "flex";
            heartContainer.style.justifyContent = "center";
            heartContainer.style.alignItems = "center";
            heartContainer.className = "heart"+[j] ;
            heartContainer.value = [j];

            const heart = document.createElement("li");
            heart.className = "fa-regular fa-heart";
            heart.style.cursor = "pointer";
            heart.value =[j];
            heart.style.color = "#901C1C";

            heart.addEventListener("click", function heartCount(event) {   //ecoute si clic sur coeur et analyse position 
                let clickHeart = event.target; 
                event.stopImmediatePropagation()              
                likesModified(clickHeart , elementsArray);     // appel de la fonction pour modification quantité, avec comme arguments
            
            });
            heartContainer.appendChild(heart);                            // intégration des "enfants" dans les "parents"
            likesContainer.appendChild(likesNumber);       
            likesContainer.appendChild(heartContainer);
            figcaption.appendChild(mediaTitle);
            figcaption.appendChild(likesContainer);
            mediaCards.appendChild(figcaption);
            photograpMedia.appendChild(mediaCards);
          
            let recoveryPhotographerId = elementsArray[j].photographerId;

            for (let k=0; k<forDayPrice.length; k++) {
                let foundPhotographerNumber = forDayPrice[k].id;

                if (foundPhotographerNumber==recoveryPhotographerId) {
                var dayPrice = forDayPrice[k].price;
                }
            }              
        }

                      // creation du conteneur de bas de page avec nombre de "likes" et coût à la jounée.
         const totalLikesAndTarif = document.createElement("div");
         totalLikesAndTarif.className = "totalLikesAndTarif";
         totalLikesAndTarif.style.display = "flex";
         totalLikesAndTarif.style. justifyContent = "space-between";
         totalLikesAndTarif.style.alignItems = "center";
         totalLikesAndTarif.style.padding = "0 25px";
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
        likesTotal.innerHTML ="";
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

    }                              // fin de ce conteneur               
}

init();


    // FONCTION POUR RECUPERER L'EMPLACEMENT DU COEUR CLIQUE ET MODIFICATION DU NOMBRE DE "LIKES" ET DU TOTAL EN BAS DE L'ECRAN
function likesModified(eventHeartClicked, photographHeartsArray) {
    let positionHeartClicked = eventHeartClicked.value;
              
    let upParent1 = eventHeartClicked.parentNode;           // remonté d'un cran vers le parent juste au dessus
    let upParent2 = upParent1.parentNode;                       // remonté d'un cran supplémentaire vers parent du parent
    let likeHeartcontainer = upParent2.childNodes;              // recupération du conteneur enfant du grand parent

    let originLikesNumber = photographHeartsArray[positionHeartClicked].likes; // nombre de likes (récupéré dans le fichier medias de JSON)  
    let actuallyLikesNumber = likeHeartcontainer[0].innerText;  // nombre de "likes" affiché sur la page

    if(originLikesNumber==actuallyLikesNumber) {                // vérification entre Nbre de"likes" du fichier JSON et de la page affichée
        actuallyLikesNumber ++;                                 // Si égalité incrémentation
        likeHeartcontainer[0].innerHTML =actuallyLikesNumber;   // et on affiche la nouvelle quantité 
        eventHeartClicked.className= "";
        eventHeartClicked.className ="fa-solid fa-heart";
        ajoutAuTotal();                                        // appel de la fonction pour augmenter le total en bas de l'écran
    }
    else {
        actuallyLikesNumber--;                                 // sinon "inlikes"
        likeHeartcontainer[0].innerHTML =actuallyLikesNumber;  // et on affiche la nouvelle quantité (soit 1 "like" de moins)
        eventHeartClicked.className = "";
        eventHeartClicked.className ="fa-regular fa-heart";        
        retryAuTotal();                                        // appel de la fonction pour diminuer le total en bas de l'écran
                                    
    }
    async function ajoutAuTotal() {  // fonction augmenter le total de "likes" en bas écran                     
        const recoveryQuantity = document.querySelector(".likesTotal");    //récupération conteneur
        let newQuantity = recoveryQuantity.innerHTML;          //récupération quantité
        newQuantity = parseInt(newQuantity) + 1;
        recoveryQuantity.innerText = newQuantity;                       //aumentation de 1 
    }

    async function retryAuTotal() {                            // fonction diminuer le total de "likes" en bas écran   
        let recoveryQuantity= document.querySelector(".likesTotal");
        let newQuantity  = recoveryQuantity.innerText;
        newQuantity= parseInt(newQuantity) - 1; 
        recoveryQuantity.textContent = newQuantity;
    }
}                        // FIN DE CETTE PARTIE

         // REALISATION DE STRUCTURER HTML DE "TRI PAR: POPULARITE - TITRE - DATE" )
const divSort = document.createElement("div");       // création div générale
divSort.className = "divSort";
divSort.style.display = "flex";
divSort.style.justifyContent = "space between";
divSort.style.marginTop = "20px";
divSort.style.marginLeft = "100px";
divSort.style.alignItems ="start";
divSort.style.width = "500px";
divSort.style.height = "40px";
divSort.style.fontSize ="20px";
divSort.style.fontWeight = "bold";

const comment = document.createElement("p");        // creation de "p" pour texte: "Trier par"
comment.textContent = "Trier par";
comment.style.paddingRight = "30px";

const divPopularityContainer = document.createElement("div");
divPopularityContainer.style.display ="flex";
divPopularityContainer.style.flexDirection = "column";
divPopularityContainer.style.justifyContent = "start";

const divPopularity = document.createElement("div");
divPopularity.className = "divPopularity";
divPopularity.style.display = "flex";
divPopularity.style.justifyContent = "space-evenly";
divPopularity.style.alignItems = "center";
divPopularity.style.width = "180px";
divPopularity.style.backgroundColor = "#901C1C";
divPopularity.style.color = "white";
divPopularity.style.borderRadius= "5px";
const sortChoice = document.createElement("p");
sortChoice.className = "positionOne";
sortChoice.style.display ="flex";
sortChoice.style.justifyContent ="center";
sortChoice.style.width = "70%";
sortChoice.textContent = "Popularité";

const openIcon = document.createElement("li");
openIcon.className = "chevronIcon";
openIcon.ariaCurrent="true"
openIcon.style.display = "flex";
openIcon.style.justifyContent ="center";
openIcon.style.width = "30%";
openIcon.className ="fa-solid fa-chevron-down";
openIcon.style.cursor ="pointer";
openIcon.tabIndex = "0";
divPopularity.appendChild(sortChoice);
divPopularity.appendChild(openIcon);
divSort.appendChild(comment);

divPopularityContainer.appendChild(divPopularity);
divSort.appendChild(divPopularityContainer);
document.querySelector("#main").appendChild(divSort);


const popularityWindow = document.createElement("div");
popularityWindow.style.display = "none";
popularityWindow.style.position = "relative";
popularityWindow.style.zIndex = "10";
popularityWindow.style.minWidth = "60px";
popularityWindow.style.width = "170px";
popularityWindow.style.marginTop = "0";
popularityWindow.style.paddingLeft = "10px";
popularityWindow.style.height ="110px";
popularityWindow.style.color = "white";
popularityWindow.style.backgroundColor = "#901C1C";
popularityWindow.style.borderBottomLeftRadius= "5px";
popularityWindow.style.borderBottomRightRadius= "5px";
popularityWindow.style.boxShadow = "0px 3px 5px grey";
divPopularityContainer.appendChild(popularityWindow);

const dateSort = document.createElement("p");
dateSort.className = "positionTwo";
dateSort.style.marginTop = "0";
dateSort.style.marginRight = "10px";
dateSort.style.textIndent = "5px";
dateSort.textContent = "Date";
dateSort.style.padding = "10px 0";
dateSort.style.borderTop ="1px solid white";
dateSort.style.borderBottom = "1px solid white";
dateSort.style.cursor = "pointer";
dateSort.tabIndex ="0";
const titleSort = document.createElement("p");
titleSort.className = "positionThree";
titleSort.textContent = "Titre";
titleSort.style.marginTop = "0";
titleSort.style.paddingTop ="-30px";
titleSort.style.cursor ="pointer";
titleSort.tabIndex ="0";
popularityWindow.appendChild(dateSort);
popularityWindow.appendChild(titleSort);
 

        // CHANGEMENT DE L'ASPECT DU BOUTON "CONTACTEZ-MOI" AU SURVOL DE LA SOURIS
const buttonMouseover = document.querySelector(".contact_button");
buttonMouseover.addEventListener("mouseover", function(){
    buttonMouseover.style.backgroundColor="#D3573C";
    buttonMouseover.style.color="black";
});

const buttonMouseout = document.querySelector(".contact_button");
buttonMouseout.addEventListener("mouseout", function(){
    buttonMouseout.style.backgroundColor="#901C1C";
    buttonMouseout.style.color="white";
});


        // RETOUR A LA PAGE PRINCIPALE EN CLIQUANT SUR LE LOGO
//const addClassName = document.querySelector("body header");
const mainPageReturn = document.querySelector("body header img");  
mainPageReturn.style.cursor ="pointer";    
mainPageReturn.addEventListener("click", function(){
    history.back();
});


        // OUVERTURE DE LA FENETRE DE POPULARITE
const ENTER =13;
const popularityClick = document.querySelector("li");
popularityClick.addEventListener("click", popularityMenu);
popularityClick.addEventListener("keydown", function(event) {
    if(event.keyCode == ENTER) {
        popularityMenu();
    }
});

function popularityMenu(originSort) {
    if(originSort==0){
        openIcon.className ="fa-solid fa-chevron-down"; 
    }
    else if(getComputedStyle(popularityWindow).display !="none") {
        popularityWindow.style.display = "none";
        openIcon.className ="fa-solid fa-chevron-down";
        divPopularity.style.borderBottomLeftRadius= "5px";
        divPopularity.style.borderBottomRightRadius= "5px";
    }
    else {
        popularityWindow.style.display = "block";
        openIcon.className ="fa-solid fa-chevron-up";
        divPopularity.style.borderBottomLeftRadius= "0";
        divPopularity.style.borderBottomRightRadius= "0";
    }
}

        //  MODULE POUR RENDRE RESPONSIVE LA PAGE
        const bodySize2 = document.querySelector("body");
        bodySize2.style.maxWidth ="1440px";
        bodySize2.style.margin = "auto";
        bodySize2.style.boxSizing ="border box";
        
        const wrap3 = document.querySelector(".photograph-header");
        wrap3.style.flexWrap = "wrap";
        
        
        const screenSize3 = window.matchMedia( '(min-width : 1024px)' );
        screenSize3.addEventListener('change', tablette2); 
        function tablette2(e) {
            const changeScreenSize3 = document.querySelector(".photograph-media");
            const changeScreenHeader = document.querySelector(".photograph-header")
            if(e.matches===false) {
                changeScreenSize3.style.gridTemplateColumns ="1fr 1fr";
                changeScreenHeader.style.flexWrap ="wrap-reverse";
               changeScreenHeader.style.flexDirection ="row-reverse";
                changeScreenHeader.style.justifyContent = "space-around";
             
            }
            else {
                changeScreenSize3.style.backgroundColor = "white"; 
                changeScreenSize3.style.gridTemplateColumns ="1fr 1fr 1fr";
            }
        }
        
        const screenSize4 = window.matchMedia( '(min-width : 820px)' );
        screenSize4.addEventListener('change', mobile2);
        function mobile2(e) {
            const changeScreenSize4 = document.querySelector(".photograph-media");
            //const changeScreenHeader2 = document.querySelector(".photograph-header")
            const changeScreenSizeSort =document.querySelector(".divSort")
            if(e.matches===false) {
                changeScreenSize4.style.gridTemplateColumns ="1fr";
                //changeScreenSize4.style.flexWrap ="wrap";
                //changeScreenSize4.style.gap = "0";
                changeScreenSizeSort.style.marginLeft ="5px";
            }
            else {
                changeScreenSize4.style.gridTemplateColumns ="1fr 1fr";
            }
        }

//----------------------------------------LIGHTBOX-------------------------------------------------------------
var numberPictureInArray;
const lightboxMain = document.createElement("div");
lightboxMain.className  = "lightboxMain";
lightboxMain.style.display = "none";
lightboxMain.style.position = "fixed";
lightboxMain.style.flexDirection ="column";
lightboxMain.style.justifyContent ="center";
lightboxMain.style.alignItems ="start";
lightboxMain.style.top = "0";
lightboxMain.style.maxWidth = "1245px";
lightboxMain.style.width = "80vw";
lightboxMain.style.marginLeft = "10vw";
lightboxMain.style.marginRight = "10vw";
lightboxMain.style.zIndex = "100";
lightboxMain.style.height = "auto";
lightboxMain.style.maxHeight ="900px";

const lightboxContainer = document.createElement("div");
lightboxContainer.className = "lightboxContainer";
lightboxContainer.style.display = "flex";
lightboxContainer.style.width = "100%";
lightboxContainer.style.maxHeight = "900px";
lightboxContainer.style.justifyContent ="center";
lightboxContainer.style.alignItems = "space between";
lightboxContainer.style .marginTop = "15px";

const closeButton = document.createElement("button");
closeButton.className = "closeButton";
closeButton.style.right ="0";
closeButton.style.display = "flex";
closeButton.style.position = "absolute";
closeButton.style.zIndex = "22";
closeButton.style.width = "40px";
closeButton.style.height = "50px";
closeButton.style.marginRight = "0";
closeButton.style.marginLeft = "auto";
closeButton.style.color ="#901C1C";
closeButton.style.cursor ="pointer";
closeButton.style.background = "white";
closeButton.style.border = "none";
closeButton.style.cursor = "pointer";
const closeIcon = document.createElement("li");
closeIcon.className = "fa-solid fa-xmark";
closeIcon.style.fontSize = "50px";
closeIcon.style.paddingTop = "10px";

const previousButton = document.createElement("button");
previousButton.className = "previousButton";
previousButton.style.display = "flex";
previousButton.style.justifyContent ="center";
previousButton.style.alignItems = "center";
previousButton.style.width = "50px";
previousButton.style.height = "50px"
previousButton.style.paddingRight = "20px";
previousButton.style .margin = "auto 0";
previousButton.style.color = "#901C1C";
previousButton.style.cursor = "pointer";
previousButton.style.backgroundColor ="white";
previousButton.style.border = "none";
previousButton.tabIndex ="0";
const previousIcon = document.createElement("li");
previousIcon.className = "previousIcon"
previousIcon.className = "fa-solid fa-chevron-left";
previousIcon.style.fontSize = "40px";
previousIcon.style.position = "fixed";
previousIcon.style.zIndex = "20";

const nextButton = document.createElement("button");
nextButton.className = "nextButton";
nextButton.style.ariaLabel = "bouton  suivant";
nextButton.style.display = "flex";
nextButton.style.alignItems = "center";
nextButton.style.marginBottom = "50%";
nextButton.style.marginTop = "auto";
nextButton.style.paddingLeft = "20px";
nextButton.style.width = "50px";
nextButton.style.height = "50px";
nextButton.style.margin = "auto 0";
nextButton.style.color = "#901C1C";
nextButton.style.cursor = "pointer";
nextButton.style.backgroundColor ="white";
nextButton.style.border = "none";
nextButton.tabIndex = "0";

const nextIcon = document.createElement("li");
nextIcon.className = "fa-solid fa-chevron-right";
nextIcon.style.fontSize = "40px";
nextIcon.style.position ="fixed";
nextIcon.style.zIndex = "20";

const pictureContainer = document.createElement("picture");
pictureContainer.style.display ="flex";
pictureContainer.style.width = "100%";
pictureContainer.style.maxHeight = "900px";
pictureContainer.style.backgroundColor = "black";

const video = document.createElement("video");
video.style.objectFit = "contain";
video.style.width = "100%";

const picture = document.createElement("img");
picture.style.objectFit = "contain";
picture.style.width = "100%";


const figcaption = document.createElement("figcaption");
figcaption.style.display = "flex";
figcaption.textContent = "";
figcaption.style.marginLeft = "50px";
figcaption.style.marginTop = "20px";
figcaption.style.fontSize = "25px";
figcaption.style.color = "#901C1C";

closeButton.appendChild(closeIcon);
pictureContainer.appendChild(picture);
pictureContainer.appendChild(video);
previousButton.appendChild(previousIcon);
nextButton.appendChild(nextIcon);
lightboxContainer.appendChild(previousButton);
lightboxContainer.appendChild(pictureContainer);
lightboxContainer.appendChild(nextButton);
lightboxMain.appendChild(closeButton);
lightboxMain.appendChild(lightboxContainer);
lightboxMain.appendChild(figcaption);

 let body = document.querySelector("body");
 body.appendChild(lightboxMain);

 function openLightbox(selectedPictures) {       // fonction pour ouverture Lightbox avec la "media" choisie
    let mediasContainer = document.querySelectorAll(".mediacards img, .mediacards video");
    document.querySelector("header").style.display = "none";
    document.querySelector(".photograph-header").style.display = "none";
    document.querySelector(".divSort").style.display = "none";
    document.querySelector(".photograph-media").style.display = "none";
    document.querySelector(".totalLikesAndTarif").style.display = "none";

    for (var t=0; t<mediasContainer.length; t++) { 
        if (mediasContainer[t].src== selectedPictures.src) {  
            numberPictureInArray = t;
            if(numberPictureInArray==0) {
                previousIcon.style.display ="none";  
            }
            if(numberPictureInArray== mediasContainer.length-1) {
                nextIcon.style.display ="none";  
            }
        }
    } 
    picture.src = selectedPictures.src;
    video.src = selectedPictures.src;
 
    let text = document.querySelectorAll(".mediacards figcaption");
    figcaption.textContent = text[numberPictureInArray].innerText;
    
    if(mediasContainer[numberPictureInArray].nodeName =="VIDEO") {
        video.controls = "controls";
     }
         else {
            video.controls = "";
        } 

    lightboxMain.style.display = "block";
  
    const escape= 27;
    closeButton.addEventListener("click", lightBoxClose);
    event.stopImmediatePropagation();
    closeButton.addEventListener("keydown", function(event){
        if( event.keyCode== escape) {
        lightBoxClose();
        }
    });

    function lightBoxClose() {                    // fermeture de la lightbox
        lightboxMain.style.display = "none";
        document.querySelector("header").style.display = "flex";
        document.querySelector(".photograph-header").style.display = "flex";
        document.querySelector(".divSort").style.display = "flex";
        document.querySelector(".photograph-media").style.display = "grid";
        document.querySelector(".totalLikesAndTarif").style.display = "flex";
        previousIcon.style.display ="flex";
        nextIcon.style.display ="flex";
    }

    const leftArrow = 37;
    previousButton.addEventListener("click", previousMedia);
    previousButton.addEventListener("keydown", function(event){
        if( event.keyCode=== leftArrow){
            previousMedia();
        }
    });

    function previousMedia() {               // fonction appel du "media" précédent
        event.stopImmediatePropagation();
        let mediasForPrevious =document.querySelectorAll(".mediacards img, .mediacards video");
        
        if( numberPictureInArray!=0) { 
            nextIcon.style.display ="flex";
            numberPictureInArray -= 1;
            if(numberPictureInArray==0) {
                previousIcon.style.display ="none";  
            }
            picture.src = mediasForPrevious[numberPictureInArray].src;
            video.src = mediasForPrevious[numberPictureInArray].src;
            let text = document.querySelectorAll(".mediacards figcaption");
            figcaption.textContent = text[numberPictureInArray].innerText;
            if(mediasForPrevious[numberPictureInArray].nodeName == "VIDEO") {
                video.controls = "controls";
            }
            else {
                video.controls = "";
            }
    }
}
   
    const rightArrow = 39;
    nextButton.addEventListener("click", nextMedia); 
    event.stopImmediatePropagation();
    nextButton.addEventListener("keydown", function(event) {
        if( event.keyCode=== rightArrow) {
            event.stopImmediatePropagation();      
            nextMedia();

        }
    });

    function nextMedia() {             // fonction appel du "media" suivant           
        event.stopImmediatePropagation();
        let mediasForNext =document.querySelectorAll(".mediacards img, .mediacards video");
        
        if( numberPictureInArray <mediasForNext.length) { 
            previousIcon.style.display ="flex";
            numberPictureInArray += 1;
            if(numberPictureInArray== mediasForNext.length-1) {
                nextIcon.style.display ="none";  
            }
            picture.src = mediasForNext[numberPictureInArray].src;
            video.src = mediasForNext[numberPictureInArray].src;
            let text = document.querySelectorAll(".mediacards figcaption");
            figcaption.textContent = text[numberPictureInArray].innerText;
            if(mediasForNext[numberPictureInArray].nodeName =="VIDEO") {
                video.controls = "controls";
            }
            else {
                video.controls = "";
            }
        }
    }
}

async function getPhotographers() {
const reponse = await fetch('./data/photographers.json');
let recovery = await reponse.json();
let photographers = recovery["photographers"];
//let medias = recovery["media"];

        return ({
            photographers: [...photographers]})
        }
        
 async function displayData(photographers) {  
    const photographersSection = document.querySelector(".photographer_section");
    photographers.forEach((photographer) => {
        const photographerModel = photographerFactory(photographer);  //photographerFactory est utilisé pour index.js
        const userCardDOM = photographerModel.getUserCardDOM(); 
        photographersSection.appendChild(userCardDOM);
        });
    }    


async function init() {
    // Récupère les datas des photographes
    const { photographers } = await getPhotographers();
       
    displayData(photographers);   
    }
    
    init();

/*                  // PARAMETRES POUR RENDRE RESPONSIVE LA PAGE DES PHOTOGRAPHES

  const bodySize = document.querySelector("body");
bodySize.style.maxWidth ="1440px";
bodySize.style.margin = "auto";
bodySize.style.boxSizing ="border box";
bodySize.style.width = "100%";

const wrap = document.querySelector("header");
wrap.style.flexWrap = "wrap";

const screenSize = window.matchMedia( '(min-width : 1024px)' );
screenSize.addEventListener('change', tablette); 
    function tablette(e) {
      const changeScreenSize = document.querySelector(".photographer_section");
      if(e.matches===false) {
    changeScreenSize.style.gridTemplateColumns ="1fr 1fr";
      }
      else {
    changeScreenSize.style.gridTemplateColumns ="1fr 1fr 1fr";
      }
     }

const screenSize2 = window.matchMedia( '(min-width : 720px)' );
screenSize2.addEventListener('change', mobile);
    function mobile(e) {
      const changeScreenSize2 = document.querySelector(".photographer_section");
      if(e.matches===false) {
    changeScreenSize2.style.gridTemplateColumns ="1fr";
      }
      else {
    changeScreenSize2.style.gridTemplateColumns ="1fr 1fr";
      }
    }

   */ 
    
    





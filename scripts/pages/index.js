async function getPhotographers() {
const reponse = await fetch('./data/photographers.json');
let recovery = await reponse.json();
let photographers = recovery["photographers"];
let medias = recovery["media"];

        return ({
            photographers: [...photographers]})
        }
        

 async function displayData(photographers) {  
    const photographersSection = document.querySelector(".photographer_section");
    photographers.forEach((photographer) => {
        const photographerModel = photographerFactory(photographer);
        const userCardDOM = photographerModel.getUserCardDOM(); 
        photographersSection.appendChild(userCardDOM);
    });    
};

    async function init() {
        // Récupère les datas des photographes
        const { photographers } = await getPhotographers();
       
    displayData(photographers);   
    }
    
    init();

 /* var toto = "photographers".id[0];
   alert(toto);

    document.querySelector('a').onclick = function() {
        alert("titi");
        // element
        var elt = this;
        // id de l'element
        var idElt = this.getValue('id');
       
        };*/




















/*var essai = document.querySelectorAll("img");
essai.addEventListener("onclick", test);
alert(ici);
   
  function test() {
    var photographerFind = document.querySelectorAll('img');
    alert("hello");
for (var i = 0; i < photographerFind.length; i++) {
    alert("cou");
  photographerFind[i].onclick = function(e) {
  alert("coucou");
   // e.target.style.backgroundColor = blue;

  }
}
  }*/
  
    
    
    





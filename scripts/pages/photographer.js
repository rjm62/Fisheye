const modal= document.querySelector(".modal");
const photographerNameContainer =  document.createElement("div")
photographerNameContainer.style.alignSelf="flex-start"
const photographerName =document.createElement("h3");
photographerName.textContent = "Coucou";
photographerName.style.fontSize="64px";
photographerName.style.fontWeight="normal";
photographerName.style.marginTop = "0px";

photographerNameContainer.appendChild(photographerName);




var form = document.querySelector("form");

modal.insertBefore(photographerNameContainer, form);


/*const label = document.createElement("label");
label.style.value = "Nom";
ajout.appendChild(label)*/


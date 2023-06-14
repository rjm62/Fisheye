       // MISE EN PLACE ECOUTES POUR OUVERTURE ET FERMETURE MODAL
var modalOpen = document.querySelector(".photograph-header > .contact_button"); 
modalOpen.addEventListener("click", displayModal);

//var modalClose = document.querySelector ("header > img");
//modalClose.addEventListener("click", closeModal);


function displayModal() {
    const modal = document.getElementById("contact_modal");
	modal.style.display = "flex";
}

function closeModal() {
    const modal = document.getElementById("contact_modal");
    modal.style.display = "none";
}

                    // POSITIONNEMENT DE LA MODALE
const contactModalContainer = document.querySelector("#contact_modal");
contactModalContainer.style.flexDirection = "row";
contactModalContainer.style.justifyContent = "center";

const modalContainer = document.querySelector(".modal");
modalContainer.style.position = "absolute";
modalContainer.style.top = "30px";



      //  AJOUT DE ClASSES MANQUANTES (OU AFIN D'AIDER DANS LA CONCEPTION DU FORMULAIRE)

const formContainer = document.querySelector("form"); 

let classForFirst = formContainer.firstElementChild;  // ajout d'une class sur la div du prénom
classForFirst.className = "formData"+" "+"first";


              // AJOUT DES CHAMPS MANQUANTS
const lastDiv = document.createElement("div");       // ajout champ du nom
lastDiv.className = "formData"+" "+"last"
const lastLabel = document.createElement("label");
const lastInput = document.createElement("input");
lastLabel.value = "nom";
lastLabel.textContent = "Nom";
lastDiv.appendChild(lastLabel);
lastDiv.appendChild(lastInput);
let modalButton = document.querySelector("form > button");
formContainer.insertBefore(lastDiv, modalButton);

const emailDiv = document.createElement("div");       // ajout champ de l'email
emailDiv.className = "formData"+" "+"email";
const emailLabel = document.createElement("label");
const emailInput = document.createElement("input");
emailLabel.value = "email";
emailLabel.textContent = "Email";
emailDiv.appendChild(emailLabel);
emailDiv.appendChild(emailInput);
formContainer.insertBefore(emailDiv, modalButton);

const yourMessageDiv = document.createElement("div");     // ajout champ pour laisser un message
yourMessageDiv.className = "formData"+" "+"yourMessage";
const yourMessageLabel = document.createElement("label");
const yourMessageInput = document.createElement("input");
yourMessageInput.style.height ="250px";
yourMessageLabel.value = "yourMessage";
yourMessageLabel.textContent = "Votre message";
yourMessageDiv.appendChild(yourMessageLabel);
yourMessageDiv.appendChild(yourMessageInput);
formContainer.appendChild(yourMessageDiv);
formContainer.insertBefore(yourMessageDiv, modalButton);

/*

// CREATION DU SELECTEUR  DATA-ERROR
var dataError = document.createElement("formData[data-error]::after");
dataError.style;Content = "attr[data-error]";
dataError.style.fontSize = "1em";
dataError.style.color = "#e54858";
dataError.style.display = "block";
dataError.style.marginTop = "7px";
dataError.style.marginBottom = "7px";
dataError.style.textAlign = "right";
dataError.style.lineHeight = "0.3";
dataError.style.opacity = "1";

var essai = document.querySelector(".formData");
essai.appendChild(dataError);


*/





// VARIABLES POUR VERIFICATION DES CHAMPS 
var check;
var result;
var resultsArray =["firstValidationResult", "lastValidationResult", "emailValidationResult", "birthdateValidationResult"];
var text;
var border;


// VARIABLES VERIFICATION ENTREES FORMULAIRE
const first = document.querySelector("#first"); 
const last = document.querySelector("#last");
const email = document.querySelector("#email");
const yourMessage = document.querySelector("yourMessage");

// ECOUTE DES EVENEMENTS
first.addEventListener("change", firstCheck);
last.addEventListener("change", lastCheck);
email.addEventListener("change", emailCheck);
yourMessage.addEventListener("change", yourMessageCheck);



// VERIFICATION DU PRENOM
function firstCheck() {
    check = document.forms["reserve"].elements["first"].value;
    let regFirst=new RegExp("^[a-z][a-z\-_]+$", "i");
    result=(regFirst.test(check));
    resultsArray[0] = result;
  
    if (result===true) {
      text = document.querySelector(".first");
      text.dataset.error = "";
      text.dataset.errorVisible = "false";  
      border = document.querySelector("#first");
      border.dataset.errorVisible ="false";
      document.querySelector(".button").disabled=false;
    } 
    else {
      text = document.querySelector(".first");
      text.dataset.error = "Veuillez entrer un prénom (minimum 2 caractères)";
      text.dataset.errorVisible = "true"; 
      border = document.querySelector("#first");
      border.dataset.errorVisible ="true";
    }
  }




 
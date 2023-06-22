// MISE EN PLACE ECOUTES POUR OUVERTURE ET FERMETURE MODAL
var modalOpen = document.querySelector(".photograph-header > .contact_button"); 
modalOpen.addEventListener("click", displayModal);

var modalClose = document.querySelector (".modal header img");
modalClose.addEventListener("click", closeModal);


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
modalContainer.style.width = "100%";

               // diminution du texte dans le header de la modale + repositionnement du HEADER
const headerModaH2Size = document.querySelector(".modal header h2");
headerModaH2Size.style.fontSize = "54px";

const paddingTopHeader = document.querySelector(".modal");
paddingTopHeader.style.paddingTop = "0";


//let namePosition = document.querySelector("form");
 //modalContainer.insertBefore(photographName, namePosition);



      //  AJOUT DE ClASSES MANQUANTES (OU AFIN D'AIDER DANS LA CONCEPTION DU FORMULAIRE)

const formContainer = document.querySelector("form"); 

let classForFirst = formContainer.firstElementChild;  // ajout d'une class sur la div du prénom
classForFirst.className = "formData"+" "+"first";


              // MODIFICATION CHAMPS PRENOM ET AJOUT DES CHAMPS MANQUANTS
const firstDiv = document.querySelector("form > div");
firstDiv.className = "formData first";
const firstLabel = document.querySelector(".first label");
firstLabel.for = "first";
firstLabel.value = "first";
firstLabel.textContent = "Prénom";
const firstInput = document.querySelector(".first input");
firstInput.className = "text-control";
firstInput.type = "text";
firstInput.id = "first";
firstInput.name = "first";
firstInput.style.marginBottom = "-20px";


const lastDiv = document.createElement("div");       // ajout champ du nom
lastDiv.className = "formData last";
const lastLabel = document.createElement("label");
lastLabel.for = "last";
lastLabel.value = "last";
lastLabel.textContent = "Nom";
const lastInput = document.createElement("input");
lastInput.className = "text-control";
lastInput.type = "text";
lastInput.id = "last";
lastInput.name = "last";
lastInput.style.marginBottom = "-20px";
lastDiv.appendChild(lastLabel);
lastDiv.appendChild(lastInput);
let modalButton = document.querySelector("form > button");
formContainer.insertBefore(lastDiv, modalButton);

const emailDiv = document.createElement("div");       // ajout champ de l'email
emailDiv.className = "formData email";
const emailLabel = document.createElement("label");
emailLabel.for = "email";
emailLabel.value = "email";
emailLabel.textContent = "Email";
const emailInput = document.createElement("input");
emailInput.className = "text-control";
emailInput.type ="email";
emailInput.id = "email";
emailInput.name = "email";
emailInput.style.marginBottom = "-20px";
emailDiv.appendChild(emailLabel);
emailDiv.appendChild(emailInput);
formContainer.insertBefore(emailDiv, modalButton);

const yourMessageDiv = document.createElement("div");     // ajout champ pour laisser un message
yourMessageDiv.className = "formData yourMessage";
const yourMessageLabel = document.createElement("label");
yourMessageLabel.for = "yourMessage"
yourMessageLabel.value = "yourMessage";
yourMessageLabel.textContent = "Votre message";
const yourMessageInput = document.createElement("textarea");
yourMessageInput.className = "text-control_message";
yourMessageInput.type = "textarea";
yourMessageInput.id = "yourMessage";
yourMessageInput.name = "yourMessage";
yourMessageInput.style.height = "170px";
yourMessageInput.style.borderRadius = "5px"
yourMessageInput.rows = "4";
yourMessageInput.cols = "43";
yourMessageInput.style.resize = "none";        // resize à "none", empêche l'utilisateur d'agrandir la fenêtre 
yourMessageDiv.appendChild(yourMessageLabel);
yourMessageDiv.appendChild(yourMessageInput);
formContainer.appendChild(yourMessageDiv);
formContainer.insertBefore(yourMessageDiv, modalButton);



const formSize = document.querySelectorAll(".text-control");
console.log(formSize);
for(let i =0; i<formSize.length; i++) {
  formSize[i].style.fontSize = "40px";
  console.log("ok");
}

const formSizeMessage = document.querySelector(".text-control_message");
formSizeMessage.style.fontSize = "1.9em";
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
const first = document.querySelector(".first"); 
const last = document.querySelector(".last");
const email = document.querySelector(".email");
const yourMessage = document.querySelector(".yourMessage");

// ECOUTE DES EVENEMENTS
first.addEventListener("change", firstCheck);
last.addEventListener("change", lastCheck);
email.addEventListener("change", emailCheck);
yourMessage.addEventListener("change", yourMessageCheck);



// VERIFICATION DU PRENOM
/*function firstCheck() {
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
}*/

const formName = document.querySelector("form");
formName.name = "modalForm";
formName.action = "#";
formName.method = "post";

function firstCheck() {
const firstField = document.forms["modalForm"].elements["first"].value; 
console.log(firstField);     
}

function lastCheck() {
  const lastField = document.forms["modalForm"].elements["last"].value; 
  console.log(lastField);     
}

function emailCheck() {
  const emailField = document.forms["modalForm"].elements["email"].value; 
  console.log(emailField);     
}

 function yourMessageCheck() {
  const yourMessageField = document.forms["modalForm"].elements["yourMessage"].value; 
  console.log(yourMessageField);     
}

const formSend = document.querySelector("form button");
formSend.addEventListener("click", send);

function send() {
  console.log(firstField); 
  console.log(lastField); 
  console.log(emailField);
  console.log(yourMessageField); 
  closeModal
}

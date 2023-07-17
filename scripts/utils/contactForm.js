// MISE EN PLACE ECOUTES POUR OUVERTURE ET FERMETURE MODAL
const RETURN= 13;
var modalOpen = document.querySelector(".photograph-header > .contact_button"); 
modalOpen.addEventListener("click", displayModal);
modalOpen.addEventListener("keydown", function(event){
if(event.keyCode== RETURN) {
  displayModal();
}
});
const ESCAPE = 27;
var modalClose = document.querySelector (".modal header img");
modalClose.tabIndex="0";
modalClose.addEventListener("click", closeModal);
modalClose.addEventListener("keydown", function(event) {
  if(event.keyCode== ESCAPE ||event.keyCode== RETURN) {
    closeModal();
  }
});

function displayModal() {
  const modal = document.getElementById("contact_modal");
	modal.style.display = "flex";
  modal.tabIndex ="-1";
  modal.setAttribute("aria-hidden", "false");
  modal.role = "dialog";
  modal.focus();
  const main =document.getElementById("main");
  main.setAttribute("aria-hidden", "true");
  main.tabIndex = "-1";
  document.body.style.position = 'fixed';
  document.body.style.marginLeft= '150px';
  const input = document.querySelector("#first");
  input.focus();
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



      //  AJOUT DE ClASSES MANQUANTES (OU AFIN D'AIDER DANS LA CONCEPTION DU FORMULAIRE)

const formContainer = document.querySelector("form"); 

let classForFirst = formContainer.firstElementChild;  // ajout d'une class sur la div du prénom
classForFirst.className = "formData"+" "+"first";

              // AJOUT DES CHAMPS DE TEXTE
const firstDiv = document.createElement("div");       // ajout champ du prenom
firstDiv.className = "formData first";
const firstLabel = document.createElement("label");
firstLabel.for = "first";
firstLabel.value = "first";
firstLabel.textContent = "Prénom";
const firstInput = document.createElement("input");
firstInput.className = "text-control";
firstInput.type = "first";
firstInput.id = "first";
firstInput.name = "first";
firstInput.style.marginBottom = "-20px";
firstDiv.appendChild(firstLabel);
firstDiv.appendChild(firstInput);
let modalButton = document.querySelector("form > button");
formContainer.insertBefore(firstDiv, modalButton);
  

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
for(let i =0; i<formSize.length; i++) {
  formSize[i].style.fontSize = "40px";
}

const formSizeMessage = document.querySelector(".text-control_message");
formSizeMessage.style.fontSize = "1.9em";

// VARIABLES POUR VERIFICATION DES CHAMPS 
var check;
var sendDone;
var firstCheckResult;
var lastCheckResult;
var emailCheckResult;
var messageCheckResult;
var buttonCommentModif = document.querySelector(" form .contact_button")


var first = document.querySelector("#first"); 
var last = document.querySelector("#last");
var email = document.querySelector("#email");
var yourMessage = document.querySelector("#yourMessage")

first.addEventListener("change", firstCheck);
last.addEventListener("change", lastCheck);
email.addEventListener("change", emailCheck);
yourMessage.addEventListener("change", yourMessageCheck);


  function firstCheck() { 
  let regFirst=new RegExp("^[a-z][a-z\-_]+$", "i");        //verification prénom
  check = firstInput.value;
  firstCheckResult=(regFirst.test(check));
  if (firstCheckResult/1==1) {
    firstLabel.style.color = "black";
    firstLabel.textContent = "Prénom";
    checkTextButton();
  }
  else {
    firstLabel.style.color = "red";
    firstLabel.textContent = "Prénom (au moins 2 caractères)"
  }
}

  function lastCheck() {
  let regLast=new RegExp("^[a-z][a-z\-_]+$", "i");        //verification prénom
  check = lastInput.value;
  lastCheckResult=(regLast.test(check));
  if (lastCheckResult/1==1) {
    lastLabel.style.color = "black";
    lastLabel.textContent = "Nom";
    checkTextButton();
  }
  else {
    lastLabel.style.color = "red";
    lastLabel.textContent = "Nom (au moins 2 caractères)"
  }
}


  function emailCheck() {
    let regEmail=new RegExp("^[a-z0-9\.\-_]+[a-z0-9]*@[a-z0-9]{2,}\.[a-z\.\-_]+[a-z\-_]{2,}$", "i");
    check = emailInput.value;
    emailCheckResult= (regEmail.test(check));
    if (emailCheckResult/1==1) {
      emailLabel.style.color = "black";
      emailLabel.textContent = "Email" 
      checkTextButton();
    }
    else {
      emailLabel.style.color = "red";
      emailLabel.textContent = "Email non valide"
    }
  }

  function yourMessageCheck() {
    
  if (yourMessageInput.value!="") {
    yourMessageLabel.style.color = "black";
    yourMessageLabel.textContent = "Your message"
    messageCheckResult = "1";
    checkTextButton();
  }
  else {
    yourMessageLabel.style.color = "red";
    yourMessageLabel.textContent = "Merci de laisser un message";
    messageCheckResult = "0";

  }
}
function checkTextButton() {
if (firstCheckResult/1==1 & lastCheckResult/1==1 & emailCheckResult/1==1 & messageCheckResult =="1" ) {
  buttonCommentModif.textContent ="Envoyer";
}
}


const formSend = document.getElementById("contact_button");
formSend.addEventListener("click", send);


function send(event) {
  //event.preventDefault();
  
event.preventDefault();

  if (firstCheckResult/1==1 & lastCheckResult/1==1 & emailCheckResult/1==1 & messageCheckResult =="1") {
    console.log("prénom:"+firstInput.value);
    console.log("nom:"+lastInput.value); 
    console.log("email:"+emailInput.value);
    console.log("message:"+yourMessageInput.value);
    sendDone = 1;
  }
    else{
      firstCheck();
      lastCheck();
      emailCheck();
      yourMessageCheck();
      document.querySelector(".modal form #contact_button").textContent = "compléter avant envoi";
    } 
}

function closeModal() {
  const modal = document.getElementById("contact_modal");
  modal.style.display = "none";
  //modal.attr("aria-hidden", "true");
  modal.ariaHidden ="true";
  const main = document.getElementById("main");
  //main.attr("aria-hidden", "false");
  main.ariaHidden ="false";
document.body.style.position = '';
document.body.style.top = '';
  if (sendDone==1){
    firstInput.value ="";
    lastInput.value =""; 
    emailInput.value ="";
    yourMessageInput.value ="";
  }
}
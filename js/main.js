//We create an arrow function to shorten the lines in which we need to represent HTML Elements.
const $ = selector => document.querySelector(selector);
//We Declarate the global constants that we will use to represent the HTML Elements that we will manipulate throughout the entire code.
const sectionMokepon=$("#chooseMokepon");
const cards=$("#cards");
const btnChooseMokepon = $("#btnChooseMokepon");

const sectionAttack=$("#chooseAttack");
const buttonsContainer = $("#buttonsAttacks");

const sectionMessages=$("#messages");
const sectionReStart=$("#reStart");
const btnReStart = $("#btnReStart");

const playerMokepon = $("#playerMokepon");
const spanPlayerLives = $("#livesPlayer");
const pcMokepon = $("#pcMokepon");
const spanPcLives= $("#livesPc");

const divPlayerAttacks = $("#playerAttacks");
const divResult=$("#result");
const divPcAttacks = $("#pcAttacks");

//"boolean" variable
let mokeponChosen=0;
//An array that contains all the attacks buttons, or at least their "names" and Ids.
let allAttacks=[{name:"🔥", id:"btnFire"},{name:"💧",id:"btnWater"},{name:"🌿",id:"btnEarth"}];

let playerAttack;
let PcAttack;
let livesPlayer=3;
let livesPc=3;
let playerChosenMokepon;
let pcChosenMokepon;
//It will represent a card with the mokepon options to choose from.
let optionMokepons;

//OOP Classes
class Mokepon {
    constructor(name,img,lives){
        this.name=name;
        this.img=img;
        this.lives=lives;
        this.attacks=[];
    }
}
//OOP instances
let hipodoge = new Mokepon("Hipodoge","./assets/Hipodoge.png",5);
let capipepo = new Mokepon("Capipepo","./assets/Capipepo.png",5);
let ratigueya = new Mokepon("Ratigueya","./assets/Ratigueya.png",5);
//add respective attacks to each mokepon
hipodoge.attacks.push(allAttacks[1],allAttacks[0],allAttacks[1],allAttacks[2],allAttacks[1]);
capipepo.attacks.push(allAttacks[2],allAttacks[1],allAttacks[2],allAttacks[0],allAttacks[2]);
ratigueya.attacks.push(allAttacks[0],allAttacks[2],allAttacks[0],allAttacks[1],allAttacks[0]);

let mokeponsArray=[];
let mokeponsObj = {};
//Save all the mokepon-objects in an array
mokeponsArray.push(hipodoge,capipepo,ratigueya);

function hide(section){
    section.style.display="none";
};

function display(section){
    section.style.display="flex";
};

hide(sectionAttack);
hide(sectionReStart);

function displayMokeponsCards(){
    //Iterates the array of mokepons and for each one of them
    mokeponsArray.forEach((mokepon)=>{
        //We save each element of the array in an object whose key is the mokepon's name and the value is the mokepon-object itself
        mokeponsObj[mokepon.name]=mokepon;
        //for every mokepon creates a template with an input and a label based on the data from the from the mokepon-object and save it as a "optionMokepon"
        optionMokepons =    `
        <input type="radio" name="mokepon" id="${mokepon.name}"/>
        <label class="cardMokepon" for=${mokepon.name}>
            <p>${mokepon.name}</p>
            <img src=${mokepon.img} alt=${mokepon.name} srcset="">
        </label>
        `;
        //Then every optionMokepon is added to the Cards-Container
        cards.innerHTML += optionMokepons;
    });
};
displayMokeponsCards();

//Now that they have been created, we save all the mokepons to choose from in a nodelist.
let inputMokepons = document.getElementsByName("mokepon");

//if the "btnChooseMokepon" is clicked, the "chooseMokepon" function is executed
btnChooseMokepon.addEventListener("click",chooseMokepon);

function chooseMokepon(){
//We iterates the inputs.
    inputMokepons.forEach(input => {
        //if the input was selected
        if(input.checked){
            //Change the state of our "boolean" variable
            mokeponChosen++
            //We rewrite the html that displays the player's mokepon based on the inpuits id that is the same name of the mokepon.
            playerMokepon.innerHTML=input.id;
            //We also save the mokepons chosen name in a variable.
            playerChosenMokepon=input.id
        };
    });
    //If the "btnChooseMokepon" was clicked and, therefore, this function is executed to go to the next "page", but no mokepon option was selected (in the inputs iteration the value of the variable "mokeponChosen" was not altered) then 
    if(!mokeponChosen){
        //  Then the process is not continued and is notified through an alert.
        alert("Choose A Mokepon To Continue");
    }else{
        //Pc chooses a mokepon.
        randomMokepon();
        //AttacksButtons are Created and rendered
        displayAttacksButtons();
        //addeventlisteners are added to the Attacksbuttons
        functionalAttacks();
        //the attacks saction is unhidden
        display(sectionAttack);
        //is hidden the chooseMokepon section
        hide(sectionMokepon);
    };
};


function randomMokepon(){
    //We create a variable to save a ramdom number between the first and the last position in the array: 0 and the number of mokepons -1
    let randomNumber = random(0,(mokeponsArray.length)-1);
    //based on that number we take a mokepon from the array and save his name in the variable "pcChosenMokepon";
    pcChosenMokepon=mokeponsArray[randomNumber].name;
    //Then We rewrite the html that displays the pc's mokepon based on pcChosenMokepon variable
    pcMokepon.innerHTML=pcChosenMokepon;
};
//reveives a minimum and a maximum number
function random(min,max){
    //the decimals are removed or "subtracted" from the resulting number and it is returned as the product of the function
    return Math.floor(
        //Returns a pseudorandom number between 0 and 1.
        Math.random()
        //that number is multiplied by the range between the minimum number and the maximum +1 (the +1 is added so that the range is inclusive of the max),
        *(max-min+1)

//explaination of th function logic
        //for example, a number between 12 and 14 must be chosen, a random number between the range
        //(12-14=2
        //2"+1"=3), the range is 3
        //so if the min is 12 and the max is 14 the ramdom numbers are 0.01, 0.34, 0,67 or 0.99 the numbers are multipied by 3 =0.03, 1.02, 2.01, 2.97 => 0,1,2,2
        //between 0 and 0.33 = 0; 0.34 and 0.66=1; 0,67 and 0.99=2
            //(if the range were 4) by 4 0.04, 1.36, 2.68, 3.96 =>0,1,2,3 
            //between 0 and 0.24 = 0; 0.25 and 0.49=1; 0,5 and 0.74=2; 0.75 and 0.99=3;
        //So every number of the range has the same probability of being thrown.

        //The mminimum is added at the end, so that if,  a number between 12 and 14 must be chosen 0+12, 1+12, 2+12 are the possible outcome, all between 12 and 14.
        +min);
};

function displayAttacksButtons(){
    //we iterate the array Attacks of the Mokepon chosen an for every acttack
    mokeponsObj[playerChosenMokepon].attacks.forEach((attack)=>{
        //we add an HTML template of a button with all the info of the attack to the buttonsContainer
        buttonsContainer.innerHTML+=`
    <div class="btnAttack">
        <button id="${attack.id}"  name="attack" type="button">${attack.name}</button>
    </div>
    `
    })
    
};
//Now that they have been created, we save all the Attacks buttons to choose from in a nodelist.
let btnAttacks = document.getElementsByName("attack");

function functionalAttacks(){
    //for every buttonAttack
    btnAttacks.forEach((button) => {
        //we add an eventListener that in case of the button is clciked, calls a fuction that

        button.addEventListener("click", function() {
            //calls another function that has as a paramater, the content of the button, wich is the name of the attack, We call an anonymous function and not the AssingAttacks function itself, because a function cannot be passed a parameter in an addEventListener exept for "e".
            AssingAttacks(button.innerHTML);
            //Once we have both attacks we continue to combat. 
            combat();
        });
    });
};

function AssingAttacks(Attack) {
    //save in the variable Player attacks the name of the attack chossen
    playerAttack = Attack;
    //and chose the Pc attacks
    pcRandomAttack();
};

function pcRandomAttack(){
    //We create a variable to save a ramdom number between the first and the last position in the array: 0 and the number of  attacks of the pc's Mokepon chosen -1.
    let randomNumber = random(0,(mokeponsObj[pcChosenMokepon].attacks.length-1));
    //we use the already created global variable PcAttack, to save the name of the attack ramdomly chosen between the attacks of the pc's Mokepon chosen.
    PcAttack=mokeponsObj[pcChosenMokepon].attacks[randomNumber].name;
};

function combat(){
    let result;
    if(PcAttack==playerAttack){
        result="It´s a Tie";
    //all possible outcomes in which the player's attack can beat the PC's
    }else if((playerAttack==allAttacks[0].name & PcAttack==allAttacks[2].name)||(playerAttack==allAttacks[1].name & PcAttack==allAttacks[0].name)||(playerAttack==allAttacks[2].name & PcAttack==allAttacks[1].name)){
        result="YOU WIN!";
        livesPc--
    }else{
        result="YOU LOSE!";
        livesPlayer--
    };
    createMessages(result);
    checkLives();
};

function createMessages(result){

    let pResult =document.createElement("p");
    let pPlayerAttack=document.createElement("p");
    let pPcAttack =document.createElement("p");

    pResult.innerHTML = result;
    divResult.appendChild(pResult);

    pPlayerAttack.innerHTML = playerAttack;
    divPlayerAttacks.appendChild(pPlayerAttack);

    pPcAttack.innerHTML =PcAttack
    divPcAttacks.appendChild(pPcAttack);

    spanPlayerLives.innerHTML=livesPlayer;
    spanPcLives.innerHTML=livesPc;
};

function checkLives(){
    //create a "boolean" variable
    let WinOrLose;

    if(livesPc == 0){
        WinOrLose=1;
    }else if( livesPlayer == 0){
        WinOrLose=0;
    }else{
        //If no one has lost all their lives we use return to exit the function without taking into account what is below the return
        return "Continue";
    };
    disableButtons(btnAttacks);
    createFinalMessage(WinOrLose);

};

function disableButtons(btns){
    btns.forEach(button => {
        button.disabled=true;
    });
};

function createFinalMessage(finalResult){
    let finalParagraph =document.createElement("p");
 if (finalResult){
    finalParagraph.innerHTML = "CONGRATULATIONS! YOU WIN!"
 }else{
    finalParagraph.innerHTML = "SORRY :c  YOU LOSE!"
 };
 sectionMessages.insertAdjacentElement("afterbegin", finalParagraph);
display(sectionReStart);
};

btnReStart.addEventListener("click",reStart);

function reStart(){
    location.reload();
};

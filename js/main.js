const $ = selector => document.getElementById(selector);
const playerMokepon = $("playerMokepon");
const pcMokepon = $("pcMokepon");
const btnChooseMokepon = $("btnChooseMokepon");
const btnReStart = $("btnReStart");
const divResult=$("result");
const divPlayerAttacks = $("playerAttacks");
const divPcAttacks = $("pcAttacks");
const sectionMokepon=$("chooseMokepon");
const sectionAttack=$("chooseAttack");
const sectionMessages=$("messages");
const sectionReStart=$("reStart");
const spanPlayerLives = $("livesPlayer");
const spanPcLives= $("livesPc");
const cards=$("cards");
const buttonsContainer = $("buttons");

let mokeponChosen=0;

let allAttacks=[{name:"🔥", id:"btnFire"},{name:"💧",id:"btnWater"},{name:"🌿",id:"btnEarth"}];
let playerAttack;
let PcAttack;
let livesPlayer=3;
let livesPc=3;
let optionMokepons;
let playerChosenMokepon;
let pcChosenMokepon;

class Mokepon {
    constructor(name,img,lives){
        this.name=name;
        this.img=img;
        this.lives=lives;
        this.attacks=[];
    }
}
let mokeponsArray=[];
let mokeponsObj = {};
let hipodoge = new Mokepon("Hipodoge","./assets/mokepons_mokepon_hipodoge_attack.png",5);

let capipepo = new Mokepon("Capipepo","./assets/mokepons_mokepon_capipepo_attack.png",5);

let ratigueya = new Mokepon("Ratigueya","./assets/mokepons_mokepon_ratigueya_attack.png",5);

hipodoge.attacks.push(allAttacks[1],allAttacks[0],allAttacks[1],allAttacks[2],allAttacks[1]);

capipepo.attacks.push(allAttacks[2],allAttacks[1],allAttacks[2],allAttacks[0],allAttacks[2]);

ratigueya.attacks.push(allAttacks[0],allAttacks[2],allAttacks[0],allAttacks[1],allAttacks[0]);

mokeponsArray.push(hipodoge,capipepo,ratigueya);

mokeponsArray.forEach((mokepon)=>{
    mokeponsObj[mokepon.name]=mokepon;
    optionMokepons =    `
    <input type="radio" name="mokepon" id="${mokepon.name}"/>
    <label class="cardMokepon" for=${mokepon.name}>
        <p>${mokepon.name}</p>
        <img src=${mokepon.img} alt=${mokepon.name} srcset="">
    </label>
    `;
    cards.innerHTML += optionMokepons;
});

let inputMokepons = document.getElementsByName("mokepon");

function chooseMokepon(){
    
/*     console.log(inputMokepons.length); */
    inputMokepons.forEach(input => {
        /* console.log(input); */
        if(input.checked){
            mokeponChosen++
            playerMokepon.innerHTML=input.id;
            playerChosenMokepon=input.id
        };
    });
    if(!mokeponChosen){
        alert("Choose A Mokepon To Continue");
    }else{
        randomMokepon();
         displayAttacksButtons();
         functionalAttacks();
        display(sectionAttack);
        hide(sectionMokepon);
    };
};

function displayAttacksButtons(){
    mokeponsObj[playerChosenMokepon].attacks.forEach((attack)=>{
        buttonsContainer.innerHTML+=`
    <div class="btnAttack">
        <button id="${attack.id}"  name="attack" type="button">${attack.name}</button>
    </div>
    `
    })
    
}

let btnAttacks = document.getElementsByName("attack");

function randomMokepon(){
    let randomNumber = random(1,mokeponsArray.length);

    pcChosenMokepon=mokeponsArray[randomNumber].name;
    pcMokepon.innerHTML=pcChosenMokepon;
};

function random(min,max){
    return Math.floor(Math.random()*(max-min+1)/* +min */);
};

function functionalAttacks(){
    btnAttacks.forEach((Attack) => {
        Attack.addEventListener("click", function() {
            if (!this.hasAttribute("data-Disebled"))
            {
                AssingAttack(Attack.innerHTML)
            }
        });
    });
};

function AssingAttack(Attack) {
    playerAttack = Attack;
    randomAttack();
};

function randomAttack(){
    let randomNumber = random(1,mokeponsObj[pcChosenMokepon].attacks.length);
    PcAttack=mokeponsObj[pcChosenMokepon].attacks[randomNumber].name;
    combat();
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

function checkLives(){
    let WinOrLose;
    if(livesPc == 0){
        WinOrLose=1;
    }else if( livesPlayer == 0){
        WinOrLose=0;
    }else{
        return "Continue"
    };
    
    createFinalMessage(WinOrLose);
    endGame();
};

function combat(){
    let result;
    if(PcAttack==playerAttack){
        result="It´s a Tie";
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

function endGame(){
    btnAttacks.forEach(button => {
        button.setAttribute("data-Disebled", true);
    });
};

function reStart(){
    location.reload();
};

function hide(section){
    section.style.display="none";
};

function display(section){
    section.style.display="flex";
};

hide(sectionAttack);
hide(sectionReStart);

btnChooseMokepon.addEventListener("click",chooseMokepon);
btnReStart.addEventListener("click",reStart);


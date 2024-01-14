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
let btnAttacks = document.getElementsByName("attack");
let mokeponChosen=0;
let allMokepons=["Hipodoge","Capipepo","Ratigueya"];
let Attacks=["Fire","Water","Earth"];
let playerAttack;
let PcAttack;
let livesPlayer=3;
let livesPc=3;
let optionMokepons;

class Mokepon {
    constructor(name,img,lives){
        this.name=name;
        this.img=img;
        this.lives=lives;
        this.attacks=[];
    }
}
let Mokepon=[];
let hipodoge = new Mokepon("Hipodoge","./assets/mokepons_mokepon_hipodoge_attack.png",5);

let capipepo = new Mokepon("Capipepo","./assets/mokepons_mokepon_capipepo_attack.png",5);

let ratigueya = new Mokepon("Ratigueya","./assets/mokepons_mokepon_ratigueya_attack.png",5);

hipodoge.attacks.push(
    {
        nombre: "💧",
        id:"btnWater"
    },
    {
        nombre: "🔥",
        id:"btnFire" 
    },
    {
        nombre: "💧",
        id:"btnWater" 
    },
    {
        nombre: "🌿",
        id:"btnEarth" 
    },
    {
        nombre: "💧",
        id:"btnWater" 
    }

);

capipepo.attacks.push(
    {
        nombre: "🌿",
        id:"btnEarth" 
    },
    {
        nombre: "💧",
        id:"btnWater"
    },
    {
        nombre: "🌿",
        id:"btnEarth" 
    },
    {
        nombre: "🔥",
        id:"btnFire" 
    },
    {
        nombre: "🌿",
        id:"btnEarth" 
    }
);

ratigueya.attacks.push(
    {
        nombre: "🔥",
        id:"btnFire" 
    },
    {
        nombre: "🌿",
        id:"btnEarth" 
    },
    {
        nombre: "🔥",
        id:"btnFire" 
    },
    {
        nombre: "💧",
        id:"btnWater" 
    },
    {
        nombre: "🔥",
        id:"btnFire" 
    }
);

Mokepon.push(hipodoge,capipepo,ratigueya);

function chooseMokepon(){
    inputMokepons = document.getElementsByName("mokepon");
/*     console.log(inputMokepons.length); */
    inputMokepons.forEach(input => {
        /* console.log(input); */
        if(input.checked){
            mokeponChosen++
            playerMokepon.innerHTML=input.id;
        };
    });
    if(!mokeponChosen){
        alert("Choose A Mokepon To Continue");
    }else{
        randomMokepon();
        display(sectionAttack);
        hide(sectionMokepon);

    };
};

function randomMokepon(){
    let randomNumber = random(1,3);
    pcMokepon.innerHTML=allMokepons[randomNumber];
};

function random(min,max){
    return Math.floor(Math.random()*(max-min+1)/* +min */);
};

function functionalAttacks(){
    btnAttacks.forEach(Attack => {
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
    let randomNumber = random(1,3);
    PcAttack=Attacks[randomNumber];
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
    }else if((playerAttack==Attacks[0] & PcAttack==Attacks[2])||(playerAttack==Attacks[1] & PcAttack==Attacks[0])||(playerAttack==Attacks[2] & PcAttack==Attacks[1])){
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

functionalAttacks();

btnReStart.addEventListener("click",reStart);

Mokepon.forEach((mokepon)=>{
    optionMokepons =    `
    <input type="radio" name="mokepon" id=${mokepon.name}/>
            <label class="cardMokepon" for=${mokepon.name}>
                <p>${mokepon.name}</p>
                <img src=${mokepon.img} alt=${mokepon.name} srcset="">
            </label>
    `;
    cards.innerHTML += optionMokepons;

});
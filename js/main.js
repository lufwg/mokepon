const $ = selector => document.getElementById(selector);
let playerMokepon = $("PlayerMokepon");
let pcMokepon = $("PcMokepon");
let btnChooseMokepon = $("BtnChooseMokepon");
let mokeponChosen=0;
let Attacks=["Fire","Water","Earth"];
let playerAttack;
let PcAttack;
let result;
let livesPlayer=3;
let livesPc=3;

function chooseMokepon(){
    inputMokepons = document.getElementsByName("Mokepon");
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
    };
};

function randomMokepon(){
    let randomNumber = random(1,3);
    let Mokepons=["Hipodoge","Capipepo","Ratigueya"];
    pcMokepon.innerHTML=Mokepons[randomNumber];
};

function random(min,max){
    return Math.floor(Math.random()*(max-min+1)/* +min */);
};

function functionalAttacks(){
    btnAttacks = document.getElementsByName("Attack");
    btnAttacks.forEach(Attack => {
        Attack.addEventListener("click", function() {
            AssingAttack(Attack.innerHTML)
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

function createMessages(){
    let sectionMessages=$("Messages");
    let paragraph =document.createElement("p");
    paragraph.innerHTML = "Your Mokepon Attacks with "+playerAttack+", My Mokepon Attacks with "+PcAttack+". "+result+"!";
    sectionMessages.appendChild(paragraph)
};

function combat(){
    let spanPlayerLives = $("livesPlayer");
    let spanPcLives= $("livesPc");
    if(PcAttack==playerAttack){
        result="Tie";
    }else if((playerAttack==Attacks[0] & PcAttack==Attacks[2])||(playerAttack==Attacks[1] & PcAttack==Attacks[0])||(playerAttack==Attacks[2] & PcAttack==Attacks[1])){
        result="YOU WIN";
        livesPc--
    }else{
        result="YOU LOSE";
        livesPlayer--
    };
    createMessages();

    spanPlayerLives.innerHTML=livesPlayer;
    spanPcLives.innerHTML=livesPc;
};

btnChooseMokepon.addEventListener("click",chooseMokepon);

functionalAttacks();
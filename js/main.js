const $ = selector => document.getElementById(selector);
let playerMokepon = $("PlayerMokepon");
let pcMokepon = $("PcMokepon");
let btnChooseMokepon = $("BtnChooseMokepon");
let btnReStart = $("BtnReStart");
let sectionMessages=$("Messages");
let sectionMokepon=$("ChooseMokepon");
let sectionAttack=$("ChooseAttack");
let sectionReStart=$("ReStart");
let btnAttacks = document.getElementsByName("Attack");
let mokeponChosen=0;
let Attacks=["Fire","Water","Earth"];
let playerAttack;
let PcAttack;
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
        display(sectionAttack);
        hide(sectionMokepon);

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

function createMessages(result){
    let spanPlayerLives = $("livesPlayer");
    let spanPcLives= $("livesPc");
    let paragraph =document.createElement("p");
    paragraph.innerHTML = "Your Mokepon Attacks with "+playerAttack+", My Mokepon Attacks with "+PcAttack+". "+result+"!";
    sectionMessages.appendChild(paragraph);
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
 sectionMessages.appendChild(finalParagraph);
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
        result="Tie";
    }else if((playerAttack==Attacks[0] & PcAttack==Attacks[2])||(playerAttack==Attacks[1] & PcAttack==Attacks[0])||(playerAttack==Attacks[2] & PcAttack==Attacks[1])){
        result="YOU WIN";
        livesPc--
    }else{
        result="YOU LOSE";
        livesPlayer--
    };
    createMessages(result);
    checkLives();
};

function endGame(){
    btnAttacks.forEach(button => {
        button.disabled = true;});
};

function reStart(){
    location.reload();
};

function hide(section){
    section.style.display="none";
};

function display(section){
    section.style.display="block";
};

hide(sectionAttack);
hide(sectionReStart);

btnChooseMokepon.addEventListener("click",chooseMokepon);

functionalAttacks();

btnReStart.addEventListener("click",reStart);
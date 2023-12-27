const $ = selector => document.getElementById(selector);
let playerMokepon = $("PlayerMokepon");
let pcMokepon = $("PcMokepon");
let btnChooseMokepon = $("BtnChooseMokepon");
let mokeponChosen=0;
let playerAttack;

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

function AssingAttack(Attack) {
    playerAttack = Attack;
    alert(playerAttack);
};

function functionalAttacks(){
    btnAttacks = document.getElementsByName("Attack");
    btnAttacks.forEach(Attack => {
        Attack.addEventListener("click", function() {
            AssingAttack(Attack.innerHTML)
        });
    });
};

btnChooseMokepon.addEventListener("click",chooseMokepon);
functionalAttacks();
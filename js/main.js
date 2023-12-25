function runCode(){
    let btnChooseMokepon = $("BtnChooseMokepon");
    btnChooseMokepon.addEventListener("click",chooseMokepon);
};

const $ = selector => document.getElementById(selector);

let nodeList;
let mokeponChosen=0;
let playerMokepon = $("PlayerMokepon");
let pcMokepon = $("PcMokepon");

function chooseMokepon(){
    nodeList = document.getElementsByName("Mokepon");
/*     console.log(nodeList.length); */
    nodeList.forEach(input => {
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

window.addEventListener("load",runCode);

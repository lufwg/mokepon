function runCode(){
    let btnChooseMokepon = $("BtnChooseMokepon");
    btnChooseMokepon.addEventListener("click",chooseMokepon);
};

const $ = selector => document.getElementById(selector)

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
        }
    });
    if(!mokeponChosen){
        alert("Choose A Mokepon To Continue");
    }
};

window.addEventListener("load",runCode);

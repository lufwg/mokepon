function runCode(){
    let btnChooseMokepon = document.getElementById("BtnChooseMokepon");
    btnChooseMokepon.addEventListener("click",chooseMokepon);
};
let nodeList 
function chooseMokepon(){
    nodeList = document.getElementsByName("Mokepon");
    /* console.log(nodeList); */
    nodeList.forEach(input => {
        /* console.log(input); */
        if(input.checked){
            /* console.log(input); */
        }
    });
};

window.addEventListener("load",runCode);

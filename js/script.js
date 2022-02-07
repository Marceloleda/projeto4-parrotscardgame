var imagemParrots = [
    "imagens/bobrossparrot.gif",
    "imagens/explodyparrot.gif",
    "imagens/fiestaparrot.gif",
    "imagens/metalparrot.gif",
    "imagens/revertitparrot.gif",
    "imagens/tripletsparrot.gif",
    "imagens/unicornparrot.gif"
];

let escolhidos = [];

function renderizaCartas(quantidadeCartas){
    embaralharParrots(quantidadeCartas);

    while(escolhidos.length !== 0){
        let carta = document.createElement("li");

        carta.setAttribute('onclick','clickCarta(this)');

        let imgCarta = document.createElement('img');

        let indiceSorteio = Math.floor(escolhidos.length * Math.random());
        
        let urlAleatorio = escolhidos[indiceSorteio];
        imgCarta.setAttribute('src', urlAleatorio);
        
        escolhidos.splice(indiceSorteio,1);

        imgCarta.style.display = "none";

        carta.appendChild(imgCarta);

        let ul = document.querySelector(".cartas");
        ul.appendChild(carta);
    };
}

function embaralharParrots(quantidadeCartas){
    for(let i = 0; i < quantidadeCartas/2; i++){
        let indiceSorteio = Math.floor(imagemParrots.length * Math.random());
        escolhidos.push(imagemParrots[indiceSorteio]);
        escolhidos.push(imagemParrots[indiceSorteio]);
        imagemParrots.splice(indiceSorteio,1);
    }
}

let countJogada = 0;
let countAcerto = 0;
let cartasViradas = [];
let acertosParaFinalizar = 0;
let statusJogo = 0;
let interval;


function iniciarJogo(){
    let quantidadeCartas = parseInt(prompt("Quantas cartas você quer jogar? \n Escolha um nº entre 4 e 14"));

    while((quantidadeCartas % 2 !== 0) || (quantidadeCartas < 4) || (quantidadeCartas > 14)){
        quantidadeCartas = parseInt(prompt("Você precisa escolher um nº par entre 4 e 14. Com quantas cartas você quer jogar?"));
    }

    let widthJogo = ((quantidadeCartas / 2) * 150);
    let ul = document.querySelector(".cartas");
    ul.style.width = widthJogo + "px";

    renderizaCartas(quantidadeCartas);
    statusJogo = "jogando";
    acertosParaFinalizar = quantidadeCartas;

    if(statusJogo === "jogando"){
        clearInterval(interval);
        interval = setInterval(cronometro, 1000);
    }
}
iniciarJogo();

function finalizaJogo(){
    statusJogo = "ganhou";
    setTimeout(function(){
        reiniciarJogo();
    }, 500);
}

function reiniciarJogo(){
    var querReiniciar = prompt("Quer reiniciar o jogo?");

    while(querReiniciar !== "sim"){
        querReiniciar = prompt("Para reiniciar o jogo digite a palavra sim");
    };
    
    resetarVariaveis();
    iniciarJogo();
}

function clickCarta(element){
    cartasViradas.push(element);

    if(cartasViradas.length < 3){
        virar(element,"rotateY(180deg)","none","initial");
        countJogada++;

        if(cartasViradas.length === 2){
            segundoClique();
        };

        if(countAcerto === acertosParaFinalizar){
            finalizaJogo();
            statusJogo = "ganhou";
        };
    };
}

function segundoClique(){
    let primeiraCarta = pegaSrc(0);
    let segundaCarta = pegaSrc(1);  
    let saoIguais = verificaIgual(primeiraCarta,segundaCarta);

    if(saoIguais === true){
        cartasViradas = [];
        countAcerto +=2;
    }else if (saoIguais === false){
        setTimeout(function () {
            virar(cartasViradas[0],"rotateY(0deg)","url(imagens/front.png)","none");
            virar(cartasViradas[1],"rotateY(0deg)","url(imagens/front.png)","none");
            cartasViradas = [];
        }, 1000);
    }
}
function resetarVariaveis(){
    let ul = document.querySelector(".cartas");
    ul.innerHTML = "";
    
    imagemParrots = [
        "imagens/bobrossparrot.gif",
        "imagens/explodyparrot.gif",
        "imagens/fiestaparrot.gif",
        "imagens/metalparrot.gif",
        "imagens/revertitparrot.gif",
        "imagens/tripletsparrot.gif",
        "imagens/unicornparrot.gif"
    ];

    countJogada = 0;
    countAcerto = 0;
    cartasViradas = [];
    acertosParaFinalizar = 0;
    escolhidos = [];
    statusJogo = "";
}

function pegaSrc(i){
    let carta = cartasViradas[i].querySelector("img");
    let parrot = carta.getAttribute('src');
    return parrot;
}

function verificaIgual(valor1,valor2){
    if(valor1 === valor2)
        return true;
    else
        return false;
}

function virar(element,rotacao,backgroundImg,display){
    element.style.transform = rotacao;
    element.style.backgroundImage = backgroundImg;
    let img = element.querySelector('img');
    img.style.display = display;
}
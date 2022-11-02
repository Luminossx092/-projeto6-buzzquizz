CarregarTela1();

//Carrega a primeira tela, pede os quizz do servidor
function CarregarTela1(){
    const listaIdDeQuizzUsuario = JSON.parse(localStorage.getItem("id do usuario sei la"));
    if(listaIdDeQuizzUsuario == null){
        document.querySelector(".Tela1 .DivBotaoCriarQuizz").classList.remove("Desaparece");
    }
    else {
        document.querySelector(".ListaQuizzesUsuario").classList.remove("Desaparece")
        RenderizarQuizzesDoUsuario();
    }
    axios.get("https://mock-api.driven.com.br/api/v4/buzzquizz/quizzes")
    .then(RenderizarUltimosXQuizzesServidor())
    .catch();
}

//renderiza os ultimos(mais recentes) ultimosXElementos (quantos quizzes renderizar)quizzes a partir do servidor
function RenderizarUltimosXQuizzesServidor(resposta){
    //escolhe quantos elementos aparecer na tela1
    const ultimosXElementos = 12;
    const listaQuizzes = document.querySelector("main .ListaQuizzes ul");
    //listaQuizzes.innerHTML = "";
    /*Na hora que fiz não tinha nenhum quiz, comentei para não ter erro
    for(let i = 0; i < ultimosXElementos; i++){
        const index = resposta[resposta.length];
        console.log(index);
        listaQuizzes.innerHTML += `
            <li id="${index.id}"onclick="AbrirQuizz(id)" class="QuizzTela1">
                <figure>
                    <img src="${index.image}" alt="">
                </figure>
                <p>${index.title}</p>
            </li>
        `
    }*/
}

function RenderizarQuizzesDoUsuario(){
    
}
//recebe o id do quiz que é pra abrir na tela2
function AbrirQuizz(idQuizz){
    document.querySelector("main .Tela1").classList.add("Desaparece");
    CarregarTela2();

}

function CarregarTela2(){
    document.querySelector("main .Tela2").classList.remove("Desaparece");

}

function CarregarTela3(){
    document.querySelector("main .Tela1").classList.add("Desaparece");
    document.querySelector("main .Tela3").classList.remove("Desaparece");
}

//function só pra testar
function Erro(){
    console.log("erro carregar tela1");
}
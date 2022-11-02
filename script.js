//CarregarTela1();

//Carrega a primeira tela, pede os quizz do servidor
function CarregarTela1(){
    axios.get("https://mock-api.driven.com.br/api/v4/buzzquizz/quizzes")
    .then(RenderizarUltimosXQuizzesServidor())
    .catch();
}

//renderiza os ultimos(mais recentes) ultimosXElementos (quantos quizzes renderizar)quizzes a partir do servidor
function RenderizarUltimosXQuizzesServidor(resposta){
    //escolhe quantos elementos aparecer na tela1
    const ultimosXElementos = 12;
    const listaQuizzes = document.querySelector("main .ListaQuizzes ul");
    listaQuizzes.innerHTML = "";
    /*Na hora que fiz não tinha nenhum quiz, comentei para não ter erro
    for(let i = 0; i < ultimosXElementos; i++){
        const index = resposta[resposta.length];
        console.log(index);
        listaQuizzes.innerHTML += `
            <article id="${index.id}"onclick="AbrirQuizz(id)" class="QuizzTela1">
                <figure>
                    <img src="${index.image}" alt="">
                </figure>
                <p>${index.title}</p>
            </article>
        `
    }*/
}

//recebe o id do quiz que é pra abrir na tela2
function AbrirQuizz(Quizz){
    document.querySelector("main .Tela1").classList.add("Desaparece");
    //carregar tela2....


}

//function só pra testar
function Erro(){
    console.log("erro carregar tela1");
}
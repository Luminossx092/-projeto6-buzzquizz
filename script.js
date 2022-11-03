

//Carrega a primeira tela, pede os quizz do servidor
function CarregarTela1() {
    document.querySelector("main .Tela2").classList.add("Desaparece");
    document.querySelector("main .Tela1").classList.remove("Desaparece");

    const listaIdDeQuizzUsuario = JSON.parse(localStorage.getItem("id do usuario sei la"));
    if (listaIdDeQuizzUsuario == null) {
        document.querySelector(".Tela1 .DivBotaoCriarQuizz").classList.remove("Desaparece");
    }
    else {
        document.querySelector(".ListaQuizzesUsuario").classList.remove("Desaparece")
        RenderizarQuizzesDoUsuario();
    }
    const getQuizz = axios.get("https://mock-api.driven.com.br/api/v4/buzzquizz/quizzes");
    getQuizz.then(RenderizarUltimosXQuizzesServidor)
    getQuizz.catch(ErroRenderQuizzes);
}
CarregarTela1();

//renderiza os ultimos(mais recentes) ultimosXElementos (quantos quizzes renderizar)quizzes a partir do servidor
function RenderizarUltimosXQuizzesServidor(resposta) {
    //escolhe quantos elementos aparecer na tela1
    const index = 1;
    const listaQuizzes = document.querySelector("main .ListaQuizzes ul");
    listaQuizzes.innerHTML = "";
    const quizz = resposta.data;
    console.log(quizz)

    for (let i = 0; i < index; i++) {

        listaQuizzes.innerHTML += `
            <li id="${quizz[i].id}" onclick="AbrirQuizz(id)" class="QuizzTela1">
                <figure>
                    <img src="${quizz[i].image}" alt="Imagem Indisponivel">
                </figure>
                <p>${quizz[i].title}</p>
            </li>
        `
    }
}

function ErroRenderQuizzes(erro) {
    console.log(erro);
}

function RenderizarQuizzesDoUsuario() {

}
//recebe o id do quiz que é pra abrir na tela2
function AbrirQuizz(idQuizz) {
    document.querySelector("main .Tela1").classList.add("Desaparece");
    CarregarTela2();

}

function CarregarTela2() {
    document.querySelector("main .Tela2").classList.remove("Desaparece");

}

function CarregarTela3() {
    document.querySelector("main .Tela1").classList.add("Desaparece");
    document.querySelector("main .Tela3").classList.remove("Desaparece");
}

function VerificarInformacoesBasicasPergunta() {
    const DadosInválidos = function () { alert("Dados inválidos, preencha os dados corretamente!"); }

    const tamanhoTitulo = document.querySelector(".Tela3 .TituloQuizz").value.length;
    //const url = document.querySelector(".Tela3 .URLImagemQuizz");
    const quantidadePerguntas = document.querySelector(".Tela3 .QuantidadePerguntasQuizz").value;
    const niveis = document.querySelector(".Tela3 .QuantidadesNiveisQuizz").value;

    if (tamanhoTitulo < 20 || tamanhoTitulo > 65 || quantidadePerguntas < 3 || niveis < 2) {
        DadosInválidos();
        return;
    }
    try {
        let url = new URL(document.querySelector(".Tela3 .URLImagemQuizz").value);
    } catch (err) {
        DadosInválidos;
        return;
    }
    //CriarPerguntas();
}
//function só pra testar
function Erro() {
    console.log("erro carregar tela1");
}

let qtdDeAcertos = 0; // Quantidade de quizzes que o usuario acertou
// funcao para scrollar para a próxima CaixaQuizz
function proxCaixaQuizz() {
    const proxCaixaQuizz = document.querySelector('.CaixaQuizz.NaoRespondida');
    if (proxCaixaQuizz !== null){
        proxCaixaQuizz.scrollIntoView();
    }
}

// função add class Selecionar na resposta clicada e as outras ficarem com NaoSelecionada
function SelecionarResposta(respSelecionada) {
    const caixaQuizz = (respSelecionada.parentNode).parentNode; // Seleciona a CaixaQuizz que o usuário está respondendo
    if( !(caixaQuizz.classList.contains('Respondida')) ) {
        respSelecionada.classList.add("Selecionada");
        caixaQuizz.classList.remove("NaoRespondida");
        caixaQuizz.classList.add("Respondida");
        const respNaoSelecionada = caixaQuizz.querySelectorAll('figure');
        for (let i = 0; i < respNaoSelecionada.length; i++){
            if( !(respNaoSelecionada[i].classList.contains("Selecionada")) ){
                respNaoSelecionada[i].classList.add("NaoSelecionada");
            }
        }
        respSelecionada.classList.contains('RespostaCerta')? qtdDeAcertos++ : 0;
        setTimeout(proxCaixaQuizz,2000);
    }
}


//Carrega a primeira tela, pede os quizz do servidor
function CarregarTela1() {
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
    const index = 10;
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
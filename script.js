let quantidadePerguntas, qtdniveis, criaTituloQuizz, listaIdDeQuizzUsuario, perguntas, niveis;

//Carrega a primeira tela, pede os quizz do servidor
function CarregarTela1() {
    document.querySelector("main .Tela2").classList.add("Desaparece");
    document.querySelector("main .Tela1").classList.remove("Desaparece");

    listaIdDeQuizzUsuario = JSON.parse(localStorage.getItem("QuizzesSalvos"));
    if (listaIdDeQuizzUsuario == null) {
        document.querySelector(".Tela1 .DivBotaoCriarQuizz").classList.remove("Desaparece");
    }
    else {
        document.querySelector(".ListaQuizzesUsuario").classList.remove("Desaparece")
        document.querySelector("main .ListaQuizzesUsuario ul").innerHTML = "";
        for(let i = 0; i < listaIdDeQuizzUsuario.length; i++){
            axios.get(`https://mock-api.driven.com.br/api/v4/buzzquizz/${listaIdDeQuizzUsuario[i]}`)
            .then(RenderizarQuizzesDoUsuario)
            .catch();
        }
    }
    const getQuizz = axios.get("https://mock-api.driven.com.br/api/v4/buzzquizz/quizzes");
    getQuizz.then(RenderizarUltimosXQuizzesServidor)
    getQuizz.catch(ErroRenderQuizzes);
}
CarregarTela1();

function RenderizarUltimosXQuizzesServidor(resposta) {
    //escolhe quantos elementos aparecer na tela1
    const index = 6;
    const listaQuizzes = document.querySelector("main .ListaQuizzes ul");
    listaQuizzes.innerHTML = "";
    const quizz = resposta.data;
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

function RenderizarQuizzesDoUsuario(resposta) {
    const quizz = resposta.data;
    document.querySelector("main .ListaQuizzesUsuario ul").innerHTML += `
        <li id="${quizz[i].id}" onclick="AbrirQuizz(id)" class="QuizzTela1">
            <figure>
                <img src="${quizz[i].image}" alt="Imagem Indisponivel">
            </figure>
            <p>${quizz[i].title}</p>
        </li>
    `
}
//recebe o id do quiz que é pra abrir na tela2
function AbrirQuizz(idQuizz) {
    document.querySelector("main .Tela1").classList.add("Desaparece");
    CarregarTela2(idQuizz);
}

function CarregarTela2(id) {
    document.querySelector("main .Tela2").classList.remove("Desaparece");
    axios.get(`https://mock-api.driven.com.br/api/v4/buzzquizz/quizzes/${id}`)
        .then(CarregarInformacoesTela2)
        .catch(ErroRenderQuizzes);
}


// ----------------------------------------------------------- Criando Quizz

function CarregarTela3() {
    document.querySelector("main .Tela1").classList.add("Desaparece");
    document.querySelector("main .Tela3").classList.remove("Desaparece");
}


// ----------------------------------------------------------- Criando Quizz (Perguntas)

function CarregarTela3_1() {
    //Limpa os inputs anteriores
    document.querySelectorAll("input").forEach(element => element.value = "");
    document.querySelector("main .Tela3").classList.add("Desaparece");
    document.querySelector("main .Tela3_1").classList.remove("Desaparece");
    document.querySelector(".PerguntasQuizz").innerHTML = "";

    qtdPerguntas = 3;

    //Carrega o local para inserir as perguntas
    for (let i = 1; i <= qtdPerguntas; i++) {

        document.querySelector(".PerguntasQuizz").innerHTML += `
            <li class="perguntaQuizz">
                <div class="marginPerguntas"></div>
                <div><h2>Pergunta ${i}</h2></div>
                <div class="InfoBasicasQuizz centralizar">
                    <input class="divsInfo TituloQuizz" type="text" placeholder="Texto da pergunta">
                    <input class="divsInfo TituloQuizz" type="text" placeholder="Cor de fundo da pergunta">
                </div>
                <div class="marginPerguntas"></div>
                <div><h2>Resposta correta</h2></div>
                <div class="InfoBasicasQuizz centralizar">
                    <input class="divsInfo TituloQuizz" type="text" placeholder="Resposta correta">
                    <input class="divsInfo TituloQuizz" type="text" placeholder="URL da imagem">
                </div>
                <div class="marginPerguntas"></div>
                <div><h2>Resposta incorreta</h2></div>
                <div class="InfoBasicasQuizz centralizar marginEntreErradas">
                    <input class="divsInfo TituloQuizz" type="text" placeholder="Resposta incorreta 1">
                    <input class="divsInfo TituloQuizz" type="text" placeholder="URL da imagem 1">
                </div>
                <div class="InfoBasicasQuizz centralizar marginEntreErradas">
                    <input class="divsInfo TituloQuizz" type="text" placeholder="Resposta incorreta 2">
                    <input class="divsInfo TituloQuizz" type="text" placeholder="URL da imagem 2">
                </div>
                <div class="InfoBasicasQuizz centralizar">
                    <input class="divsInfo TituloQuizz" type="text" placeholder="Resposta incorreta 3">
                    <input class="divsInfo TituloQuizz" type="text" placeholder="URL da imagem 3">
                </div>
                <div class="marginPerguntas"></div>
            </li>
        `
    }
}


// ----------------------------------------------------------- Criando Quizz (Níveis)

function CarregarTela3_2() {
    //Limpa os inputs anteriores
    document.querySelectorAll("input").forEach(element => element.value = "");
    document.querySelector("main .Tela3_1").classList.add("Desaparece");
    document.querySelector("main .Tela3_2").classList.remove("Desaparece");
    document.querySelector(".NiveisQuizz").innerHTML = "";

    qtdNiveis = 2;

    //Carrega o local para inserir os níveis
    for (let i = 1; i <= qtdNiveis; i++) {

        document.querySelector(".NiveisQuizz").innerHTML += `
            <li class="perguntaQuizz">
                <div class="marginPerguntas"></div>
                <div><h2>Nível ${i}</h2></div>
                <div class="InfoBasicasQuizz centralizar">
                    <input class="divsInfo TituloQuizz" type="text" placeholder="Título do nível">
                    <input class="divsInfo TituloQuizz" type="text" placeholder="% de acerto mínima">
                    <input class="divsInfo TituloQuizz" type="text" placeholder="URL da imagem do nível">
                    <input class="divsInfo TituloQuizz" type="text" placeholder="Descrição do nível">
                </div>
                <div class="marginPerguntas"></div>
            </li>
        `
    }
}
// ----------------------------------------------------------- Criando Quizz (checando dados das infos)

function VerificarInformacoesBasicasPergunta() {
    const DadosInválidos = function () { alert("Dados inválidos, preencha os dados corretamente!"); }

    const tamanhoTitulo = document.querySelector(".Tela3 .TituloQuizz").value.length;
    //const url = document.querySelector(".Tela3 .URLImagemQuizz");
    tituloQuizz = String(document.querySelector(".Tela3 .TituloQuizz").value);

    qtdPerguntas = Number(document.querySelector(".Tela3 .QuantidadePerguntasQuizz").value);
    qtdniveis = Number(document.querySelector(".Tela3 .QuantidadesNiveisQuizz").value);
    /*
    if (tamanhoTitulo < 20 || tamanhoTitulo > 65 || qtdPerguntas < 3 || qtdNiveis < 2) {
        DadosInválidos();
        return;
    }
    try {
        let url = new URL(document.querySelector(".Tela3 .URLImagemQuizz").value);
    } catch (err) {
        DadosInválidos;
        return;
    }
    */
    CarregarTela3_1();
}



// ----------------------------------------------------------- Criando Quizz (checando dados das perguntas)

function VerificarPerguntasQuizz() {
    CarregarTela3_2();
}

function Erro() {
    console.log("erro carregar tela1");
}

let qtdDeAcertos = 0; // Quantidade de quizzes que o usuario acertou
// funcao para scrollar para a próxima CaixaQuizz
let qtdPerguntasRespondidas = 0;
function proxCaixaQuizz() {
    const proxCaixaQuizz = document.querySelector('.CaixaQuizz.NaoRespondida');
    if (proxCaixaQuizz !== null) {
        proxCaixaQuizz.scrollIntoView();
    } else {
        ResultadoQuizz();
    }
}

// função add class Selecionar na resposta clicada e as outras ficarem com NaoSelecionada
function SelecionarResposta(respSelecionada) {
    const caixaQuizz = (respSelecionada.parentNode).parentNode; // Seleciona a CaixaQuizz que o usuário está respondendo
    if (!(caixaQuizz.classList.contains('Respondida'))) {
        respSelecionada.classList.add("Selecionada");
        caixaQuizz.classList.remove("NaoRespondida");
        caixaQuizz.classList.add("Respondida");
        qtdPerguntasRespondidas++;
        const respNaoSelecionada = caixaQuizz.querySelectorAll('figure');
        for (let i = 0; i < respNaoSelecionada.length; i++) {
            if (!(respNaoSelecionada[i].classList.contains("Selecionada"))) {
                respNaoSelecionada[i].classList.add("NaoSelecionada");
            }
        }
        respSelecionada.classList.contains('RespostaCerta') ? qtdDeAcertos++ : 0;
        setTimeout(proxCaixaQuizz, 2000);
    }
}

function CarregarInformacoesTela2(resposta){
    perguntas = resposta.data.questions;
    niveis = resposta.data.levels;
    document.querySelector('.Tela2 .BannerQuizz img').src = resposta.data.image;
    document.querySelector('.Tela2 .TituloBanner').innerHTML = resposta.data.title;
    const telaQuizz = document.querySelector(".TelaQuizz");
    telaQuizz.innerHTML = "";
    let telaQuizzInnerHTML = '';
    for (let i = 0; i < perguntas.length; i++) {
        telaQuizzInnerHTML += `<div class="CaixaQuizz NaoRespondida">
        <div class="CaixaPergunta" style="background-color:${perguntas[i].color}">
        <p class="TextoPergunta">${perguntas[i].title}></p>
    </div>
    <div class="Respostas">`
        let arrRespostas = perguntas[i].answers;
        arrRespostas.sort(() => Math.random() - 0.5)
        for (let j = 0; j < arrRespostas.length; j++) {
            if (arrRespostas[j].isCorrectAnswer) {
                telaQuizzInnerHTML += `<figure class="RespostaCerta" onclick="SelecionarResposta(this)">
                <img src="${arrRespostas[j].image}">
                <figcaption class="RespostaLegenda">${arrRespostas[j].text}</figcaption>
            </figure>`
            }
            else {
                telaQuizzInnerHTML += `<figure class="RespostaErrada" onclick="SelecionarResposta(this)">
                <img src="${arrRespostas[j].image}">
                <figcaption class="RespostaLegenda">${arrRespostas[j].text}</figcaption>
            </figure>`
            }
        }
        telaQuizzInnerHTML += `</div>
        </div>`
    }
    telaQuizz.innerHTML = telaQuizzInnerHTML;
}

function ResultadoQuizz() {
    const totalPerguntas = perguntas.length;
    if(totalPerguntas === qtdPerguntasRespondidas){
        const telaQuizz = document.querySelector(".TelaQuizz");
        const porcentagemDeAcertos = ( Math.round( (qtdDeAcertos/totalPerguntas) * 100 ) );
        qtdPerguntasRespondidas = 0;
        qtdDeAcertos = 0;

        let pegaIndexNivel;
        for (let i = (niveis.length - 1) ; i >= 0 ; i--){
            if( pegaIndexNivel === undefined ){ 
                if (porcentagemDeAcertos >= niveis[i].minValue){
                    pegaIndexNivel = niveis.indexOf(niveis[i]);
                }
            }
        }

        telaQuizz.innerHTML+=`                    
            <div class="ResultadoQuizz">
                <div class="CaixaResultado">
                    <p class="TextoResultado">${porcentagemDeAcertos}% de acerto: ${niveis[pegaIndexNivel].title}</p>
                </div>
                <div class="Resultado">
                    <img src="${niveis[pegaIndexNivel].image}">
                    <p>${niveis[pegaIndexNivel].text}</p>
                </div>
                <div class="ReiniciarOuVoltar">
                <button class="BotaoReiniciarQuizz">Reiniciar Quizz</button>
                <p class="VoltarHome" onclick="CarregarTela1()">Voltar pra home</p>
            </div>
        `;
        const selecResulQuizz = document.querySelector('.ResultadoQuizz');
        selecResulQuizz.scrollIntoView();
    }
}

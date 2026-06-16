// --- BANCO DE PERGUNTAS ---
const perguntas = [
    {
        pergunta: "Qual é o principal objetivo do Programa Agrinho?",
        opcoes: [
            "Incentivar o uso de eletrónicos nas escolas rurais.",
            "Desenvolver a consciência cidadã e a sustentabilidade a partir do ambiente escolar.",
            "Ensinar apenas técnicas de plantio de soja.",
            "Organizar feiras de ciências urbanas."
        ],
        correta: 1
    },
    {
        pergunta: "O Programa Agrinho é uma iniciativa de qual instituição principal?",
        opcoes: [
            "Ministério da Tecnologia.",
            "SENAR / Federação da Agricultura.",
            "Banco Central do Brasil.",
            "Prefeituras municipais de forma isolada."
        ],
        correta: 1
    },
    {
        pergunta: "Quais temas costumam ser abordados nos materiais do Agrinho?",
        opcoes: [
            "Apenas matemática financeira avançada.",
            "Meio ambiente, saúde, segurança pessoal e ética.",
            "História do cinema internacional.",
            "Programação de jogos digitais."
        ],
        correta: 1
    }
];

let indicePerguntaAtual = 0;
let pontuacao = 0;

// Elementos das Telas
const telaStart = document.getElementById("start-screen");
const telaQuiz = document.getElementById("quiz-screen");
const telaResultado = document.getElementById("result-screen");

// Elementos do Jogo
const elementoPergunta = document.getElementById("question");
const elementoOpcoes = document.getElementById("options");
const botaoProximo = document.getElementById("next-btn");
const elementoPontuacao = document.getElementById("score");

// --- CONTROLE DE TELAS ---

function iniciarJogo() {
    telaStart.classList.add("hide");
    telaQuiz.classList.remove("hide");
   
    indicePerguntaAtual = 0;
    pontuacao = 0;
    mostrarPergunta();
}

function mostrarPergunta() {
    resetarEstado();
    let perguntaAtual = perguntas[indicePerguntaAtual];
    elementoPergunta.innerText = perguntaAtual.pergunta;

    perguntaAtual.opcoes.forEach((opcao, index) => {
        const botao = document.createElement("button");
        botao.innerText = opcao;
        botao.classList.add("option-btn");
        botao.style.fontFamily = "inherit"; 
        botao.addEventListener("click", () => selecionarResposta(index, botao));
        elementoOpcoes.appendChild(botao);
    });
}

function resetarEstado() {
    botaoProximo.classList.add("hide");
    elementoOpcoes.innerHTML = "";
}

function selecionarResposta(indiceSelecionado, botaoClicado) {
    const perguntaAtual = perguntas[indicePerguntaAtual];
    const botoes = elementoOpcoes.querySelectorAll(".option-btn");

    // Trava os botões para evitar cliques repetidos
    botoes.forEach(btn => btn.disabled = true);

    if (indiceSelecionado === perguntaAtual.correta) {
        botaoClicado.style.backgroundColor = "#2ecc71";
        botaoClicado.style.color = "#fff";
        pontuacao++;
    } else {
        botaoClicado.style.backgroundColor = "#e74c3c";
        botaoClicado.style.color = "#fff";
        // Mostra qual era a alternativa certa em verde
        botoes[perguntaAtual.correta].style.backgroundColor = "#2ecc71";
        botoes[perguntaAtual.correta].style.color = "#fff";
    }

    botaoProximo.classList.remove("hide");
}

function proximaPergunta() {
    indicePerguntaAtual++;
    if (indicePerguntaAtual < perguntas.length) {
        mostrarPergunta();
    } else {
        mostrarResultado();
    }
}

function mostrarResultado() {
    telaQuiz.classList.add("hide");
    telaResultado.classList.remove("hide");
    elementoPontuacao.innerText = `Acertou em ${pontuacao} de ${perguntas.length} perguntas!`;
}

function voltarParaInicio() {
    telaResultado.classList.add("hide");
    telaStart.classList.remove("hide");
}

// --- SISTEMA DE ACESSIBILIDADE GLOBAL ---
let tamanhoBasePixels = 16; 

function alterarFonte(direcao) {
    tamanhoBasePixels += direcao * 2;
   
    // Limites seguros (Mínimo 12px, Máximo 26px)
    if (tamanhoBasePixels < 12) tamanhoBasePixels = 12;
    if (tamanhoBasePixels > 26) tamanhoBasePixels = 26;
   
    // Altera o tamanho da fonte no HTML (afeta todos os elementos com 'rem')
    document.documentElement.style.fontSize = tamanhoBasePixels + "px";
}

function alternarContraste() {
    document.body.classList.toggle("high-contrast");
}

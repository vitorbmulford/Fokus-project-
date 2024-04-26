// Seleção dos elementos HTML
const html = document.querySelector("html");
const focoBt = document.querySelector(".app__card-button--foco");
const curtoBt = document.querySelector(".app__card-button--curto");
const longoBt = document.querySelector(".app__card-button--longo");
const banner = document.querySelector(".app__image");
const titulo = document.querySelector(".app__title");
const botoes = document.querySelectorAll(".app__card-button");
const musicaFocoInput = document.querySelector("#alternar-musica");
const startPauseBt = document.querySelector("#start-pause");
const inicarOuPausarBt = document.querySelector("#start-pause span");
const logoPauseOuplay = document.querySelector(".app__card-primary-butto-icon");
const tempoNaTela = document.querySelector("#timer");

// Inicialização das variáveis de tempo e intervalo
let tempoDecorridoEmSegundos = 1500; // Tempo padrão de 25 minutos
let intervaloId = null;

// Criação de objetos de áudio
const musica = new Audio("/sons/luna-rise-part-one.mp3");
let audioPause = new Audio("/sons/pause.mp3");
let audioPlay = new Audio("sons/play.wav");
let audioFinalizado = new Audio("/sons/beep.mp3");

// Configuração do áudio para repetição
musica.loop = true;

// Evento de troca de música para o modo foco
musicaFocoInput.addEventListener("change", () => {
  if (musica.paused) {
    musica.play();
  } else {
    musica.pause();
  }
});

// Eventos de clique nos botões de contexto
focoBt.addEventListener("click", () => {
  alterarContexto("foco"); // Altera o contexto para "foco"
  focoBt.classList.add("active"); // Adiciona a classe "active" ao botão de foco
});

curtoBt.addEventListener("click", () => {
  alterarContexto("descanso-curto"); // Altera o contexto para "descanso-curto"
  curtoBt.classList.add("active"); // Adiciona a classe "active" ao botão de descanso curto
});

longoBt.addEventListener("click", () => {
  alterarContexto("descanso-longo"); // Altera o contexto para "descanso-longo"
  longoBt.classList.add("active"); // Adiciona a classe "active" ao botão de descanso longo
});

// Função para alterar o contexto
function alterarContexto(contexto) {
  // Remove a classe "active" de todos os botões
  botoes.forEach((button) => {
    button.classList.remove("active");
  });
  
  // Atualiza o contexto do HTML
  html.setAttribute("data-contexto", contexto);
  
  // Atualiza a imagem do banner conforme o contexto
  banner.setAttribute("src", `./imagens/${contexto}.png`);

  // Define o título de acordo com o contexto
  switch (contexto) {
    case "foco":
      titulo.innerHTML = `
        Otimize sua produtividade,<br>
        <strong class="app__title-strong">mergulhe no que importa.</strong>
      `;
      tempoDecorridoEmSegundos = 1500; // 25 minutos em segundos
      break;

    case "descanso-curto":
      titulo.innerHTML = `
        Que tal dar uma respirada? <strong class="app__title-strong">Faça uma pausa curta!</strong>
      `;
      tempoDecorridoEmSegundos = 300; // 5 minutos em segundos
      break;

    case "descanso-longo":
      titulo.innerHTML = `
        Hora de voltar à superfície.<strong class="app__title-strong"> Faça uma pausa longa.</strong>
      `;
      tempoDecorridoEmSegundos = 900; // 15 minutos em segundos
      break;

    default:
      break;
  }

  // Atualiza o tempo na tela com base no novo tempo decorrido
  mostrarTempo(tempoDecorridoEmSegundos);
}

// Função para mostrar o tempo na tela
function mostrarTempo(tempoDecorridoEmSegundos) {
  const tempo = new Date(tempoDecorridoEmSegundos * 1000);
  const tempoFormatado = tempo.toLocaleTimeString("pt-BR", {
    minute: "2-digit",
    second: "2-digit",
  });
  tempoNaTela.innerHTML = `${tempoFormatado}`;
}

// Função de contagem regressiva
const contagemRegressiva = () => {
  if (tempoDecorridoEmSegundos <= 0) {
    // audioFinalizado.play();
    alert("tempo finalizado");
    zerar();
    return;
  }
  tempoDecorridoEmSegundos -= 1;
  mostrarTempo(tempoDecorridoEmSegundos);
};

// Evento de clique no botão de iniciar/pausar
startPauseBt.addEventListener("click", inicarOuPausar);

// Função para iniciar ou pausar a contagem regressiva
function inicarOuPausar() {
  if (intervaloId) {
    audioPause.play();
    zerar();
    return;
  }
  audioPlay.play();
  intervaloId = setInterval(contagemRegressiva, 1000);
  logoPauseOuplay.setAttribute("src", `./imagens/pause.png`);
  inicarOuPausarBt.textContent = "Pausar";
}

// Função para zerar a contagem regressiva
function zerar() {
  clearInterval(intervaloId);
  inicarOuPausarBt.textContent = "Começar";
  logoPauseOuplay.setAttribute("src", `./imagens/play_arrow.png`);
  intervaloId = null;
}

// Inicialização da tela com o tempo padrão
mostrarTempo(tempoDecorridoEmSegundos);

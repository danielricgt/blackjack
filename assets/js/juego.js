//  2C dos de CLUBS, TREBOLES
//  2D dos de DIAMONS
//  2H dos de HEARTS
//  2S dos de ESPADAS

let deck = [];

const cartasEspeciales = ["A", "J", "Q", "K"];
const tipos = ["C", "D", "H", "S"];

let puntosJugador = 0;
let puntosComputadora = 0;

// Referencias botonos

const btnPedir = document.querySelector("#btnPedir");
const btnSmall = document.querySelectorAll("small");
const btnDetener = document.querySelector("#btnDetener");
const btnNuevoJuego = document.querySelector("#btnNuevo");

// Referencias img cartas

const imgCartaJug = document.querySelector("#jugador-cartas");
const imgCartaComp = document.querySelector("#computadora-cartas");

// Esta funcion crea un nuevo deck o bajara
const crearDeck = () => {
  for (let i = 2; i <= 10; i++) for (let tipo of tipos) deck.push(i + tipo);

  for (let tipo of tipos) {
    for (let cartaEspecial of cartasEspeciales) deck.push(cartaEspecial + tipo);
  }
  // console.log(deck);
  deck = _.shuffle(deck);
  console.log(deck);
  return deck;
};

crearDeck();

// Esta funcion me perite tomar una carta
const pedirCarta = () => {
  if (deck.length === 0) {
    throw new Error("No hay cartas en el deck");
  }
  const carta = deck.pop();

  return carta;
};

pedirCarta();

const valorCarta = (carta) => {
  const valor = carta.substring(0, carta.length - 1);
  return isNaN(valor) ? (valor === "A" ? 11 : 10) : valor * 1;
  //   let puntos = 0;

  //   if (isNaN(valor)) {
  //     console.log("No es un numero");
  //     puntos = (valor === 'A') ? 11 : 10;
  //   } else {
  //     console.log("Es un numero");
  //     puntos = valor * 1;
  //   }
  //   console.log(puntos);
};

// Turno de la computadora

const turnoComputadora = (puntosminimos) => {
  do {
    const carta = pedirCarta();

    puntosComputadora = puntosComputadora + valorCarta(carta);

    btnSmall[1].innerText = puntosComputadora;

    const imgCarta = document.createElement("img");
    imgCarta.src = `assets/cartas/${carta}.png`;
    imgCarta.classList.add("carta");
    imgCartaComp.append(imgCarta);
    if (puntosminimos > 21) {
      break;
    }
  } while (puntosComputadora < puntosminimos && puntosminimos <= 21);

  setTimeout(() => {
    if (puntosComputadora === puntosminimos) {
      alert("nadie gana");
    } else if (puntosminimos > 21) {
      alert("Computadora Gana");
    } else if (puntosComputadora > 21) {
      alert("Jugador gana");
    } else {
      alert("computadora gana");
    }
  }, 50);
};

// eventos

btnPedir.addEventListener("click", () => {
  const carta = pedirCarta();
  console.log(carta);

  puntosJugador = puntosJugador + valorCarta(carta);
  console.log(puntosJugador);
  btnSmall[0].innerText = puntosJugador;

  const imgCarta = document.createElement("img");
  imgCarta.src = `assets/cartas/${carta}.png`;
  imgCarta.classList.add("carta");
  imgCartaJug.append(imgCarta);

  if (puntosJugador > 21) {
    console.warn("Lo siendo mucho perdiste");
    btnPedir.disabled = true;
    btnDetener.disabled = true;
    turnoComputadora(puntosJugador);
  } else if (puntosJugador === 21) {
    console.warn("21, genial");
    btnDetener.disabled = true;
    btnPedir.disabled = true;
    turnoComputadora(puntosJugador);
  }
});

btnDetener.addEventListener("click", () => {
  btnPedir.disabled = true;
  btnDetener.disabled = true;
  turnoComputadora(puntosJugador);
});

btnNuevoJuego.addEventListener("click", () => {
  console.clear();
  deck = [];
  deck = crearDeck();

  puntosJugador = 0;
  puntosComputadora = 0;

  imgCartaJug.innerHTML = "";
  imgCartaComp.innerHTML = "";

  btnSmall[0].innerHTML = 0;
  btnSmall[1].innerHTML = 0;

  btnPedir.disabled = false;
  btnDetener.disabled = false;
});

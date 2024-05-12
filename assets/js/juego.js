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

// eventos

btnPedir.addEventListener("click", () => {
  const carta = pedirCarta();
  console.log(carta);

  puntosJugador = puntosJugador + valorCarta(carta);
  console.log(puntosJugador);
  btnSmall[0].innerText = puntosJugador;

  const imgCarta = document.createElement('img');
  imgCarta.src = `assets/cartas/${carta}.png`;
  imgCarta.classList.add('carta');
  imgCartaJug.append(imgCarta);

if (puntosJugador > 21) {
  console.warn('Lo siendo mucho perdiste');
  btnPedir.disabled = true;
} else if (puntosJugador === 21) {
  console.warn('21, genial');
  btnPedir.disabled = true;
}


});

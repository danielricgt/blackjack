//  2C dos de CLUBS, TREBOLES
//  2D dos de DIAMONS
//  2H dos de HEARTS
//  2S dos de ESPADAS

let deck = [];
const tipos = ["C", "D", "H", "S"];
const cartasEspeciales = ["A", "J", "Q", "K"];
// Esta funcion crea un nuevo deck o bajara
const crearDeck = () => {
  for (let i = 2; i <= 10; i++) for (let tipo of tipos) deck.push(i + tipo);

  for (let tipo of tipos) {
    for (let cartaEspecial of cartasEspeciales) deck.push(tipo + cartaEspecial);
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
    throw "No hay cartas en el deck";
  }
  const carta = deck.pop();
  console.log({ carta });
  console.log(deck);
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

const valor = valorCarta(pedirCarta());
console.log({valor});

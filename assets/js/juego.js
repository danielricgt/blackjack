const miModulo = (() => {
  "use strict";
  let deck = [];

  const cartasEspeciales = ["A", "J", "Q", "K"],
    tipos = ["C", "D", "H", "S"];

  // let puntosJugador = 0,
  //  puntosComputadora = 0;
  let puntosJugadores = [];

  // Referencias botonos

  const btnPedir = document.querySelector("#btnPedir"),
    btnDetener = document.querySelector("#btnDetener"),
    btnNuevoJuego = document.querySelector("#btnNuevo");

  // Referencias img cartas

  const divCartasJugadores = document.querySelectorAll(".divCartas"),
    btnSmall = document.querySelectorAll("small");

  const inicializarJuego = (numJugadores = 2) => {
    deck = crearDeck();
    puntosJugadores = [];
    for (let i = 0; i < numJugadores; i++) {
      puntosJugadores.push(0);
    }
 btnSmall.forEach(elem => elem.innerText = 0);
 divCartasJugadores.forEach(elem => elem.innerHTML = '');


    btnPedir.disabled = false;
    btnDetener.disabled = false;
  };

  // Esta funcion crea un nuevo deck o bajara
  const crearDeck = () => {
    deck = [];
    for (let i = 2; i <= 10; i++) for (let tipo of tipos) deck.push(i + tipo);

    for (let tipo of tipos) {
      for (let cartaEspecial of cartasEspeciales)
        deck.push(cartaEspecial + tipo);
    }

    return _.shuffle(deck);
  };

  const determinarJugador = ()=>{

const [puntosminimos, puntosComputadora] = puntosJugadores;

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
  

  

  // Esta funcion me permite tomar una carta
  const pedirCarta = () => {
    if (deck.length === 0) {
      throw new Error("No hay cartas en el deck");
    }
    return deck.pop();
  };

  const valorCarta = (carta) => {
    const valor = carta.substring(0, carta.length - 1);
    return isNaN(valor) ? (valor === "A" ? 11 : 10) : valor * 1;
  };

  // turno : 0 = primer jugador y el ultimo sera la computadora
  const acumularPuntos = (carta, turno) => {
    puntosJugadores[turno] = puntosJugadores[turno] + valorCarta(carta);
    btnSmall[turno].innerText = puntosJugadores[turno];
    return puntosJugadores[turno];
  };

  const crearCarta = (carta, turno) => {
    const imgCarta = document.createElement("img");
    imgCarta.src = `assets/cartas/${carta}.png`;
    imgCarta.classList.add("carta");
    divCartasJugadores[turno].append(imgCarta);
  };

  // Turno de la computadora

  const turnoComputadora = (puntosminimos) => {
    let puntosComputadora = 0;
    do {
      const carta = pedirCarta();
      puntosComputadora = acumularPuntos(carta, puntosJugadores.length - 1);
      crearCarta(carta, puntosJugadores.length - 1);


    } while (puntosComputadora < puntosminimos && puntosminimos <= 21);

    determinarJugador();
  }

  // eventos

  btnPedir.addEventListener("click", () => {
    const carta = pedirCarta();
    const puntosJugador = acumularPuntos(carta, 0);

    crearCarta(carta, 0);

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
    turnoComputadora(puntosJugadores[0]);
  });

  btnNuevoJuego.addEventListener("click", () => {


  });
  return {
    nuevoJuego : inicializarJuego
  };
})();

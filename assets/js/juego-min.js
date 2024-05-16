const miModulo = (() => {
  "use strict";
  let e = [],
    t = ["A", "J", "Q", "K"],
    r = ["C", "D", "H", "S"],
    a = [],
    l = document.querySelector("#btnPedir"),
    n = document.querySelector("#btnDetener"),
    d = document.querySelector("#btnNuevo"),
    o = document.querySelectorAll(".divCartas"),
    s = document.querySelectorAll("small"),
    i = (t = 2) => {
      (e = c()), (a = []);
      for (let r = 0; r < t; r++) a.push(0);
      s.forEach((e) => (e.innerText = 0)),
        o.forEach((e) => (e.innerHTML = "")),
        (l.disabled = !1),
        (n.disabled = !1);
    },
    c = () => {
      e = [];
      for (let a = 2; a <= 10; a++) for (let l of r) e.push(a + l);
      for (let n of r) for (let d of t) e.push(d + n);
      return _.shuffle(e);
    },
    u = () => {
      let [e, t] = a;
      setTimeout(() => {
        t === e
          ? alert("nadie gana")
          : e > 21
          ? alert("Computadora Gana")
          : t > 21
          ? alert("Jugador gana")
          : alert("computadora gana");
      }, 50);
    },
    $ = () => {
      if (0 === e.length) throw Error("No hay cartas en el deck");
      return e.pop();
    },
    h = (e) => {
      let t = e.substring(0, e.length - 1);
      return isNaN(t) ? ("A" === t ? 11 : 10) : 1 * t;
    },
    f = (e, t) => ((a[t] = a[t] + h(e)), (s[t].innerText = a[t]), a[t]),
    g = (e, t) => {
      let r = document.createElement("img");
      (r.src = `assets/cartas/${e}.png`),
        r.classList.add("carta"),
        o[t].append(r);
    },
    b = (e) => {
      let t = 0;
      do {
        let r = $();
        (t = f(r, a.length - 1)), g(r, a.length - 1);
      } while (t < e && e <= 21);
      u();
    };
  return (
    l.addEventListener("click", () => {
      let e = $(),
        t = f(e, 0);
      g(e, 0),
        t > 21
          ? (console.warn("Lo siendo mucho perdiste"),
            (l.disabled = !0),
            (n.disabled = !0),
            b(t))
          : 21 === t &&
            (console.warn("21, genial"),
            (n.disabled = !0),
            (l.disabled = !0),
            b(t));
    }),
    n.addEventListener("click", () => {
      (l.disabled = !0), (n.disabled = !0), b(a[0]);
    }),
    d.addEventListener("click", () => {}),
    { nuevoJuego: i }
  );
})();

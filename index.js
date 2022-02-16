//
// INIT: global Variables, EventListener, KeyboardInput
//
import { create, all } from 'mathjs/number'

const math = create(all)

let input_string = ""; // Hier gehen alle Eingaben als Entity rein
let history = []; // Nachdem Enter gedrueckt wurde, werden hier Aufg und Loesung reingeschrieben

document.querySelector(".rem").addEventListener("click", () => rem()); // Loeschen
document.querySelector(".eqn").addEventListener("click", () => solve()); // Enter, Loesen
document.querySelector(".ac").addEventListener("click", () => clear()); // AC, Eingabe reset

// Jeder regulaere Button bekommt einen EventListener und schreibt innerText in inputString
document.querySelectorAll(".entity").forEach((item) => {
  item.addEventListener("click", (event) => {
    pressed(item.innerText);
  });
});

document.addEventListener("keydown", logKey); // Tastendruck EventListener

function logKey(e) {
  let regex = /[\d\+\(\)\.\^\/]/g; // der RegExAusdruck der gueltigen Tasten
  if (e.key.match(regex)) {
    // Stimmt Regex mit aktuellen Tastendruck ueberein, ...
    pressed(e.key); //... dann wird Tastensymbol in INputString geschrieben
  }
  if (e.key === "Enter") {
    solve(); // Bei Enter wird geloest
  }
  if (e.key === ",") {
    pressed("."); // Bei Komma wird ein Punkt eingefuegt, wegen Math.js
  }
  if (e.key === "*") {
    pressed("×"); // Bei * wird ein × eingefuegt
  }
  if (e.key === "-") {
    pressed("−"); // bei einem Bindestrich wird ein Minus eingefuegt
  }
  if (e.key === "Backspace") {
    rem(); // Backspace loescht das letzte Zeichen
  }
}

//
// Die Funktionen
//

// Bildschirm aus und Scrollt zum letzten Zeichen horizontal
const render = (e) => {
  let screen = document.getElementById("input_screen");
  screen.innerText = e;
  screen.scrollTo({ left: 4000, behavior: "smooth" }); // scrolle die Ausgabe ganz nach rechts
};

// DIese Funktion fuegt einen Charachter an den InputString an und triggert das Rendern
const pressed = (char) => {
  input_string += char;
  render(input_string);
};

const history_update = (aufg, lsg) => {
  history.push(aufg);
  history.push(lsg);
  let div = document.createElement("div");
  document
    .getElementById("history")
    .prepend(aufg + " = " + lsg, div);
    document
    .getElementById("history").scrollTo({ top: 0, behavior: "smooth" }); // scrolle die Ausgabe ganz nach oben

};

const rem = () => {
  input_string = input_string.slice(0, -1);
  render(input_string);
};

const evalFormat = (aufg) => {
  let asci_string = entity2asci(aufg)
  let result = math.evaluate(asci_string);
  return result;
};

// Da die Button immer eine Entity
const entity2asci = (entity) => {
  let asci_times = entity.replaceAll("×","*");
  let asci_string = asci_times.replaceAll("−","-");
  return asci_string;
};

const solve = () => {

  let lsg = evalFormat(input_string);
  history_update(input_string, lsg);
  render(lsg);
  input_string = "";
};

const clear = () => {
  input_string = " ";
  render(input_string);
};

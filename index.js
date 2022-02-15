//Variables
let screen = document.getElementById("input_screen");
let history_screen = document.getElementById("history");
let input = [];
let history = [];
//EventListener
//Number + / %
let num_btns = document.querySelectorAll(".num");
num_btns.forEach((item) => {
  item.addEventListener("click", (event) => {
    pressed(item.innerText);
  });
});

//times
let times_btn = document.querySelectorAll(".times")[0];
times_btn.addEventListener("click", () => pressed("*"));

//Bracket open
let bracket_btn_open = document.querySelectorAll(".bracket")[0];
bracket_btn_open.addEventListener("click", () => pressed("("));

//Bracket close
let bracket_btn_close = document.querySelectorAll(".bracket")[1];
bracket_btn_close.addEventListener("click", () => pressed(")"));

//substract
let sub_btn = document.querySelectorAll(".minus")[0];
sub_btn.addEventListener("click", () => pressed("-"));

//Remove Button
let rem_btn = document.getElementsByClassName("rem")[0];
rem_btn.addEventListener("click", () => rem());

//eqn Button
let eqn_btn = document.getElementsByClassName("eqn")[0];
eqn_btn.addEventListener("click", () => solve());

// AC Button
let ac_btn = document.getElementsByClassName("ac")[0];
ac_btn.addEventListener("click", () => clear());

// KeyDown
document.addEventListener("keydown", logKey);

//Functions
function pressed(num) {
  input.push(num);
  update_inputscreen();
}

function update_inputscreen() {
  let string = input.toString();
  let withoutCommas = string.replaceAll(",", "");
  let formatTimesSign = withoutCommas.replaceAll("*", "×");
  let formatMinusSign = formatTimesSign.replaceAll("-", "−");
  screen.innerText = formatMinusSign;
  
}

function update_historyscreen() {
  let string = history.slice(-1).toString();
  let withoutCommas = string.replaceAll(",", "");
  let result = math.evaluate(withoutCommas);
  let formated_result = math.format(result, {lowerExp: -6, upperExp: 6});
  let complete_string = withoutCommas + "=" + formated_result;
  let formatTimesSign = complete_string.replaceAll("*", "×");
  let formatMinusSign = formatTimesSign.replaceAll("-", "−");
  let div = document.createElement("div");
  history_screen.prepend(formatMinusSign, div);
}

function rem() {
  input.pop();
  update_inputscreen();
}

function solve() {
  let string = input.toString();
  let withoutCommas = string.replaceAll(",", "");
  let result = math.evaluate(withoutCommas);
  let format = math.format(result, {lowerExp: -6, upperExp: 6})
  if (format === undefined) format = "error";
  screen.innerText = format;
  history.push(withoutCommas);
  update_historyscreen();
  input = [];
}

function clear() {
  input = [];
  update_inputscreen();
}

function logKey(e) {
  let regex = /[\d\+\-\*\(\)]/g;
  if (e.key.match(regex)) {
    pressed(e.key);
  }
  if (e.key === "Enter") {
    solve();
  }
  if (e.key === "Backspace") {
    rem();
  }
}

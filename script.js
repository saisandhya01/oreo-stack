const imageMapping = {
  0: "topo.png",
  1: "re1.png",
  2: "bottomo.png",
};
function generate() {
  let inputString = document.getElementById("string").value;
  console.log(inputString);
  var stackArray = [];
  for (let i = 0; i < inputString.length; i++) {
    if (inputString[i] === "o") {
      if (i === 0) {
        stackArray.push(0);
      } else if (i === inputString.length - 1) {
        stackArray.push(2);
      } else {
        stackArray.push(0);
      }
    } else if (inputString[i] === "r") {
      if (inputString[i + 1] === "e") {
        stackArray.push(1);
        i = i + 1;
      }
    }
  }
  makeStack(stackArray);
}
let container = document.getElementById("main");
function makeStack(array) {
  let constant = 43 * (array.length - 1);
  let height = 59 * array.length;
  let stack = document.createElement("div");
  stack.classList.add("stack");
  container.appendChild(stack);
  for (let i = 0; i < array.length; i++) {
    if (array[i] !== "&") {
      let image = document.createElement("img");
      image.setAttribute("src", imageMapping[array[i]]);
      image.classList.add("adjust" + i);
      image.style.position = "relative";
      let value = constant - i * 43;
      image.style.bottom = i * 43 + "px";
      image.style.zIndex = value;
      stack.appendChild(image);
    }
  }
  stack.setAttribute("height", `${height} !important`);
}

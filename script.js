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

let j = 0;
let container = document.getElementById("main");

function makeStack(array) {
  let constant = 43 * (array.length - 1);
  let height = 0.48 * 59 * array.length;
  let stack = document.createElement("div");
  stack.classList.add("stack" + j);
  stack.id = "stack" + j;
  stack.setAttribute("draggable", "true");
  stack.ondragstart = (ev) => {
    ev.dataTransfer.setData("text", ev.target.id);
  };
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
  stack.style.border = "1px solid black";
  stack.style.width = "110px";
  stack.style.margin = "5px";
  stack.style.height = `${height}px`;
  stack.style.position = "relative";
  let resizer = document.createElement("div");
  resizer.id = "resizer" + j;
  resizer.style.position = "absolute";
  resizer.style.right = "0px";
  resizer.style.bottom = "0px";
  stack.appendChild(resizer);
  resizeOption(stack, resizer);
  j = j + 1;
}

function allowDrop(ev) {
  ev.preventDefault();
}

function drop(ev) {
  ev.preventDefault();
  var id = ev.dataTransfer.getData("text");
  const draggableElement = document.getElementById(id);
  const dropzone = event.target;
  dropzone.appendChild(draggableElement);
}
function resizeOption(stack, resizer) {
  resizer.style.width = "10px";
  resizer.style.height = "10px";
  resizer.style.background = "red";
  resizer.style.cursor = "se-resize";
  resizer.addEventListener("mousedown", initResize, false);

  function initResize(e) {
    window.addEventListener("mousemove", Resize, false);
    window.addEventListener("mouseup", stopResize, false);
  }
  function Resize(e) {
    stack.style.width = e.clientX - stack.offsetLeft + "px";
    stack.style.height = e.clientY - stack.offsetTop + "px";
    let images = stack.getElementsByTagName("img");
    for (let i = 0; i < images.length; i++) {
      images[i].style.width = e.clientX - stack.offsetLeft + "px";
      images[i].style.height = e.clientY - stack.offsetTop + "px";
    }
  }
  function stopResize(e) {
    window.removeEventListener("mousemove", Resize, false);
    window.removeEventListener("mouseup", stopResize, false);
  }
}

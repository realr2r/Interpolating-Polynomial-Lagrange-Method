let pointsInput = document.querySelector(".points-input");
let template = document.querySelector("template");
let pointsContainer = document.querySelector(".points-container");
let solveBtn = document.querySelector(".solve-btn");
let interpolationPoint = document.querySelector(".x-value");

let finalAnswerContainer = document.querySelector(".final-answer-container")


window.addEventListener("load", () => {
    createPoints(Number(pointsInput.value));
})

pointsInput.addEventListener("change", () => {
    pointsContainer.innerHTML = "";

    let nOP = Number(pointsInput.value);
    createPoints(nOP);
})

let n = 0;
let xvalues = [];
let yvalues = [];
let iP = 0;

solveBtn.addEventListener("click", () => {
    grabAllValues();
    let finalAns = lagrange(n, xvalues, yvalues, iP);
    finalAnswerContainer.innerText = `$$f(${iP}) = ${finalAns}$$`;
    MathJax.typeset();
})

function createPoints(n) {
    for (let i = 0; i < n; i++) {
        let clone = template.content.cloneNode(true);
        let _pointsInput = clone.querySelectorAll("input");
        _pointsInput[0].placeholder = `x${i}`;
        _pointsInput[1].placeholder = `y${i}`;

        pointsContainer.appendChild(clone);
    }
}

function grabAllValues() {
    let points = pointsContainer.querySelectorAll(".point");
    n = points.length;

    points.forEach((point) => {
        let values = point.querySelectorAll("input");
        xvalues.push(values[0].value);
        yvalues.push(values[1].value);
    })

    iP = Number(interpolationPoint.value);

    console.log("n: " + n);
    console.log(xvalues);
    console.log(yvalues);
    console.log("iP: " + iP);
}

function lagrange(n, xvalues, yvalues, iP) {
    let yp = 0;

    for (let i = 0; i < n; i++) {
        let p = 1;
        for (let j = 0; j < n; j++) {
            if (i != j) {
                p *= ((iP - xvalues[j]) / (xvalues[i] - xvalues[j]));
            }
        }
        yp += (p * yvalues[i]);
    }
    return yp;
}

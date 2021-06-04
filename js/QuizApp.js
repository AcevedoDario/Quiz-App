//Seleccion de elementos
const start = document.getElementById("start");
const quiz = document.getElementById("quiz");
const question = document.getElementById("question");
const qImg = document.getElementById("qImg");
const choiceA = document.getElementById("A");
const choiceB = document.getElementById("B");
const choiceC = document.getElementById("C");
const counter = document.getElementById("counter");
const timeGauge = document.getElementById("timeGauge");
const progress = document.getElementById("progress");
const scoreDiv = document.getElementById("score");

//crear preguntas
let questions = [
    {
        question : "¿Cuántas horas hay en un año bisiesto?",
        imgSrc : "../img/q1.png",
        choiceA : "Wrong", //8760 Hs.
        choiceB : "Wrong", //8736 Hs.
        choiceC : "Correct", //8784 Hs.
        correct : "C"
    },{
        question : "¿En qué provincia de Argentina se encuentra el Aconcagua?",
        imgSrc : "../img/q2.png",
        choiceA : "Wrong", //Neuquen
        choiceB : "Correct",//Mendoza
        choiceC : "Wrong", //San Juan
        correct : "B"
    },{
        question : "¿Que avenida es la mas larga?",
        imgSrc : "../img/q3.png",
        choiceA : "Wrong",
        choiceB : "Correct",
        choiceC : "Wrong",
        correct : "B"
    }
];

//Creacion de variables
const lastQuestion = questions.length - 1;
let runningQuestion = 0;
let count = 0;
const questionTime = 10;
const gaugeWidth = 150;
const gaugeUnit = gaugeWidth / questionTime;
let TIMER;

//Renderizar pregunta
function renderQuestion(){
    let q = questions[runningQuestion];

    question.innerHTML = "<p>"+ q.question +"</p>";
    qImg.innerHTML = "<img src="+ q.imgSrc +">";
    choiceA.innerHTML = q.choiceA;
    choiceB.innerHTML = q.choiceB;
    choiceC.innerHTML = q.choiceC;
}

start.addEventListener("click", startQuiz);

//start quiz
function startQuiz(){
    start.style.display = "none";
    renderQuestion();
    quiz.style.display = "block";
    renderProgress();
    renderCounter()
    TIMER = setInterval(renderCounter,1000); //1 segundo entre los numeros del contador
}


//Renderisar progreso
function renderProgress(){
    for(let qIndex = 0; qIndex <= lastQuestion; qIndex++ ){
        progress.innerHTML += "<div class='prog' id="+ qIndex +"</div>";
    }
}

//Renderizar contador
function renderCounter(){
    if(count <= questionTime){
        counter.innerHTML = count;
        timeGauge.style.width = count * gaugeUnit +"px";
        count++
    }else{
        count = 0
    }
}

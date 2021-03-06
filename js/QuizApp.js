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
const scoreDiv = document.getElementById("scoreContainer");

//crear preguntas
let questions = [
    {
        question : "¿Cuántas horas hay en un año bisiesto?",
        imgSrc : "../img/q1.png",
        choiceA : "8760 Hs.",
        choiceB : "8736 Hs.",
        choiceC : "8764 Hs.",
        correct : "C"
    },{
        question : "¿En qué provincia de Argentina se encuentra el Aconcagua?",
        imgSrc : "../img/q2.png",
        choiceA : "San Juan",
        choiceB : "Mendoza",
        choiceC : "Neuquen",
        correct : "B"
    },{
        question : "¿Que avenida es la mas larga?",
        imgSrc : "../img/q3.png",
        choiceA : "Av. 9 de Julio",
        choiceB : "Av. Rivadavia",
        choiceC : "Av. H. Irigoyen",
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
let score = 0;

//Renderizar pregunta
function renderQuestion(){
    let q = questions[runningQuestion];

    question.innerHTML = "<p>"+ q.question +"</p>";
    qImg.innerHTML = "<img src="+ q.imgSrc +">";
    choiceA.innerHTML = q.choiceA;
    choiceB.innerHTML = q.choiceB;
    choiceC.innerHTML = q.choiceC;
}

start.addEventListener("click",startQuiz);

//start quiz
function startQuiz(){
    start.style.display = "none";
    renderQuestion();
    quiz.style.display = "block";
    renderProgress();
    renderCounter();
    TIMER = setInterval(renderCounter,1000); //1 segundo entre los numeros del contador
}

//Renderisar progreso
function renderProgress(){
    for(let qIndex = 0; qIndex <= lastQuestion; qIndex++ ){
        progress.innerHTML += "<div class='prog' id="+ qIndex +"></div>";
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
        answerIsWrong();
        if(runningQuestion < lastQuestion){
            runningQuestion++;
            renderQuestion();
        }else{
            //terminar el quiz
            clearInterval(TIMER);
            renderScore();
        }
    }
}

//Check de respuestas
function checkAnswer(answer){
    if(answer == questions[runningQuestion].correct){
        // answer is correct
        score++;
        // change progress color to green
        answerIsCorrect();
    }else{
        // answer is wrong
        // change progress color to red
        answerIsWrong();
    }
    count = 0;
    if(runningQuestion < lastQuestion){
        runningQuestion++;
        renderQuestion();
    }else{
        //terminar y mostrar puntaje
        clearInterval(TIMER);
        scoreRender();
    }
}

// answer is correct
function answerIsCorrect(){
    document.getElementById(runningQuestion).style.backgroundColor = "#0f0";
}

// answer is Wrong
function answerIsWrong(){
    document.getElementById(runningQuestion).style.backgroundColor = "#f00";
}

//Renderizar score
function scoreRender(){
    scoreDiv.style.display = "block";

    //calcular porcentaje de aciertos
    const scorePerCent = Math.round(100 * score/questions.length);

    //elegir imagen a mostrar segun el puntaje obtenido
    let img = (scorePerCent >= 80) ? "../img/5.png" :
              (scorePerCent >= 60) ? "../img/4.png"  :
              (scorePerCent >= 40) ? "../img/3.png"      :
              (scorePerCent >= 20) ? "../img/2.png"       :
              "../img/1.png";
    
    scoreDiv.innerHTML = "<img src ="+ img +">";
    scoreDiv.innerHTML += "<p>"+ scorePerCent +"</p>";
}
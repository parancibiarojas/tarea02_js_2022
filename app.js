let elQuestionScreen = document.getElementById("questionscreen")
let elScreenResult = document.getElementById("resultscreen")
let elWelcomeScr = document.getElementById("welcomescreen")
let elResumenScr = document.getElementById("resumenscreen")
let nombreUsuario = ''

nombreUsuario = document.getElementById("username_id").value

let resumen_data = []
let resumen_data_general = []
console.log(resumen_data)

function Quiz() {
    this.questions = []   // Traigo el Array con la Data 

    this.counter = 0
    this.indexCurrentQuestion = 0
    this.addQuestion = function(question) {
        this.questions.push(question)
    }

    this.showCurrentQuestion = function() {
        if (this.indexCurrentQuestion < this.questions.length) {
            this.questions[this.indexCurrentQuestion].getElement()  // recupera dato del array[x]
            console.log("Soy this.indexCurrentQuestion Despues: " + this.indexCurrentQuestion)
        } else {
            elQuestionScreen.classList.add('hidden')                                // --
                                                                                    //
            let elCorrectAnswers = document.querySelector("#correctAnswers")        //  -->> Activa Ventana de Resultados
            elCorrectAnswers.innerHTML = quiz.counter                               // 
                
            // --- Elimina data del Array[resumen_data] y Suma data al Array[resumen_data_general]  
            resumen_data[0] = document.getElementById("username_id").value

            resumen_data_general.push(resumen_data)
            resumen_data = []
            nombreUsuario = ""
            console.log(resumen_data)
            console.log('Data_General_Usuarios: ' + resumen_data_general)
            // elScreenResult.classList.add('block')                                //
            elScreenResult.style.display = "block"                                  // --
        }
    }
}


function Question(numeroPregunta, title, answers, correctAnswer, condicionante, numeroCondicionante) {
    this.title = title
    this.answers = answers
    this.correctAnswer = correctAnswer
    this.condicionante = condicionante
    this.numeroPregunta = numeroPregunta
    this.numeroCondicionante = numeroCondicionante

//  console.log("SOY CONDICIONANTE: " + this.condicionante)

    this.getBody = function() {
        let body = this.title.toUpperCase() + '\n'
        for (let i=0; i<this.answers.length; i++) {
             body += (i+1) + '. ' + this.answers[i] + '\n'
        }
        return body
    }
    this.addAnswer = function(answer) {
        // this.answers[this.answers.length] = answer
        this.answers.push(answer)
    }

    this.getElement = function() {

        // Suma Nombre de Usuario
        let questionNombreUsuario = document.createElement("h2")
        questionNombreUsuario.textContent = 'Usuario: '+nombreUsuario
        elQuestionScreen.append(questionNombreUsuario)


        // Suma el Titulo  
        let questionNumber = document.createElement("h2")
        questionNumber.textContent = "Pregunta " + this.numeroPregunta  + " / " + "20"
        elQuestionScreen.append(questionNumber)

        // Suma la Pregunta
        let questionTitle = document.createElement("h3")
        questionTitle.textContent = this.title
        elQuestionScreen.append(questionTitle)

        // Valor para ver si es --->>> Pregunta Condicionante
        let questionCondicionante = document.createElement("h3")
        questionCondicionante.textContent = this.condicionante
        elQuestionScreen.append(questionCondicionante)

        // crea el Encabezado de la lista en Html
        let questionAnswers = document.createElement("ul")
        questionAnswers.classList.add("question__awswers")

        // las opciones estan en this.answers   y lo maneja como "answer" dentro del ciclo forEach
        this.answers.forEach((answer, index) => {
            let elAnswer = document.createElement("li")
            elAnswer.classList.add("awswer")
            elAnswer.textContent = answer
            elAnswer.id = index+1
            elAnswer.addEventListener("click", this.checkAnswer)
            questionAnswers.append(elAnswer)
        })

        elQuestionScreen.append(questionAnswers)
    }

    this.checkAnswer = (event) => {
        let anwserSelected = event.target
    //  console.log(event.target)
    //  console.log(anwserSelected)
        resumen_data[this.numeroPregunta] = anwserSelected.id
 
        //  console.log(anwserSelected)
        if (this.isCorrectAnswer(anwserSelected.id)) {
            anwserSelected.classList.add('answer--correct')
            quiz.counter++
        } else {
            anwserSelected.classList.add('answer--wrong')
            let elCorrectAnswer = document.getElementById(this.correctAnswer)
            elCorrectAnswer.classList.add('answer--correct')
        }

        //Preguntas Condicionante
        if (condicionante === true && (this.isCorrectAnswer(anwserSelected.id)) ) {
//          console.log('Soy condicionante y correcta')

            quiz.indexCurrentQuestion= this.numeroCondicionante;
            quiz.indexCurrentQuestion--;
            setTimeout(function() {
                elQuestionScreen.textContent = ''
                quiz.showCurrentQuestion()
            }, 1000)
        }
         else {                 
//          console.log('Nose si Soy condicionante y Nose si soy correcta')

        setTimeout(function() {
            elQuestionScreen.textContent = '';
            quiz.indexCurrentQuestion++;
            quiz.showCurrentQuestion()
        }, 1000)}
    }
 
    this.isCorrectAnswer = function(userAnswer) {
        if (this.correctAnswer == userAnswer) return true
        else return false
    }

}
function conditionalQuestion() {
    
}

let question1 = new Question(1, '¿La calidad del producto o servicio es la esperada?', ["Si", "No", "Quizás", "Nunca"], 1, true, 3)
let question2 = new Question(2, '¿Repetiría la experiencia de compra?', ["Si", "No", "Quizás", "Nunca"], 1, false, 4)
let question3 = new Question(3, '¿Nos recomendaría a sus amigos o familiares?', ["Si", "No", "Quizás", "Nunca"], 1, false, 0)
let question4 = new Question(4, '¿Ha tenido algún problema en el proceso de compra?', ["Si", "No", "Quizás", "Nunca"], 1, true, 6)

let question5 = new Question(5, '¿Cuántas veces ha utilizado el producto o servicio?', ["Si", "No", "Quizás", "Nunca"], 1, false, 0)
let question6 = new Question(6, '¿Cuánto tiempo hace que conoce nuestra empresa? ¿Desde cuándo es nuestro cliente?', ["Si", "No", "Quizás", "Nunca"], 1, false, 0)
let question7 = new Question(7, '¿Qué le ha parecido la relación entre la calidad ofrecida y el precio?', ["Si", "No", "Quizás", "Nunca"], 1,true, 9)
let question8 = new Question(8, '¿Con qué frecuencia se puede permitir comprar nuestro producto o servicio?', ["Si", "No", "Quizás", "Nunca"], 3, false, 0)
let question9 = new Question(9, '¿Volvería a invertir su dinero en nuestros productos o servicios?', ["Si", "No", "Quizás", "Nunca"], 1, false, 0)
let question10 = new Question(10, '¿Es nuestra marca la primera que tiene en mente en nuestro sector?', ["Si", "No", "Quizás", "Nunca"], 1, true, 18)
let question11 = new Question(11, '¿Cómo valora usted la relación calidad-precio?', ["Si", "No", "Quizás", "Nunca"], 1, false, 0)
let question12 = new Question(12, '¿Cómo valora usted la atención recibida?', ["Si", "No", "Quizás", "Nunca"], 1, true, 0)
let question13 = new Question(13, '¿Cómo ha sido tratado?', ["Si", "No", "Quizás", "Nunca"], 1, 0, 0)
let question14 = new Question(14, '¿Considera suficientes los conocimientos de la persona que le ha atendido?', ["Si", "No", "Quizás", "Nunca"], 1, false, 0)
let question15 = new Question(15, '¿Le ha inspirado confianza la atención recibida?', ["Si", "No", "Quizás", "Nunca"], 1, false, 0)
let question16 = new Question(16, '¿La persona que le ha atendido ha comprendido sus necesidades?', ["Si", "No", "Quizás", "Nunca"], 1, false, 0)
let question17 = new Question(17, '¿Añadiría alguna pregunta a esta encuesta de satisfacción?', ["Si", "No", "Quizás", "Nunca"], 1, true, 0)
let question18 = new Question(18, 'Aproveche este apartado para comunicarnos cualquier tema que considere relevante y sobre el cual no ha sido preguntado.', ["Si", "No", "Quizás", "Nunca"], 1, false, 0)
let question19 = new Question(19, '¿Tiene alguna sugerencia adicional sobre nuestro producto o servicio?', ["Si", "No", "Quizás", "Nunca"], 1, false, 0)
let question20 = new Question(20, '¿Tiene alguna sugerencia sobre la encuesta?', ["Si", "No", "Quizás", "Nunca"], 1, false, 0)


let quiz = new Quiz()
quiz.addQuestion(question1)
quiz.addQuestion(question2)
quiz.addQuestion(question3)
quiz.addQuestion(question4)

quiz.addQuestion(question5)
quiz.addQuestion(question6)
quiz.addQuestion(question7)
quiz.addQuestion(question8)
quiz.addQuestion(question9)
quiz.addQuestion(question10)

quiz.addQuestion(question11)
quiz.addQuestion(question12)
quiz.addQuestion(question13)
quiz.addQuestion(question14)
quiz.addQuestion(question15)
quiz.addQuestion(question16)
quiz.addQuestion(question17)
quiz.addQuestion(question18)
quiz.addQuestion(question19)
quiz.addQuestion(question20)

let elNumberOfQuestions = document.querySelectorAll(".numberOfQuestions")

elNumberOfQuestions.forEach(function(elnumberofquestions) {
    elnumberofquestions.textContent = quiz.questions.length
})

// Puntapie Inicial ...!! en el Codigo.. 
// -------------------------------------
function seeFirstQuestion() {
    
   //  elWelcomeScr.style.display = "block"

    // con este suma una class 
  //  let userName = document.getElementById("username").value;
   // console.log(userName);
    //elWelcomeScr.classList.add('hidden')
    elQuestionScreen.textContent = ''

    elWelcomeScr.style.display = "none"

//  elQuestionScreen.classList.add('block')                                // --

    elQuestionScreen.style.display = "block"

    quiz.showCurrentQuestion()
}

function seeEncuestas() {
    
    elWelcomeScr.style.display = "none"
    elScreenResult.style.display = "none"
    elResumenScr.style.display = "block"

    // -- 2 DETALLE DE LA DATA

    console.log('Valor de Array : ' + resumen_data_general)
    console.log('Largo de Array : ' + resumen_data_general.length)
    
    let tr = document.createElement("tr");

    var tituloArray = ['Nombre', 'P1', 'P2', 'P3', 'P4', 'P5', 'P6', 'P7','P8','P9','P10','P11','P12','P13','P14','P15','P16','P17','P18','P19','P20'];
        tituloArray.forEach( function(valor, indice, array) {
            th = document.createElement("th");
            thText = document.createTextNode(tituloArray[indice]);
            th.appendChild(thText);
            tr.appendChild(th);
        });

    tabla.appendChild(tr);
    
    for (i=0;i<resumen_data_general.length;i++){ 
        tr = document.createElement("tr");
 
            for (j=0;j<21;j++) {

                if (typeof resumen_data_general[i][j] === 'undefined') {
                    
                    td = document.createElement("td");
                    tdText = document.createTextNode('-');
                    td.appendChild(tdText);
                    tr.appendChild(td);
    
                 } else {
                    td = document.createElement("td");
                    tdText = document.createTextNode(resumen_data_general[i][j]);
                    td.appendChild(tdText);
                    tr.appendChild(td);
                 }
            } 
        tabla.appendChild(tr);

    }

    // -- 2

    // -- MUestra Total
    elResumenScr.appendChild(tabla);

}

function seeInicio() {
    
    elResumenScr.style.display = "none"
    elScreenResult.style.display = "none"
    elWelcomeScr.style.display = "block"
    quiz.indexCurrentQuestion = 0

}

function seeInicioDos() {
    
    elResumenScr.style.display = "none"
    elScreenResult.style.display = "none"
    elWelcomeScr.style.display = "block"
    let tabla=document.querySelector("table#tabla")
    tabla.textContent=""

 // elResumenScr.textContent = ""
 }

// -------------------------

    let tituloResumen = document.createElement("h2")
    tituloResumen.textContent = "Resumen de Encuestas" 
    elResumenScr.append(tituloResumen)

    const tabla = document.createElement("table");
    tabla.setAttribute("border", "1");
    tabla.id = "tabla"; 

 

// -------------------------


let elWelcomeBtn = document.getElementById("welcome_btn")
elWelcomeBtn.addEventListener("click", seeFirstQuestion)

let elResumenBtn = document.getElementById("resumen_btn")
elResumenBtn.addEventListener("click", seeEncuestas)

let elInicioBtn = document.getElementById("inicio_btn")
elInicioBtn.addEventListener("click", seeInicio)

let elInicioBtnregresar = document.getElementById("regresar_btn")
elInicioBtnregresar.addEventListener("click", seeInicioDos)



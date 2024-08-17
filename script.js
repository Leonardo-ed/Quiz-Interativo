const questions = [
    { question: "Qual é o nome da escola de magia que Harry Potter frequenta?", options: ["Beauxbatons", "Durmstrang", "Hogwarts", "Ilvermorny", "Castelobruxo"], answer: "Hogwarts" },
    { question: "Quem é o diretor da escola de Hogwarts durante a maior parte da série?", options: ["Gellert Grindelwald", "Severus Snape", "Albus Dumbledore", "Minerva McGonagall", "Phineas Nigellus Black"], answer: "Albus Dumbledore" },
    { question: "Qual é o nome da escola de magia rival de Hogwarts localizada na Escandinávia?", options: ["Beauxbatons", "Durmstrang", "Ilvermorny", "Castelobruxo", "Brizzyhorn"], answer: "Durmstrang" },
    { question: "Qual é o nome da poção que permite ao usuário assumir a forma de outra pessoa?", options: ["Amortentia", "Felix Felicis", "Veritaserum", "Porção Polisuco", "Elixir da Longa Vida"], answer: "Porção Polisuco" },
    { question: "Qual é o nome do elfo doméstico que serve a família Black e mais tarde é libertado por Hermione Granger?", options: ["Kreacher", "Dobby", "Winky", "Hokey", "S.P.E.W."], answer: "Kreacher" },
    { question: "Qual é o nome do guardião das Chaves e das Terras de Hogwarts?", options: ["Rubeus Hagrid", "Argus Filch", "Fawkes", "Fluffy", "Griphook"], answer: "Rubeus Hagrid" },
    { question: "Qual é a posição que Harry Potter joga no time de Quadribol de Gryffindor?", options: ["Batedor", "Artilheiro", "Apanhador", "Goleiro", "Capitão"], answer: "Apanhador" },
    { question: "Qual é o nome do autor dos livros 'Animais Fantásticos e Onde Habitam'?", options: ["Gellert Grindelwald", "Newt Scamander", "Albus Dumbledore", "Bathilda Bagshot", "Sirius Black"], answer: "Newt Scamander" },
    { question: "Qual é a relação entre Draco Malfoy e Lucius Malfoy?", options: ["Pai e filho", "Irmãos", "Primo e primo", "Amigo e inimigo", "Mentor e aprendiz"], answer: "Pai e filho" }
];

let currentQuestionIndex = 0;
let correctAnswers = 0;
let incorrectAnswers = 0;
let wrongQuestions = []; // Array para armazenar perguntas erradas
let timer;
let timeRemaining = 60; // Tempo total em segundos

function displayQuestion(index) {
    const questionContainer = document.getElementById('question-container');
    const question = questions[index];

    questionContainer.innerHTML = `
        <div class="question">${question.question}</div>
        <div class="options">
            ${question.options.map((option, i) => `
                <label>
                    <input type="radio" name="answer" value="${option}" id="option${i}" />
                    <span>${String.fromCharCode(65 + i)}. ${option}</span>
                </label>
            `).join('')}
        </div>
    `;
}

function nextQuestion() {
    const selectedOption = document.querySelector('input[name="answer"]:checked');
    if (!selectedOption) {
        alert('Selecione uma resposta, trouxa!');
        return;
    }

    const answer = selectedOption.value;
    if (answer === questions[currentQuestionIndex].answer) {
        correctAnswers++;
    } else {
        incorrectAnswers++;
        wrongQuestions.push({
            question: questions[currentQuestionIndex].question,
            correctAnswer: questions[currentQuestionIndex].answer,
            selectedAnswer: answer
        });
    }

    if (currentQuestionIndex < questions.length - 1) {
        currentQuestionIndex++;
        displayQuestion(currentQuestionIndex);
    } else {
        showResult();
    }
}

function showResult() {
    clearInterval(timer); // Parar o timer quando o resultado for mostrado

    const questionContainer = document.getElementById('question-container');
    questionContainer.innerHTML = `
        <h2>Quiz Concluído!</h2>
        <p>Obrigado por participar do quiz. Você completou todas as perguntas!</p>
        <p>Acertos: ${correctAnswers}</p>
        <p>Erros: ${incorrectAnswers}</p>
    `;

    if (wrongQuestions.length > 0) {
        const wrongQuestionsHTML = wrongQuestions.map((item, index) => `
            <div class="wrong-question">
                <p><strong>Pergunta ${index + 1}:</strong> ${item.question}</p>
                <p><strong>Resposta Correta:</strong> ${item.correctAnswer}</p>
                <p><strong>Você respondeu:</strong> ${item.selectedAnswer}</p>
            </div>
        `).join('');

        questionContainer.innerHTML += `
            <h3>Perguntas que você errou:</h3>
            ${wrongQuestionsHTML}
        `;
    }
}

function startTimer() {
    timer = setInterval(() => {
        const timerElement = document.getElementById('timer');
        if (timeRemaining <= 0) {
            clearInterval(timer);
            alert('Tempo esgotado!');
            showResult();
            return;
        }
        timeRemaining--;
        timerElement.textContent = `Tempo Restante: ${timeRemaining}s`;
    }, 1000);
}

document.getElementById('next-button').addEventListener('click', nextQuestion);

// Inicializar a primeira pergunta e o timer
displayQuestion(currentQuestionIndex);
startTimer();

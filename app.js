// создаем массив с контентом вопросов и правильным ответом
const quizData = [
    {
        question: "Which language runs in a web browser?",
        a: "Java",
        b: "C",
        c: "Python",
        d: "JavaScript",
        correct: "d",
    },
    {
        question: "What does CSS stand for?",
        a: "Central Style Sheets",
        b: "Cascading Style Sheets",
        c: "Cascading Simple Sheets",
        d: "Cars SUVs Sailboats",
        correct: "b",
    },
    {
        question: "What does HTML stand for?",
        a: "Hypertext Markup Language",
        b: "Hypertext Markdown Language",
        c: "Hyperloop Machine Language",
        d: "Helicopters Terminals Motorboats Lamborginis",
        correct: "a",
    },
    {
        question: "What year was JavaScript launched?",
        a: "1996",
        b: "1995",
        c: "1994",
        d: "none of the above",
        correct: "b",
    },
];

// создаем переменную для каждого html элемента формы

// сам контейнер, который потребуется нам для создания финального окна с результатами
const quiz = document.getElementById('quiz')
// все input ответов чтобы сохранять результат каждого ответа после сабмита а также для очистки выбранного ответа в следующем вопросе
const answerEls = document.querySelectorAll('.answer')
// заголовок, чтобы подставлять текст заголовка из массива
const questionEl = document.getElementById('question')
// лейблы варианта ответов, чтобы подставлять их из массива
const a_text = document.getElementById('a_text')
const b_text = document.getElementById('b_text')
const c_text = document.getElementById('c_text')
const d_text = document.getElementById('d_text')
// кнопка подтверждения, чтобы повесить на него эвент листенер, переходить к следующему вопросу и перезапускать квиз
const submitBtn = document.getElementById('submit')

// currentQuiz используем для индексации по массиву
let currentQuiz = 0
// score используем для подсчета очков за правильные ответы
let score = 0

// функция, которая выбирает набор контента по индексу и подставлят контент вопросов и ответов
loadQuiz()


function loadQuiz() {
    deselectAnswers()
    const currentQuizData = quizData[currentQuiz]

    questionEl.innerText = currentQuizData.question
    a_text.innerText = currentQuizData.a
    b_text.innerText = currentQuizData.b
    c_text.innerText = currentQuizData.c
    d_text.innerText = currentQuizData.d
}

// функция которая очищает radiobutton от выделения на предыдущем вопросе
function deselectAnswers() {
    answerEls.forEach(answerEl => answerEl.checked = false)
}

// возвращаем айдишник выбранного элемента из html, чтобы использовать его для сравнения с правильным ответом
function getSelected(){
    let answer

    answerEls.forEach(answerEl => {
        if(answerEl.checked){
            answer = answerEl.id
        }
    })

    return answer
}

// вешаем эвент на кнопку который считает очки, обновляет индекс для прогрузки контента следующего вопроса, загружает контент следующего вопроса, и если вопросы кончились то показывает финальный экран и кнопку перезапуска квиза
submitBtn.addEventListener('click', () => {
    const answer = getSelected()
    
    if(answer) {
        if(answer === quizData[currentQuiz].correct) {
            score++
        }

        currentQuiz++

        if(currentQuiz < quizData.length){
            loadQuiz()
        } else {
            quiz.innerHTML = `
            <h2> You answered ${score}/${quizData.length} questions correctly </h2>

            <button onclick="location.reload()">Reload</button>
            `
        }
    }
})

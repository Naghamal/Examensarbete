// Användardata för inloggning
const userData = {
    username: "user",
    password: "password"
};

// Funktion för att hantera inloggning
document.getElementById("loginForm").addEventListener("submit", function (event) {
    event.preventDefault();
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;
    if (username === userData.username && password === userData.password) {
        document.getElementById("loginSection").style.display = "none";
        document.getElementById("optionsSection").style.display = "flex";
    } else {
        alert("Fel användarnamn eller lösenord!");
    }
});

// Funktion för att visa testalternativ
function showTestOptions() {
    hideAllSections();
    document.getElementById("testOptions").style.display = "block";
}

// Funktion för att visa quizalternativ
function showQuizOptions() {
    hideAllSections();
    document.getElementById("quizOptions").style.display = "block";
}

// Funktion för att starta test
function startTest() {
    hideAllSections();
    document.getElementById("testSection").style.display = "block";
    renderTestQuestions();
}

// Funktion för att starta quiz
function startQuiz() {
    hideAllSections();
    document.getElementById("quizSection").style.display = "block";
    renderQuizQuestions();
}

// Funktion för att skicka in testresultat
function submitTest() {
    // Lägg till logik för att hantera testresultat här
}

// Funktion för att skicka in quizresultat
function submitQuiz() {
    // Lägg till logik för att hantera quizresultat här
}

// Funktion för att visa diagram
function showCharts() {
    hideAllSections();
    document.getElementById("charts").style.display = "block";
    drawTestChart();
}

// Funktion för att rita testresultatdiagram
function drawTestChart() {
    // Funktion för att rita testresultatdiagram
    function drawTestChart() {
        const testResults = [/* Här lägger du till testresultaten som du vill rita diagrammet för */];
        const ctx = document.getElementById("testChart").getContext("2d");

        // Radera tidigare diagram
        if (window.testChart) {
            window.testChart.destroy();
        }

        window.testChart = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: ["Fråga 1", "Fråga 2", "Fråga 3"], // Exempel på frågelabels
                datasets: [{
                    label: 'Resultat',
                    data: testResults, // Använd testresultaten här
                    backgroundColor: [
                        'rgba(255, 99, 132, 0.2)',
                        'rgba(54, 162, 235, 0.2)',
                        'rgba(255, 206, 86, 0.2)'
                    ],
                    borderColor: [
                        'rgba(255, 99, 132, 1)',
                        'rgba(54, 162, 235, 1)',
                        'rgba(255, 206, 86, 1)'
                    ],
                    borderWidth: 1
                }]
            },
            options: {
                scales: {
                    y: {
                        beginAtZero: true
                    }
                }
            }
        });
    }

}

// Funktion för att gå tillbaka till menyn
function goBack() {
    hideAllSections();
    document.getElementById("optionsSection").style.display = "flex";
}

// Funktion för att gömma alla sektioner
function hideAllSections() {
    document.querySelectorAll('.container').forEach(section => {
        section.style.display = 'none';
    });
}

// Testfrågor och svarsalternativ
const testQuestions = [
    {
        question: "Vad är företagskultur?",
        options: [
            "Organisationens värderingar, normer och beteendemönster",
            "Antalet anställda i företaget",
            "Hur många kontor företaget har"
        ],
        correctAnswer: 0
    },
    {
        question: "Varför är företagskultur viktig?",
        options: [
            "Företagskultur påverkar hur anställda trivs och presterar",
            "Det är inte viktigt",
            "Företagskultur har ingen påverkan"
        ],
        correctAnswer: 0
    },
    {
        question: "Hur kan företagskultur påverkas?",
        options: [
            "Genom ledarskapets beteende och värderingar",
            "Det går inte att påverka",
            "Genom att anställa fler människor"
        ],
        correctAnswer: 0
    }
];

// Funktion för att rendera testfrågor
function renderTestQuestions() {
    const testQuestionsContainer = document.getElementById("testQuestions");
    testQuestionsContainer.innerHTML = "";
    testQuestions.forEach((questionObj, index) => {
        const questionDiv = document.createElement("div");
        const options = questionObj.options.map((option, i) => {
            return `<label><input type="radio" name="question${index}" value="${i}">${option}</label><br>`;
        }).join("");
        questionDiv.innerHTML = `<h3>${index + 1}. ${questionObj.question}</h3>${options}`;
        testQuestionsContainer.appendChild(questionDiv);
    });
}

// Quizfrågor och svarsalternativ
const quizQuestions = [
    {
        question: "Vad är en viktig del av en positiv företagskultur?",
        options: [
            "Öppen kommunikation och tillit",
            "Att ingen pratar med varandra",
            "Hemlighetsmakeri och misstro"
        ],
        correctAnswer: 0
    },
    {
        question: "Vad kan en negativ företagskultur leda till?",
        options: [
            "Sämre arbetsmiljö och minskad produktivitet",
            "Högre löner för anställda",
            "Bättre samarbete mellan kollegor"
        ],
        correctAnswer: 0
    },
    {
        question: "Vad bör ledningen göra för att främja en positiv företagskultur?",
        options: [
            "Lyssna på anställda och vara öppna för feedback",
            "Ignorera anställdas åsikter",
            "Stänga av kommunikationskanaler"
        ],
        correctAnswer: 0
    }
];

// Funktion för att rendera quizfrågor
function renderQuizQuestions() {
    const quizQuestionsContainer = document.getElementById("quizQuestions");
    quizQuestionsContainer.innerHTML = "";
    quizQuestions.forEach((questionObj, index) => {
        const questionDiv = document.createElement("div");
        const options = questionObj.options.map((option, i) => {
            return `<label><input type="radio" name="question${index}" value="${i}">${option}</label><br>`;
        }).join("");
        questionDiv.innerHTML = `<h3>${index + 1}. ${questionObj.question}</h3>${options}`;
        quizQuestionsContainer.appendChild(questionDiv);
    });
}
